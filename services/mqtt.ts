import { Client } from "https://deno.land/x/mqtt@0.1.2/deno/mod.ts";

export class MqttService {
    private client: Client;
    private connected = false;

    constructor(brokerUrl: string) {
        this.client = new Client({url: brokerUrl});
        this.setupEventHandlers();
    }

    private setupEventHandlers() {
        this.client.on("connect", () => {
            console.log("Connected to MQTT broker");
            this.connected = true;
        });

        // Properly type the error parameter
        this.client.on("error", (err: Error) => {
            console.error("MQTT error:", err);
            this.connected = false;
        });

        this.client.on("close", () => {
            console.log("MQTT connection closed");
            this.connected = false;
        });
    }

    async publish(topic: string, message: string): Promise<void> {
        if (!this.connected) {
            throw new Error("MQTT client not connected");
        }

        try {
            await this.client.publish(topic, message);
        } catch (error) {
            console.error("Error publishing to MQTT:", error);
            throw error;
        }
    }

    async close(): Promise<void> {
        if (this.connected) {
            await this.client.disconnect();
            this.connected = false;
        }
    }
}