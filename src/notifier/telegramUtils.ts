import { sendMessageFor } from "simple-telegram-message";
import * as dotenv from "dotenv";

function _loadDotenv() {
    const result = dotenv.config({ path: "../../.env" });
    if (result.error) {
        throw result.error;
    }
    //console.log(result.parsed);
}

// > npx ts-node telegramUtils.ts
export function notifyOnTelegram(buySignal: boolean, message: string): void {
    if (buySignal) {
        _loadDotenv();
        const sendMessage = sendMessageFor(process.env.TELEGRAM_BOT_API_KEY, process.env.TELEGRAM_CHANNEL_ID);
        sendMessage(message);
    }
}
