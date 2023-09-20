import { newTicketScript } from '@libs/scripts'
import { setupGrammyDialogMiddleware } from '@libs/shared/dialog'
import { presentScriptToMiddleware } from '@libs/shared/scripts'
import { Bot } from 'grammy'

const bot = new Bot(process.env.BOT_TOKEN ?? '')

bot.use(setupGrammyDialogMiddleware())

bot.command('ticket', presentScriptToMiddleware(newTicketScript))

bot.catch(err => {
  console.error(err)
})

export { bot }
