import { Composer } from 'grammy'
import { initNLP } from '@apps/nlp/nlp'
import { presentScriptToMiddleware } from '@libs/shared/scripts'
import { handleNLPScript } from '@libs/scripts/handleNLP'
import { scenarioActions } from '@libs/nlp/scenarios/list'
import axios from 'axios'
import { GrammyDialog } from '@libs/shared/dialog'

const PYTHON_SERVICE_URL =
  process.env.BOT_PYTHON_ML_URL ?? 'http://localhost:5001'

export const initNLPMiddlewares = async () => {
  const { nlp, stemmer } = await initNLP()
  const composer = new Composer()
  composer.on('message', async (ctx, next) => {
    if (!ctx.message.text) {
      await ctx.reply('Извините, я пока умею отвечать только на текст')
      return
    }

    const prompt = stemmer.tokenizeAndStem(ctx.message.text).join(' ')

    const result = await nlp.process('ru', prompt)

    console.log(result)

    const ignored = result.classifications.filter(v =>
      v.intent.startsWith('ignored'),
    )

    const ignoredK = 1 - ignored.reduce((acc, v) => acc + v.score, 0)

    const classes = result.classifications
      .map(v => {
        v.score /= ignoredK
        return v
      })
      .filter(
        v =>
          !v.intent.startsWith('ignored') &&
          ((!v.intent.startsWith('pretrain') && v.score >= 0.2) ||
            (v.intent.startsWith('pretrain') && v.score > 0.7)),
      )

    const badClasses = result.classifications.filter(
      v => !v.intent.startsWith('ignored') && v.score > 0.2,
    )

    const utilityMessage = ignored.reduce((acc, v) => acc + v.score, 0) > 0.7

    if (result.intent === 'None') {
      await ctx.reply(
        'Сейчас постараюсь найти информацию, подождите, пожалуйста... ',
      )

      const answer = await axios
        .post<{ answer: string }>(`${PYTHON_SERVICE_URL}/answer`, {
          prompt: ctx.message.text,
        })
        .then(r => r.data?.answer)
        .catch(e => undefined)

      console.log('ml answer', answer)
      let needToSolve = true
      if (!answer) {
        await ctx.reply(
          'К сожалению, я не могу подобрать наилучший ответ для Ваc в данный момент\n\n' +
            badClasses.length
            ? 'Ознакомьтесь с наименее релевантными ответами:'
            : 'Обратитесь, пожалуйста, позднее',
        )
      } else {
        const dialog = new GrammyDialog(ctx)
        const confirmation = await dialog
          .prompt(`Этот ответ вам должен подойти:\n\n<i>${answer}</i>`, {
            keyboard: [
              {
                yes: 'Спасибо, ответ помог',
                no: 'Ответ не помог',
              },
            ],
          })
          .then(d => d.message)

        if (confirmation === 'keyboard:yes') {
          await dialog.answer('Рад, что получилось помочь')
          needToSolve = false
        } else if (confirmation === 'keyboard:no') {
          needToSolve = true
        } else if (!confirmation.startsWith('keyboard')) {
          needToSolve = false
        }
      }
      if (needToSolve) {
        console.log('need to solve')
        if (badClasses.length) {
          await presentScriptToMiddleware(handleNLPScript)(ctx, next, {
            result,
            classes: badClasses,
            nlp,
          })
        } else {
          await ctx.reply('Сожалею об этом...')
        }
      }
      return
    } else if (utilityMessage) {
      await ctx.reply(result.answer)
      return
    }

    await presentScriptToMiddleware(handleNLPScript)(ctx, next, {
      result,
      classes,
      nlp,
    })
  })
  return composer.middleware()
}
