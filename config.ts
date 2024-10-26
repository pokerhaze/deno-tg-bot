export const config = {
    token: Deno.env.get("BOT_TOKEN") || "",
};

if (!config.token) {
    throw new Error("BOT_TOKEN environment variable is required");
}
