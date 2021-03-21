import { sendMessageFor } from "simple-telegram-message";
import { loadDotenv } from "../utils/loadDotenv";
import * as chalk from "chalk";

export interface INotifyOnTelegramOptions {
    time?: string;
    strategyName: string;
    enterLongAtMarketPrice: boolean;
    exitLongAtMarketPrice: boolean;
    symbol: string;
    additionalMessage?: string | undefined;
}

/**
 * - Run file: > npx ts-node telegramUtils.ts
 * - To test buySignal=false, add buySignal=false before the if-statement
 * - TO DO: move Telegram's function sendMessage to separate function, switch statement instead of if-else
 */

export async function notifyOnTelegram({
    strategyName,
    symbol,
    time = "<no time given>",
    enterLongAtMarketPrice,
    exitLongAtMarketPrice,
    additionalMessage,
}: INotifyOnTelegramOptions): Promise<void> {
    return new Promise(function (resolve) {
        if (enterLongAtMarketPrice) {
            loadDotenv();

            const buySignalToSend: string = enterLongAtMarketPrice ? "\nENTRY signal fired" : "";
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
        } else if (exitLongAtMarketPrice) {
            loadDotenv();

            const sellSignalToSend: string = exitLongAtMarketPrice ? "\nEXIT signal fired" : "";
            const additionalMessageToSend: string = additionalMessage ? "\n" + additionalMessage : "";
            const messageToSend = `${strategyName}\n${symbol}\n${time}${sellSignalToSend}${additionalMessageToSend}`;
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
