import { Bot, Middleware } from "grammy";
import { Script } from "./script";
import { GrammyDialog } from "../dialog";

export const presentScriptToMiddleware =
  (script: Script): Middleware =>
  async (ctx) => {
    const dialog = new GrammyDialog(ctx);
    script(dialog);
  };
