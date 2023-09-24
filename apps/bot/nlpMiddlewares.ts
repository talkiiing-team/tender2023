import { Composer } from 'grammy'
import { initNLP } from '@apps/nlp/nlp'
import { presentScriptToMiddleware } from '@libs/shared/scripts'
import { handleNLPScript } from '@libs/scripts/handleNLP'
import { scenarioActions } from '@libs/nlp/scenarios/list'
import axios from 'axios'

const PYTHON_SERVICE_URL =
  process.env.BOT_PYTHON_ML_URL ?? 'http://localhost:5000'

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

    const classes = result.classifications.filter(
      v =>
        !v.intent.startsWith('ignored') &&
        ((!v.intent.startsWith('pretrain') && v.score >= 0.2) ||
          (v.intent.startsWith('pretrain') && v.score > 0.7)),
    )

    const ignored = result.classifications.filter(v =>
      v.intent.startsWith('ignored'),
    )

    const utilityMessage = ignored.length && !classes.length

    if (result.intent === 'None') {
      await ctx.reply(
        'Сейчас постараюсь найти информацию, подождите, пожалуйста... ',
      )
      const answer = await axios.post(`${PYTHON_SERVICE_URL}/answer`, {
        prompt: ctx.message.text,
      })
      await ctx.reply(answer.data.answer)
      return
    } else if ((utilityMessage && result.answer?.length) || !classes.length) {
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
