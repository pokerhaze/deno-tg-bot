import { Context } from "grammy";
import { MqttService } from "../services/mqtt.ts";
import { config } from "../config.ts";

export class MessageHandler {
    constructor(private mqttService: MqttService) {}

    async handleMessage(ctx: Context): Promise<void> {
        const messageText = ctx.message?.text;
        if (!messageText) {
            await ctx.reply("I received a message without text.");
            return;
        }

        try {
            const messageData = {
                userId: ctx.from?.id,
                username: ctx.from?.username,
                text: messageText,
                timestamp: new Date().toISOString()
            };

            await Promise.all([
                this.mqttService.publish(config.mqtt.topic, JSON.stringify(messageData)),
                ctx.reply(`You said: ${messageText}`)
            ]);
        } catch (error) {
            console.error("Error handling message:", error);
            await ctx.reply("Sorry, there was an error processing your message.");
        }
    }

    async handleStart(ctx: Context): Promise<void> {
        await ctx.reply("Hello! I am your Deno Telegram bot with MQTT integration.");
    }
}