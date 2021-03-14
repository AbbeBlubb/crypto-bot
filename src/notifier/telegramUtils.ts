import { sendMessageFor } from "simple-telegram-message";
import { loadDotenv } from "../utils/loadDotenv";
import * as chalk from "chalk";

export interface INotifyOnTelegramOptions {
    time?: string;
    strategyName: string;
    buySignal: boolean;
    symbol: string;
    additionalMessage?: string | undefined;
}

/**
 * - Run file: > npx ts-node telegramUtils.ts
 * - To test buySignal=false, add buySignal=false before the if-statement
 */
export async function notifyOnTelegram({
    strategyName,
    symbol,
    time = "<no time given>",
    buySignal,
    additionalMessage,
}: INotifyOnTelegramOptions): Promise<void> {
    return new Promise(function (resolve) {
        if (buySignal) {
            loadDotenv();

            const buySignalToSend: string = buySignal ? "\nSignal fired" : "";
            const additionalMessageToSend: string = additionalMessage ? "\n" + additionalMessage : "";
            const messageToSend = `${strategyName}\n${symbol}\n${time}${buySignalToSend}${additionalMessageToSend}`;
            const sendMessage = sendMessageFor(process.env.TELEGRAM_BOT_API_KEY, process.env.TELEGRAM_CHANNEL_ID);

            sendMessage(messageToSend)
                .then(() => {
                    console.log(chalk`{blue \nTELEGRAM NOTIFIER has sent:\n${messageToSend}}`);
                    resolve();
                })
                .catch(() => {
                    throw new Error("Error catched in notifyOnTelegram function");
                });
        } else {
            console.log(chalk`{blue \nTELEGRAM NOTIFIER hasn't fired regarding ${strategyName} / ${symbol} / ${time}}`);
            resolve();
        }
    });
}
