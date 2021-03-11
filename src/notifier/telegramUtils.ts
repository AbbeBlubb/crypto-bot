import { sendMessageFor } from "simple-telegram-message";
import { loadDotenv } from "../utils/loadDotenv";
import * as chalk from "chalk";

export interface INotifyOnTelegramOptions {
    time?: string;
    strategy: string;
    buySignal: boolean;
    symbol: string;
    message?: string;
}

// Run file: > npx ts-node telegramUtils.ts
export async function notifyOnTelegram({
    strategy,
    symbol,
    time = "<no time given>",
    buySignal,
    message = "<no message given>",
}: INotifyOnTelegramOptions): Promise<void> {
    if (buySignal) {
        loadDotenv();

        const messageToSend = `${strategy}\n${symbol}\n${time}\nBuySignal: ${buySignal}\nAdditional message: ${message}`;

        const sendMessage = sendMessageFor(process.env.TELEGRAM_BOT_API_KEY, process.env.TELEGRAM_CHANNEL_ID);

        sendMessage(messageToSend)
            .then(() =>
                console.log(chalk`{blue {bold \nStrategy ${strategy}: Telegram message sent.}\n${messageToSend}}`)
            )
            .catch(() => {
                throw new Error("Error catched in notifyOnTelegram function");
            });
    } else {
        console.log(
            chalk`{blue {bold \nStrategy ${strategy}: NO messege was sent to Telegram.}\nNo signal for ${symbol} at ${time}}`
        );
    }
}
