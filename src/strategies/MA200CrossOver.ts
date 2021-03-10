import { readJSONFileToJS } from "../utils/readJSONFileToJS";
import * as path from "path";

process.on("unhandledRejection", (err) => {
    console.error(`\nUnhandled Promise rejection, taken care of in listener in ${path.basename(__filename)}: `, err);
    process.exit(1);
});
// Test the listener with: new Promise((res, reject) => reject("Wops!"));

async function _readHistoricalCandlesFromFile(filePath: string): Promise<number[][]> {
    try {
        return await readJSONFileToJS(filePath);
    } catch (err) {
        throw new Error("Error returned from readJSONFileToJS" + err);
    }
}

function _produceArrayWithClosePrices(historicalCandles: number[][]): number[] {
    try {
        return historicalCandles.map((array: number[]) => array[4]);
    } catch (err) {
        throw new Error("Unexpected data: " + err);
    }
}

function _runStrategyMA200(arrayWithClosePrices: number[]): boolean {
    console.log("\nArray with close prices:\n\n", arrayWithClosePrices);
    return false;
}

// No try-catches here, instead try-catches in separate functions. When they throw, the error will be catched by the unhandledRejection listener; strange but yes, even if it's not a promise, just a try-catch.
(async function () {
    const historicalCandles: number[][] = await _readHistoricalCandlesFromFile("./output.json");
    const arrayWithClosePrices: number[] = _produceArrayWithClosePrices(historicalCandles);
    const buySignal = _runStrategyMA200(arrayWithClosePrices);
    console.log("\nBuy signal: ", buySignal);
})();
