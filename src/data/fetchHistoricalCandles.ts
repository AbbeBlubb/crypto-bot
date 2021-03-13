
import { Response } from "node-fetch";
import { IFetchHistoricalCandlesOptions } from "./data.types";
import { fetchCandles, getURLForCandles } from "./fetchUtils";
import { getFileNameForCandlesFile, writeStreamToFile } from "../utils/writeFileUtils";
import * as chalk from "chalk";

/**
 * Will fetch candlesticks and write to file.
 */

export const fetchHistoricalCandles = async ({
    symbol = "BTCUSDT",
    interval = "1d",
    limit = 201,
    fileFolder = "./fetched/",
    fileExtension,
}: IFetchHistoricalCandlesOptions): Promise<void> => {
    const url = getURLForCandles({ symbol, interval, limit });
    const responseObject: Response = await fetchCandles({ url, symbol, interval, limit });
    const filePath: string = fileFolder + getFileNameForCandlesFile({ symbol, interval, limit, fileExtension });
    const resolved = await writeStreamToFile({ streamToWrite: responseObject.body, filePath });
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
