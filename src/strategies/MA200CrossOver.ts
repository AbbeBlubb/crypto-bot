import { readJSONFileToJS } from "../utils/readJSONFileToJS";
import * as path from "path";

process.on("unhandledRejection", (err) => {
    console.error(`\nUnhandled Promise rejection, taken care of in listener in ${path.basename(__filename)}\n\n`, err);
    process.exit(1);
});
// Test the listener with: new Promise((res, reject) => reject("Wops!"));

function _runStrategyMA200(arrayWithClosePrices: number[]): boolean {
    console.log("\nArray with close prices:\n\n", arrayWithClosePrices);
    return false;
}

(async function () {
    const historicalCandles: number[][] = await readJSONFileToJS("./output.json");
    const arrayWithClosePrices: number[] = historicalCandles.map((array: number[]) => array[4]);
    const buySignal = _runStrategyMA200(arrayWithClosePrices);
    console.log("\nBuy signal: ", buySignal);
})();
