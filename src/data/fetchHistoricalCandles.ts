
import { Response } from "node-fetch";
import { IFetchHistoricalCandlesOptions } from "./data.types";
import { fetchCandles, getURLForCandles } from "./fetchUtils";
import { getFileNameForCandlesFile, writeStreamToFile } from "../utils/writeFileUtils";
import * as chalk from "chalk";

/**
 * Will fetch candlesticks and write to file.
 * Binance returns valid JSON.
 * The response object is a stream, and fs.createWriteStream() creates a writable stream.
 * The output is not formatted/pretty at write, and doesn't need to as it's a machine that will read it.
 * Will not create the directories on its own. All the directories in the path should exist and should be writable.
 */

async function _writeCandlesToFile({ symbol, interval, limit, fileFolder, fileExtension, responseObject }) {
    const filePath: string = fileFolder + getFileNameForCandlesFile({ symbol, interval, limit, fileExtension });
    return await writeStreamToFile({ streamToWrite: responseObject.body, filePath });
}

export const fetchHistoricalCandles = async ({
    symbol = "BTCUSDT",
    interval = "1d",
    limit = 201,
    fileFolder = "./fetched/",
    fileExtension = "json",
}: IFetchHistoricalCandlesOptions): Promise<void> => {
    const url = getURLForCandles({ symbol, interval, limit });
    const responseObject: Response = await fetchCandles({ url, symbol, interval, limit });
    const resolved = await _writeCandlesToFile({ symbol, interval, limit, fileFolder, fileExtension, responseObject });
    if (resolved) console.log(chalk`{yellow File written}`);
};

const OPTIONS: IFetchHistoricalCandlesOptions = {
    symbol: "BTCUSDT",
    interval: "1d",
    limit: 201,
    fileFolder: "./fetched/",
    fileExtension: "json",
};

/**
 * Run from root: cd src/data && npx ts-node fetchHistoricalCandles.ts
 * Output path: here
 */

fetchHistoricalCandles(OPTIONS);
