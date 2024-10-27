import { Client } from "https://deno.land/x/mqtt@0.1.2/deno/mod.ts";

export class MqttService {
    private client: Client;
    private connected = false;
    private connectionPromise: Promise<void>;

    constructor(brokerUrl: string) {
        this.client = new Client({ url: brokerUrl });
        this.connectionPromise = this.connect();
    }

    private async connect(): Promise<void> {
        return new Promise((resolve, reject) => {
            // Set a connection timeout
            const timeout = setTimeout(() => {
                reject(new Error("MQTT connection timeout"));
            }, 5000);

            this.client.on("connect", () => {
                console.log("Connected to MQTT broker");
                this.connected = true;
                clearTimeout(timeout);
                resolve();
            });

            this.client.on("error", (err: Error) => {
                console.error("MQTT error:", err);
                this.connected = false;
                clearTimeout(timeout);
                reject(err);
            });

            this.client.on("close", () => {
                console.log("MQTT connection closed");
                this.connected = false;
            });

            // Initiate connection
            this.client.connect().catch((err) => {
                clearTimeout(timeout);
                reject(err);
            });
        });
    }

    async publish(topic: string, message: string): Promise<void> {
        try {
            // Wait for connection before proceeding
            await this.connectionPromise;

            if (!this.connected) {
                // If connection was lost after initial connect, try to reconnect
                this.connectionPromise = this.connect();
                await this.connectionPromise;
            }

            await this.client.publish(topic, message);
        } catch (error) {
            console.error("Error publishing to MQTT:", error);
            throw error;
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
            throw error;
        }
    }
}