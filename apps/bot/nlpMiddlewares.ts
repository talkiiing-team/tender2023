import { Composer } from 'grammy'
import { initNLP } from '@apps/nlp/nlp'
import { presentScriptToMiddleware } from '@libs/shared/scripts'
import { searchPositionsScript } from '@libs/scripts/search-positions'
import { handleNLPScript } from '@libs/scripts/handleNLP'

export const initNLPMiddlewares = async () => {
  const { nlp, stemmer } = await initNLP()
  const composer = new Composer()
  composer.on('message', async (ctx, next) => {
    if (!ctx.message.text) {
      await ctx.reply('Извините, я пока умею отвечать только на текст')
      return
    }

    const prompt = stemmer.tokenizeAndStem(ctx.message.text).join(' ')

    console.log(prompt)

    const result = await nlp.process('ru', prompt)
    const classes = result.classifications.filter(
      v => !v.intent.startsWith('ignored') && v.score >= 0.2,
    )

    const ignored = result.classifications.filter(
      v => v.intent.startsWith('ignored') && v.score > 0.05,
    )

    const utilityMessage = ignored.length && !classes.length

    if (result.intent === 'None') {
      await ctx.reply(
        'Сейчас постараюсь найти информацию... (отправляем запрос в пайфн)',
      )
      // Python
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
  return composer
}
