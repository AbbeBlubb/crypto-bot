import * as chalk from "chalk";
import { createWriteStream } from "fs";
import { Stream } from "node:stream";
import { getDateAndTimeDigits } from "./dateAndTime";

interface IGetFileNameForCandlesFile {
    symbol: string;
    interval: string;
    limit: number;
    fileExtension: string;
}

interface IWriteToFile {
    streamToWrite: Stream;
    filePath: string;
}

// Returns filename: BTCUSDT--2021.03.12--23.13--10.999--1d--200.json
export function getFileNameForCandlesFile({
    symbol,
    interval,
    limit,
    fileExtension,
}: IGetFileNameForCandlesFile): string {
    const { yyyy, momo, dd, hh, mimi, ss, msmsms } = getDateAndTimeDigits();
    return `${symbol}--${yyyy}.${momo}.${dd}--${hh}.${mimi}--${ss}.${msmsms}--${interval}--${limit}.${fileExtension}`;
}

export async function writeStreamToFile({ streamToWrite, filePath }: IWriteToFile): Promise<boolean> {
    const fileStream = createWriteStream(filePath);

    return await new Promise((resolve, reject) => {
        console.log(chalk`{yellow WRITING to ${filePath}}`);

        streamToWrite.pipe(fileStream);
        streamToWrite.on("error", () => reject(new Error("Write to file rejected")));
        fileStream.on("finish", () => resolve(true));
    });
}
