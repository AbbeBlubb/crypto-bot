import { sendMessageFor } from "simple-telegram-message";
import { loadDotenv } from "../utils/loadDotenv";

// Run file: > npx ts-node telegramUtils.ts
export async function notifyOnTelegram(buySignal: boolean, message: string): Promise<void> {
    if (buySignal) {
        loadDotenv();

        const sendMessage = sendMessageFor(process.env.TELEGRAM_BOT_API_KEY, process.env.TELEGRAM_CHANNEL_ID);

        sendMessage(message)
            .then(() => console.log("sent!"))
            .catch(() => {
                throw new Error("noo!");
            });
    }
}
