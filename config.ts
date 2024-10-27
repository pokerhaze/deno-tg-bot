export const config = {
    token: Deno.env.get("BOT_TOKEN") || "",
    mqtt: {
        brokerUrl: Deno.env.get("MQTT_BROKER_URL") || "mqtt://broker.emqx.io",
        topic: Deno.env.get("MQTT_TOPIC") || "jsstg_demo/messages"
    }
};

if (!config.token) {
    throw new Error("BOT_TOKEN environment variable is required");
}
