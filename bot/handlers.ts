import { Bot } from "grammy";
import { MessageHandler } from "./messageHandler.ts";
import { MqttService } from "../services/mqtt.ts";
import { config } from "../config.ts";

export function setupHandlers(bot: Bot) {
    const mqttService = new MqttService(config.mqtt.brokerUrl);
    const messageHandler = new MessageHandler(mqttService);

    bot.command("start", (ctx) => messageHandler.handleStart(ctx));
    bot.on("message", (ctx) => messageHandler.handleMessage(ctx));

    // Use Deno's built-in shutdown signal handling
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
}