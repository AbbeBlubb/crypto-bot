import { readJSONFileToJS } from "../utils/readJSONFileToJS";
import * as path from "path";
import { MA200CrossOver } from "./MA200CrossOver";

type HistoricalCandles = number[][];
type ClosePrices = number[];
interface ITulipDataStructure {
    open: number[];
    high: number[];
    low: number[];
    close: number[];
}

process.on("unhandledRejection", (err) => {
    console.error(`\nUnhandled Promise rejection, taken care of in listener in ${path.basename(__filename)}: `, err);
    process.exit(1);
});
// Test the listener with: new Promise((res, reject) => reject("Wops!"));

async function _readHistoricalCandlesFromFile(filePath: string): Promise<HistoricalCandles> {
    try {
        return await readJSONFileToJS(filePath);
    } catch (err) {
        throw new Error("Error returned from readJSONFileToJS" + err);
    }
}

function _tulipDataStructure(historicalCandles: HistoricalCandles): ITulipDataStructure {
    try {
        const open = historicalCandles.map((array: number[]) => array[1]);
        const high = historicalCandles.map((array: number[]) => array[2]);
        const low = historicalCandles.map((array: number[]) => array[3]);
        const close = historicalCandles.map((array: number[]) => array[4]);
        return { open, high, low, close };
    } catch (err) {
        throw new Error("Unexpected data: " + err);
    }
}

async function _getArrayWithClosePrices(filePath: string): Promise<ClosePrices> {
    const historicalCandles: HistoricalCandles = await _readHistoricalCandlesFromFile(filePath);
    const arrayWithClosePrices: ClosePrices = _tulipDataStructure(historicalCandles).close;
    return arrayWithClosePrices;
}

function _runStrategy(arrayWithClosePrices: ClosePrices, strategy: (arg: ClosePrices) => boolean): boolean {
    return strategy(arrayWithClosePrices);
}

/**
 * Call context:
 *   - Must be called in context of this folder because of the filePath context.
 *   - Cd from root and then run file: > cd src/strategies/ && npx ts-node runMA200CrossOver.ts
 *   - Run from this folder context: > npx ts-node runMA200CrossOver.ts
 *
 * Prepare 2 things:
 *   - _getArrayWithClosePrices needs a file path as arg. The file must contain an array with candle-arrays
 *   - _runStrategy needs the data to process and the strategy to run
 */

(async function () {
    // No try-catches here, instead try-catches in separate functions. When they throw, the error will be catched by the unhandledRejection listener; strange but yes, even if it's not a promise, just a try-catch.
    const arrayWithClosePrices: ClosePrices = await _getArrayWithClosePrices("./BTCUSDT20210310123251.json");
    const buySignal = _runStrategy(arrayWithClosePrices, MA200CrossOver);
    console.log("\nBuy signal: ", buySignal);
})();
