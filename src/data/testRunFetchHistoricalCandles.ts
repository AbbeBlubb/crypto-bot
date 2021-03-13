import * as chalk from "chalk";
import { Response } from "node-fetch";
import { getFileNameForCandlesFile, writeStreamToFile } from "../utils/writeFileUtils";
import { IFetchHistoricalCandlesOptions } from "./data.types";
import { fetchCandles, getURLForCandles } from "./fetchUtils";

/**
 * Test run functionality:
 * - Fetches candlesticks
 * - Write the response to a file
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
    if (resolved) console.log(chalk`{yellow File written}`); // ToDo: return promise to the runStrategy
};

const testOptions: IFetchHistoricalCandlesOptions = {
    symbol: "BTCUSDT",
    interval: "1d",
    limit: 201,
    fileFolder: "./fetched/",
    fileExtension: "json",
};

/**
 * Run from root: cd src/data && npx ts-node testRunFetchHistoricalCandles.ts
 * Output path: this folder; ./fetched/
 */

fetchHistoricalCandles(testOptions);
