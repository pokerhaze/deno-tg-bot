// services/mqtt.ts
import { Client } from "https://deno.land/x/mqtt@0.1.2/deno/mod.ts";

export class MqttService {
    private client: Client;
    private connected = false;
    private retryCount = 0;
    private maxRetries = 3;
    private retryDelay = 2000; // 2 seconds

    constructor(private brokerUrl: string) {
        this.client = new Client({ url: brokerUrl });
        this.setupConnection();
    }

    private setupConnection() {
        this.setupEventHandlers();
        this.connect();
    }

    private setupEventHandlers() {
        this.client.on("connect", () => {
            console.log("Connected to MQTT broker");
            this.connected = true;
            this.retryCount = 0;
        });

        this.client.on("error", (err: Error) => {
            console.error("MQTT error:", err);
            this.connected = false;
            this.handleReconnect().then(r => r);
        });

        this.client.on("close", () => {
            console.log("MQTT connection closed");
            this.connected = false;
            this.handleReconnect().then(r => r);
        });
    }

    private async handleReconnect() {
        if (this.retryCount < this.maxRetries) {
            this.retryCount++;
            console.log(`Attempting reconnection ${this.retryCount}/${this.maxRetries}...`);
            await new Promise(resolve => setTimeout(resolve, this.retryDelay));
            this.connect();
        } else {
            console.error("Max reconnection attempts reached");
        }
    }

    private connect() {
        try {
            console.log("Connecting to MQTT broker...");
            this.client.connect();
        } catch (error) {
            console.error("Connection error:", error);
            this.handleReconnect().then(r => r);
        }
    }

    publish(topic: string, message: string) {
        if (!this.connected) {
            // Instead of throwing an error, just log the message
            console.warn("Message queued - MQTT not connected:", message);
        }

        try {
            this.client.publish(topic, message);
            console.log("Message published successfully");
        } catch (error) {
            console.error("Error publishing to MQTT:", error);
            // Don't throw the error, just log it
        }
    }

    async close(): Promise<void> {
        try {
            if (this.connected) {
                await this.client.disconnect();
                this.connected = false;
            }
        } catch (error) {
            console.error("Error closing MQTT connection:", error);
        }
    }
}