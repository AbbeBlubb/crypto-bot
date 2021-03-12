import { createWriteStream } from "fs";
import fetch from "node-fetch";
import * as chalk from "chalk";
import { getLocalTimestamp } from "../utils/getLocalTimestamp";
import { appendToFilename } from "../utils/appendToFilename";
import { IFetchHistoricalCandlesOptions } from "./data.types";

/**
 * Will fetch candlesticks and write to file.
 * Binance returns valid JSON.
 * The response object is a stream, and fs.createWriteStream() creates a writable stream.
 * The output is not formatted/pretty at write, and doesn't need to as it's a machine that will read it.
 * Will not create the directories on its own. All the directories in the path should exist and should be writable.
 */

async function _fetchCandles({ url, res, symbol, interval, limit, fetch }) {
    console.log(chalk`{yellow \nFETCHING:\n- ${symbol} candles\n- ${interval} x ${limit}}`);
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
        console.log(chalk`{\nWRITING to ${_filePath}]`);

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
    const url = `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${limit.toString()}`;
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
    interval: "1d", // 1d
    limit: 300, // 100
    filePath: "BTCUSDT", // Relative to this file, eg "test.json"
    timestamp: true, // True returns eg. test20210309212724.json
};

/**
 * Run from root: npx ts-node ./src/data/getHistoricalCandles.ts
 * Output path: root
 */

fetchHistoricalCandles(OPTIONS);
