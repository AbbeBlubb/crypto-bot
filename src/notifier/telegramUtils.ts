import { sendMessageFor } from "simple-telegram-message";
import { loadDotenv } from "../utils/loadDotenv";

export interface INotifyOnTelegramOptions {
    strategy: string;
    buySignal: boolean;
    symbol: string;
    message?: string;
}

// Run file: > npx ts-node telegramUtils.ts
export async function notifyOnTelegram({
    strategy,
    buySignal,
    symbol,
    message = "No message",
}: INotifyOnTelegramOptions): Promise<void> {
    if (buySignal) {
        loadDotenv();

        const sendMessage = sendMessageFor(process.env.TELEGRAM_BOT_API_KEY, process.env.TELEGRAM_CHANNEL_ID);

        sendMessage(message)
            .then(() => console.log("sent!"))
            .catch(() => {
                throw new Error("noo!");
            });
    } else {
        console.log("not sent");
    }
}
