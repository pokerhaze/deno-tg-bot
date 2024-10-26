import { Bot } from "grammy";

export function setupErrorHandler(bot: Bot) {
    bot.catch((error) => {
        console.error("An error occurred with the bot:", error);
    });
}
