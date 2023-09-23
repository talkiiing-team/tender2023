import { newTicketScript } from '@libs/scripts'
import { setupGrammyDialogMiddleware } from '@libs/shared/dialog'
import { presentScriptToMiddleware } from '@libs/shared/scripts'
import { Bot } from 'grammy'
import { debuggerComposer } from './debugger'
import { initNLPMiddlewares } from '@apps/bot/nlpMiddlewares'

export const initBot = async () => {
  const bot = new Bot(process.env.BOT_TOKEN ?? '')

  bot.use(setupGrammyDialogMiddleware())

  // bot.use(debuggerComposer)

  bot.command('ticket', presentScriptToMiddleware(newTicketScript))

  bot.use(await initNLPMiddlewares())

  bot.catch(err => {
    console.error(err)
  })

  return bot
}
