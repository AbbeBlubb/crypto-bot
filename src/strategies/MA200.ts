import { readJSONFileToJS } from "../utils/readJSONFileToJS";

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
