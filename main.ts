import { handleApiRequest } from "./api/routes.ts";
import { bot } from "./bot/bot.ts";
// Start the bot
bot.start();

// HTTP server to handle API and webhook requests
Deno.serve(async (req: Request) => {
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
        return handleApiRequest(req);
    }

    return new Response("Method not allowed", { status: 405 });
});

