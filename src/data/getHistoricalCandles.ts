import { createWriteStream } from "fs";
import fetch from "node-fetch";
import * as chalk from "chalk";

interface IGetHistoricalCandlesOptions {
    symbol: string;
    interval: string;
    limit: number;
    filePath: string;
}

const getHistoricalCandles = async ({
    symbol = "BTCUSDT",
    interval = "1d",
    limit = 250,
    filePath = "output.js",
}: IGetHistoricalCandlesOptions) => {
    const url = `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${limit.toString()}`;
    const fetchMessage = `\nFETCHING:\n-${symbol} candles\n-${interval} x ${limit}`;
    console.log(chalk.yellow(fetchMessage));

    const res = await fetch(url);
    if (!res.ok) throw new Error(`Unexpected response: ${res.statusText}`);

    const fileStream = createWriteStream(filePath);

    await new Promise((resolve, reject) => {
        const writeMessage = `\nWRITING to ${filePath}`;
        console.log(chalk.yellow(writeMessage));
        res.body.pipe(fileStream);
        res.body.on("error", reject);
        fileStream.on("finish", resolve);
    });
};

const OPTIONS: IGetHistoricalCandlesOptions = {
    symbol: "BTCUSDT",
    interval: "1d",
    limit: 3,
    filePath: "output.js",
};

getHistoricalCandles(OPTIONS);
