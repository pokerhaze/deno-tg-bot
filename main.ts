import { initializeBot } from "./bot/bot.ts";
import { handleApiRequest } from "./api/routes.ts";

try {
    const bot = await initializeBot();

    // Run bot and server concurrently
    Promise.all([
        // Start the bot with long polling
        bot.start({
            drop_pending_updates: true,
        }),

        // Start HTTP server for health checks
        Deno.serve((req: Request) => {
            if (req.method === "GET") {
                return handleApiRequest(req);
            }
            return new Response("Method not allowed", { status: 405 });
        })
    ]).then(() => console.log("Bot and server started!"))
        .catch((error) => {
            console.error("Error starting services:", error);
            Deno.exit(1);
        });
} catch (error) {
    console.error("Fatal initialization error:", error);
    Deno.exit(1);
}