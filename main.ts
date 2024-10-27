import { Bot, Context } from "https://deno.land/x/grammy@v1.10.1/mod.ts";

// Get the bot token from the environment
const token = Deno.env.get("BOT_TOKEN");
if (!token) throw new Error("Bot token is not defined in the environment variables.");
// Create a bot instance
const bot = new Bot(token);
// Handle the /start command
bot.command("start", (ctx: Context) => {
    ctx.reply("Hello! I am your Deno Telegram bot with a REST API.");
});
// Echo back any received messages
bot.on("message", (ctx: Context) => {
    ctx.reply(`You said: ${ctx.message.text}`);
});
// Start the bot in the background
bot.start({
    onStart: () => console.log("Telegram bot started!"),
});

// Start the bot
// bot.start();

// HTTP server to handle API and webhook requests
// Deno.serve(async (req: Request) => {
//     const url = new URL(req.url);
//
//     if (req.method === "POST" && url.pathname === "/webhook") {
//         try {
//             await bot.handleUpdate(await req.json());
//             return new Response("OK", { status: 200 });
//         } catch (err) {
//             console.error("Webhook error:", err);
//             return new Response("Error", { status: 500 });
//         }
//     }
//
//     if (req.method === "GET") {
//         return handleApiRequest(req);
//     }
//
//     return new Response("Method not allowed", { status: 405 });
// });

