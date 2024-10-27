import { bot } from "./bot/bot.ts";
import { handleApiRequest } from "./api/routes.ts";

try {
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
            console.error("Error in main services:", error);
            // Don't exit, try to keep the service running
        });
} catch (error) {
    console.error("Fatal error in main:", error);
    Deno.exit(1);
}