import * as chalk from "chalk";
import { Response } from "node-fetch";
import { getFileNameForCandlesFile, writeStreamToFile } from "../utils/writeFileUtils";
import { fetchCandles, getURLForCandles } from "./fetchUtils";

/**
 * Test run functionality:
 * - Fetches candlesticks
 * - Write the response to a file
 */

interface ITestRunOptions {
    symbol: string; // Eg "BTCUSDT" in capitals
    interval: string; // Periods, eg "1d"
    limit: number; // Ammount of candles/periods, in number
    fileFolder: string; // Eg "./fetched/". Relative to the callee context, that is, the top-most highest function context
    fileExtension?: string; // Without dot, eg "json"
}

export const testRunFechAndWrite = async ({
    symbol = "BTCUSDT",
    interval = "1d",
    limit = 201,
    fileFolder = "./fetched/",
    fileExtension,
}: ITestRunOptions): Promise<void> => {
    const url = getURLForCandles({ symbol, interval, limit });
    const responseObject: Response = await fetchCandles({ url, symbol, interval, limit });
    const filePath: string = fileFolder + getFileNameForCandlesFile({ symbol, interval, limit, fileExtension });
    const resolved = await writeStreamToFile({ streamToWrite: responseObject.body, filePath });
    if (resolved) console.log(chalk`{yellow File written}`);
};

const testRunOptions: ITestRunOptions = {
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

testRunFechAndWrite(testRunOptions);
