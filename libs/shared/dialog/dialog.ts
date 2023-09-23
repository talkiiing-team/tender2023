import { Context } from 'grammy'

export interface Dialog {
  readonly message: string
  readonly context: Context

  // TODO: add pictures and other media if needed
  prompt(question: string, keyboard?: any): Promise<Dialog>
  answer(question: string): Promise<Dialog>
}
