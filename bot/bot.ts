import { Bot } from "grammy";
import { config } from "../config.ts";
import { setupHandlers } from "./handlers.ts";
import { setupErrorHandler } from "./errorHandler.ts";

export const bot = new Bot(config.token);

// Make initialization async
export function initializeBot() {
    try {
        setupHandlers(bot);
        setupErrorHandler(bot);
        return bot;
    } catch (error) {
        console.error("Error initializing bot:", error);
        throw error;
    }
}