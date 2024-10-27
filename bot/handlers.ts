import { Bot } from "grammy";

export function setupHandlers(bot: Bot) {
    bot.command("start", async (ctx) => {
        await ctx.reply("Hello! I am your Deno Telegram bot with a REST API.");
    });

    bot.on("message", async (ctx) => {
        const messageText = ctx.message?.text;
        if (messageText) {
            await ctx.reply(`You said: ${messageText}`);
        } else {
            await ctx.reply("I received a message without text.");
        }
    });
}
