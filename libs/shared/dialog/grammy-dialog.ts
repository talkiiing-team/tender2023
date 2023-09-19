import { Composer, Context } from "grammy";
import { Dialog } from "./dialog";

type DialogPromiseResolver = {
  resolve: (value: Context) => void;
  reject: (reason?: any) => void;
};

const GRAMMY_DIALOG_TIMEOUT = 1000 * 60 * 5;

const GLOBAL_COMPOSER = new Composer();
const GLOBAL_DIALOGS_MAP = new Map<number, DialogPromiseResolver>();

export const setupGrammyDialogMiddleware = () => {
  GLOBAL_COMPOSER.on("message", async (ctx, next) => {
    const resolver = GLOBAL_DIALOGS_MAP.get(ctx.chat.id);

    console.log("resolver", resolver);

    if (resolver) {
      resolver.resolve(ctx);
      GLOBAL_DIALOGS_MAP.delete(ctx.chat.id);
    }

    await next();
  });

  return GLOBAL_COMPOSER.middleware();
};

export class GrammyDialogError extends Error {
  constructor(message: string, public readonly context: any) {
    super(message);
    this.name = "GrammyDialogError";
  }
}

export class GrammyDialog implements Dialog {
  #ctx: Context;

  constructor(ctx: Context) {
    this.#ctx = ctx;
  }

  get message(): string {
    return this.#ctx.message?.text ?? "";
  }

  async prompt(question: string): Promise<Dialog> {
    await this.#ctx.reply(question);

    const newContext = await new Promise<Context>((resolve, reject) => {
      GLOBAL_DIALOGS_MAP.set(this.#ctx.chat.id, { resolve, reject });

      console.log(GLOBAL_DIALOGS_MAP);

      setTimeout(() => {
        reject(
          new GrammyDialogError("Timeout at prompt", {
            context: this.#ctx,
            question,
          })
        );

        GLOBAL_DIALOGS_MAP.delete(this.#ctx.chat.id);
      }, GRAMMY_DIALOG_TIMEOUT);
    });

    return new GrammyDialog(newContext);
  }

  async answer(question: string): Promise<Dialog> {
    await this.#ctx.reply(question);

    return this;
  }
}
