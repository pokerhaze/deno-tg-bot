import { config } from "./config.ts";
import { bot } from "./bot/bot.ts";
import { handleApiRequest } from "./api/routes.ts";

const port = config.port;

// Start the bot
await bot.start({
    drop_pending_updates: true,
});

// HTTP server to handle API and webhook requests
Deno.serve({ port }, async (req) => {
    const url = new URL(req.url);

    if (req.method === "POST" && url.pathname === "/webhook") {
        try {
            await bot.handleUpdate(await req.json());
            return new Response("OK", { status: 200 });
        } catch (err) {
            console.error("Webhook error:", err);
            return new Response("Error", { status: 500 });
        }
    }

    if (req.method === "GET") {
        return await handleApiRequest(req);
    }

    return new Response("Method not allowed", { status: 405 });
});
