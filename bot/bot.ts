import { Bot } from "grammy";
import { config } from "../config.ts";
import { setupHandlers } from "./handlers.ts";
import { setupErrorHandler } from "./errorHandler.ts";

export const bot = new Bot(config.token);

setupHandlers(bot);
setupErrorHandler(bot);
