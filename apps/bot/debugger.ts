import { Composer } from 'grammy'
import axios from 'axios'

const PYTHON_SERVICE_URL = process.env.BOT_PYTHON_ML_URL ?? ''

export const debuggerComposer = new Composer().command('debug', async ctx => {
  const { data } = await axios.get(`${PYTHON_SERVICE_URL}/debug`)

  const response = `
<b>Debug info:</b>
<pre>${data}</pre>
`

  await ctx.reply(response, { parse_mode: 'HTML' })
})
