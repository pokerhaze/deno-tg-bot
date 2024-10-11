// Import necessary libraries
import { Bot, Context } from "https://deno.land/x/grammy@v1.10.1/mod.ts";
import { serve } from "https://deno.land/std@0.199.0/http/server.ts";

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

// HTTP Server
const handler = (request: Request): Response => {
  const url = new URL(request.url);

  // Define a simple REST API
  if (url.pathname === "/api/status") {
    // Example endpoint to check the bot's status
    return new Response(JSON.stringify({ status: "Bot is running" }), {
      headers: { "Content-Type": "application/json" },
    });
  }

  if (url.pathname === "/api/users") {
    // Example endpoint to return a list of users (hardcoded here)
    const users = [{ id: 1, name: "User1" }, { id: 2, name: "User2" }];
    return new Response(JSON.stringify(users), {
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response("Not Found", { status: 404 });
};

// Start the HTTP server
serve(handler, { port: 8000 });
console.log("HTTP server running on http://localhost:8000");

