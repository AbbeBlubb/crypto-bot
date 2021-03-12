import { createWriteStream } from "fs";
import fetch from "node-fetch";
import * as chalk from "chalk";
import { getLocalTimestamp } from "../utils/getLocalTimestamp";
import { appendToFilename } from "../utils/appendToFilename";
import { IFetchHistoricalCandlesOptions } from "./data.types";
import { getURLForHistoricalCandles } from "./fetchUtils";

/**
 * Will fetch candlesticks and write to file.
 * Binance returns valid JSON.
 * The response object is a stream, and fs.createWriteStream() creates a writable stream.
 * The output is not formatted/pretty at write, and doesn't need to as it's a machine that will read it.
 * Will not create the directories on its own. All the directories in the path should exist and should be writable.
 */

async function _fetchCandles({ url, res, symbol, interval, limit, fetch }) {
    console.log(chalk`{yellow \nFETCHING ${symbol} candles ${interval} x ${limit}}`);
    res = await fetch(url);
    if (!res.ok) throw new Error(`\nUnexpected response: ${res.statusText}`);
    return res;
}

async function _writeCandlesToFile({ filePath, timestamp, res, createWriteStream, getLocalTimestamp }) {
    const _filePath = timestamp
        ? appendToFilename({ filename: filePath, stringToAppend: getLocalTimestamp({ generalSeparator: "" }) })
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
    const url = getURLForHistoricalCandles(symbol, interval, limit);
    let res = null;

    try {
        res = await _fetchCandles({ url, res, symbol, interval, limit, fetch });
    } catch (err) {
        console.error("\n", err);
        return;
    }

    _writeCandlesToFile({ filePath, timestamp, res, createWriteStream, getLocalTimestamp });
};

const OPTIONS: IFetchHistoricalCandlesOptions = {
    symbol: "BTCUSDT", // BTCUSDT
    interval: "4h", // 1d
    limit: 20, // 100
    filePath: "BTCUSDT.json", // Relative to this file, eg "test.json"
    timestamp: true, // True returns eg. test20210309212724.json
};

/**
 * Run from root: cd src/data && npx ts-node fetchHistoricalCandles.ts
 * Output path: here
 */

fetchHistoricalCandles(OPTIONS);
