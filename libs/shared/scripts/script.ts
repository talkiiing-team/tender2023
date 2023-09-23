import { Dialog } from '../dialog'

export type Script = (
  dialog: Dialog,
  next: CallableFunction,
  props?: any,
) => Promise<void>
