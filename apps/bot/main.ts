import { initBot } from './bot'

console.log('Starting')

initBot().then(bot => {
  bot.start()
  console.log('Bot started')
})
