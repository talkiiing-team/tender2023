export interface Dialog {
  readonly message: string

  // TODO: add pictures and other media if needed
  prompt(question: string): Promise<Dialog>
  answer(question: string): Promise<Dialog>
}
