import { Context, InlineKeyboard } from 'grammy'

export interface Dialog {
  readonly message: string
  readonly context: Context

  // TODO: add pictures and other media if needed
  prompt(
    question: string,
    keyboard?: any,
    inlineKeyboard?: InlineKeyboard,
  ): Promise<Dialog>
  answer(question: string): Promise<Dialog>
}
