import { createWriteStream } from "fs";
import fetch from "node-fetch";
import * as chalk from "chalk";

/**
 * Will fetch candlesticks and write to file.
 * The fs.createWriteStream() creates a writable stream. The response object is a stream.
 * The output is therefore not formatted at write, and doesn't need to as it's a machine that will read it.
 */

interface IGetHistoricalCandlesOptions {
    symbol: string;
    interval: string;
    limit: number;
    filePath: string;
}

async function _fetchCandles({ url, res, symbol, interval, limit, fetch }) {
    const fetchMessage = `\nFETCHING:\n- ${symbol} candles\n- ${interval} x ${limit}`;
    console.log(chalk.yellow(fetchMessage));
    res = await fetch(url);
    if (!res.ok) throw new Error(`Unexpected response: ${res.statusText}`);
    return res;
}

async function _writeCandles({ filePath, res, createWriteStream }) {
    const fileStream = createWriteStream(filePath);

    await new Promise((resolve, reject) => {
        const writeMessage = `\nWRITING to ${filePath}`;
        console.log(chalk.yellow(writeMessage));

        res.body.pipe(fileStream);
        res.body.on("error", reject);
        fileStream.on("finish", resolve);
    });
}

export const getHistoricalCandles = async ({
    symbol = "BTCUSDT",
    interval = "1d",
    limit = 250,
    filePath = "output.js",
}: IGetHistoricalCandlesOptions): Promise<void> => {
    const url = `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${limit.toString()}`;
    let res = null;

    try {
        res = await _fetchCandles({ url, res, symbol, interval, limit, fetch });
    } catch (err) {
        console.error("\n", err);
        return;
    }

    _writeCandles({ filePath, res, createWriteStream });
};

const OPTIONS: IGetHistoricalCandlesOptions = {
    symbol: "BTCUSDT",
    interval: "1d",
    limit: 10,
    filePath: "output.json",
};

getHistoricalCandles(OPTIONS);
