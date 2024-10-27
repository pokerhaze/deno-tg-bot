import { Bot } from "grammy";

export function setupHandlers(bot: Bot) {
    bot.command("start", (ctx) => {
        ctx.reply("Hello! I am your Deno Telegram bot with a REST API.");
    });

    bot.on("message", (ctx) => {
        const messageText = ctx.message?.text;
        if (messageText) {
            ctx.reply(`You said: ${messageText}`);
        } else {
            ctx.reply("I received a message without text.");
        }
    });
}
