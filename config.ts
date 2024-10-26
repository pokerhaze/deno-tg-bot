export const config = {
    token: Deno.env.get("BOT_TOKEN") || "",
    port: parseInt(Deno.env.get("PORT") || "8090"),
};

if (!config.token) {
    throw new Error("BOT_TOKEN environment variable is required");
}
