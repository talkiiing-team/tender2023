import { Composer, Context, InlineKeyboard, InputMediaBuilder } from 'grammy'
import { Dialog, DialogPayload } from './dialog'

type DialogPromiseResolver = {
  resolve: (value: Context) => void
  reject: (reason?: any) => void
}

export const getAnswerType = (ctx: Context): 'kbd' | 'text' =>
  ctx.chat
    ? 'text'
    : ctx.callbackQuery || ctx.update.callback_query
    ? 'kbd'
    : 'text'

const GRAMMY_DIALOG_TIMEOUT = 1000 * 60 * 5

const GLOBAL_COMPOSER = new Composer()
const GLOBAL_DIALOGS_MAP = new Map<number, DialogPromiseResolver>()

export const setupGrammyDialogMiddleware = () => {
  GLOBAL_COMPOSER.on(['message', 'callback_query:data'], async (ctx, next) => {
    const id = ctx.chat
      ? ctx.chat.id
      : ctx.callbackQuery
      ? ctx.callbackQuery.from.id
      : undefined

    const type: 'kbd' | 'text' = ctx.chat
      ? 'text'
      : ctx.callbackQuery
      ? 'kbd'
      : 'text'

    //console.log(id)

    if (id === undefined) {
      console.error('ID not found')
      next()
      return
    }

    const resolver = GLOBAL_DIALOGS_MAP.get(id)

    //console.log('resolver', resolver)

    if (resolver) {
      resolver.resolve(ctx)
      GLOBAL_DIALOGS_MAP.delete(id)
    }

    next()
  })

  return GLOBAL_COMPOSER.middleware()
}

export class GrammyDialogError extends Error {
  constructor(
    message: string,
    public readonly context: any,
  ) {
    super(message)
    this.name = 'GrammyDialogError'
  }
}

export class GrammyDialog implements Dialog {
  #ctx: Context

  constructor(ctx: Context) {
    this.#ctx = ctx
  }

  get message(): string {
    if (this.#ctx.message?.text) return this.#ctx.message?.text
    if (this.#ctx.update.callback_query?.data)
      return `keyboard:${this.#ctx.update.callback_query?.data}`
    return ''
  }

  get context(): Context {
    return this.#ctx
  }

  async prompt(
    question: string,
    payload?: Partial<DialogPayload>,
    inlineKeyboard?: InlineKeyboard,
  ): Promise<Dialog> {
    if (payload?.keyboard) {
      const buttonRows = payload.keyboard.map(kbd =>
        Object.entries(kbd).map(([data, label]) =>
          InlineKeyboard.text(label, data),
        ),
      )

      const builtKeyboard = inlineKeyboard
        ? InlineKeyboard.from([
            ...inlineKeyboard.inline_keyboard,
            ...buttonRows,
          ])
        : InlineKeyboard.from(buttonRows)

      await this.#ctx.reply(question, {
        reply_markup: builtKeyboard,
        parse_mode: 'HTML',
      })
    } else {
      await this.#ctx.reply(question, {
        parse_mode: 'HTML',
      })
    }

    const newContext = await new Promise<Context>((resolve, reject) => {
      GLOBAL_DIALOGS_MAP.set(this.#ctx.chat?.id ?? -1, {
        resolve,
        reject,
      })

      //console.log(GLOBAL_DIALOGS_MAP)

      setTimeout(() => {
        // reject(
        //   new GrammyDialogError('Timeout at prompt', {
        //     context: this.#ctx,
        //     question,
        //   }),
        // )

        GLOBAL_DIALOGS_MAP.delete(this.#ctx.chat?.id ?? -1)
      }, GRAMMY_DIALOG_TIMEOUT)
    })

    return new GrammyDialog(newContext)
  }

  async answer(
    question: string,
    payload?: Partial<DialogPayload>,
  ): Promise<Dialog> {
    if (payload?.media) {
      const medias = payload.media.map(v => InputMediaBuilder.photo(v))
      await this.#ctx.replyWithMediaGroup(medias)
    }
    if (payload?.keyboard) {
      const buttonRows = payload.keyboard.map(kbd =>
        Object.entries(kbd).map(([data, label]) =>
          InlineKeyboard.url(label, data),
        ),
      )
      const builtKeyboard = InlineKeyboard.from(buttonRows)
      await this.#ctx.reply(question, {
        reply_markup: builtKeyboard,
        parse_mode: 'HTML',
      })
    } else {
      await this.#ctx.reply(question, {
        parse_mode: 'HTML',
      })
    }

    return this
  }
}
