import { Dialog } from '../dialog'

export type Script = (dialog: Dialog) => Promise<void>
