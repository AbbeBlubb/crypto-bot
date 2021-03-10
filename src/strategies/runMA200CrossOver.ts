import * as path from "path";
import { ITulipDataStructure, MultiHistoricalCandles, SingleHistoricalCandle } from "../data/data.types";
import { readJSONFileToJS } from "../utils/readJSONFileToJS";
import { MA200CrossOver } from "./MA200CrossOver";

process.on("unhandledRejection", (err) => {
    console.error(`\nUnhandled Promise rejection, taken care of in listener in ${path.basename(__filename)}: `, err);
    process.exit(1);
});
// Test the listener with: new Promise((res, reject) => reject("Wops!"));

async function _readHistoricalCandlesFromFile(filePath: string): Promise<MultiHistoricalCandles> {
    try {
        return await readJSONFileToJS(filePath);
    } catch (err) {
        throw new Error("Error returned from readJSONFileToJS" + err);
    }
}

function _createTulipDataStructure(multiHistoricalCandles: MultiHistoricalCandles): ITulipDataStructure {
    try {
        const open = multiHistoricalCandles.map((array: SingleHistoricalCandle) => array[1]);
        const high = multiHistoricalCandles.map((array: SingleHistoricalCandle) => array[2]);
        const low = multiHistoricalCandles.map((array: SingleHistoricalCandle) => array[3]);
        const close = multiHistoricalCandles.map((array: SingleHistoricalCandle) => array[4]);
        return { open, high, low, close };
    } catch (err) {
        throw new Error("Unexpected data: " + err);
    }
}

async function _getTulipDataStructure(filePath: string): Promise<ITulipDataStructure> {
    const multiHistoricalCandles: MultiHistoricalCandles = await _readHistoricalCandlesFromFile(filePath);
    return _createTulipDataStructure(multiHistoricalCandles);
}

function _runStrategy(
    tulipDataStructure: ITulipDataStructure,
    strategy: (arg: ITulipDataStructure) => boolean
): boolean {
    return strategy(tulipDataStructure);
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
    const tulipDataStructure: ITulipDataStructure = await _getTulipDataStructure("./BTCUSDT20210310123251.json");
    const buySignal = _runStrategy(tulipDataStructure, MA200CrossOver);
    console.log("\nBuy signal: ", buySignal);
})();
