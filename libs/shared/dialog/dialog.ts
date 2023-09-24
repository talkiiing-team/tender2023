import { Context, InlineKeyboard } from 'grammy'

export type DialogPayload = {
  keyboard: Record<string, string>[]
  media: string[] | Buffer[]
}

export interface Dialog {
  readonly message: string
  readonly context: Context

  // TODO: add pictures and other media if needed
  prompt(
    question: string,
    payload?: Partial<DialogPayload>,
    inlineKeyboard?: InlineKeyboard,
  ): Promise<Dialog>
  answer(question: string, payload?: Partial<DialogPayload>): Promise<Dialog>
}
