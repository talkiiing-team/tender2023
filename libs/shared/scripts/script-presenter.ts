import { MiddlewareFn } from 'grammy'
import { Script } from './script'
import { GrammyDialog } from '../dialog'

export const presentScriptToMiddleware =
  (script: Script) => async (ctx, next, props?: any) => {
    const dialog = new GrammyDialog(ctx)
    await script(dialog, next, props)
  }
