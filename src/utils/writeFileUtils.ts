import * as chalk from "chalk";
import { createWriteStream } from "fs";
import { Stream } from "node:stream";
import { getDateAndTimeDigits } from "./dateAndTime";

interface IGetFileNameForCandlesFile {
    symbol: string;
    interval: string;
    limit: number;
    fileExtension?: string;
}

interface IWriteToFile {
    streamToWrite: Stream;
    filePath: string;
}

/**
 * Constructs a file name like so: BTCUSDT--2021.03.12--23.13--10.999--1d--200.json
 */

export function getFileNameForCandlesFile({
    symbol,
    interval,
    limit,
    fileExtension = "json",
}: IGetFileNameForCandlesFile): string {
    const { yyyy, momo, dd, hh, mimi, ss, msmsms } = getDateAndTimeDigits();
    return `${symbol}--${yyyy}.${momo}.${dd}--${hh}.${mimi}--${ss}.${msmsms}--${interval}--${limit}.${fileExtension}`;
}

/**
 * Write response (or other stream) to file and resolve returning the file path string
 * - Binance returns valid JSON
 * - The output is not formatted/pretty at write, and doesn't need to as it's a machine that will read it.
 * - Will not create the directories on its own. All the directories in the path should exist and should be writable.
 */

export async function writeStreamToFile({ streamToWrite, filePath }: IWriteToFile): Promise<string> {
    const fileStream = createWriteStream(filePath);

    return await new Promise((resolve, reject) => {
        console.log(chalk`{yellow WRITING to ${filePath}}`);

        streamToWrite.pipe(fileStream);
        streamToWrite.on("error", () => reject(new Error("Write to file rejected")));
        fileStream.on("finish", () => {
            console.log(chalk`{yellow ...done}`);
            resolve(filePath);
        });
    });
}
