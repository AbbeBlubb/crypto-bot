import * as chalk from "chalk";
import { createWriteStream } from "fs";
import { Response } from "node-fetch";
import { appendToFilename } from "../utils/appendToFilename";
import { getDateAndTimeString } from "../utils/dateAndTime";
import { IFetchHistoricalCandlesOptions } from "./data.types";
import { fetchCandles, getURLForCandles } from "./fetchUtils";

/**
 * Will fetch candlesticks and write to file.
 * Binance returns valid JSON.
 * The response object is a stream, and fs.createWriteStream() creates a writable stream.
 * The output is not formatted/pretty at write, and doesn't need to as it's a machine that will read it.
 * Will not create the directories on its own. All the directories in the path should exist and should be writable.
 */

async function _writeCandlesToFile({ filePath, timestamp, res, createWriteStream, getDateAndTimeString }) {
    // Filename: BTCUSDT--2021.03.12--23.13--10.20--1d--200.json
    // symbol -- year.month.day--hours.minutes--seconds.miliseconds--interval--limit
    const _filePath = timestamp
        ? appendToFilename({ filename: filePath, stringToAppend: getDateAndTimeString({ generalSeparator: "" }) })
        : filePath;

    const fileStream = createWriteStream(_filePath);

    await new Promise((resolve, reject) => {
        console.log(chalk`{yellow WRITING to ${_filePath}}`);

        res.body.pipe(fileStream);
        res.body.on("error", reject);
        fileStream.on("finish", resolve);
    });
}


export const fetchHistoricalCandles = async ({
    symbol = "BTCUSDT",
    interval = "1d",
    limit = 250,
    filePath = "output.json",
    timestamp = false,
}: IFetchHistoricalCandlesOptions): Promise<void> => {
    const url = getURLForCandles({ symbol, interval, limit });
    const res: Response = await fetchCandles({ url, symbol, interval, limit });
    _writeCandlesToFile({ filePath, timestamp, res, createWriteStream, getDateAndTimeString });
};

const OPTIONS: IFetchHistoricalCandlesOptions = {
    symbol: "BTCUSDT", // BTCUSDT
    interval: "4h", // 1d
    limit: 20, // 100
    fileFolder: "...", // Relative to this file, eg ../..
    fileName: "...",
    fileExtension: "json",
    stamp: true, // True returns eg. ------------test20210309212724.json
};

/**
 * Run from root: cd src/data && npx ts-node fetchHistoricalCandles.ts
 * Output path: here
 */

fetchHistoricalCandles(OPTIONS);
