import { IFetchHistoricalCandlesOptions } from "./data.types";
import { fetchHistoricalCandles } from "./fetchHistoricalCandles";

const testOptions: IFetchHistoricalCandlesOptions = {
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

fetchHistoricalCandles(testOptions);
