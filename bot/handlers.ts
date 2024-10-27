import { Bot } from "grammy";
import { MessageHandler } from "./messageHandler.ts";
import { MqttService } from "../services/mqtt.ts";
import { config } from "../config.ts";

export function setupHandlers(bot: Bot) {
    try {
        const mqttService = new MqttService(config.mqtt.brokerUrl);
        const messageHandler = new MessageHandler(mqttService);

        bot.command("start", (ctx) => messageHandler.handleStart(ctx));
        bot.on("message", (ctx) => messageHandler.handleMessage(ctx));

        // Cleanup handlers
        Deno.addSignalListener("SIGINT", async () => {
            console.log("Shutting down...");
            await mqttService.close();
            Deno.exit(0);
        });

        Deno.addSignalListener("SIGTERM", async () => {
            console.log("Shutting down...");
            await mqttService.close();
            Deno.exit(0);
        });
    } catch (error) {
        console.error("Error setting up handlers:", error);
        // Don't throw the error, let the bot continue without MQTT if needed
    }
}