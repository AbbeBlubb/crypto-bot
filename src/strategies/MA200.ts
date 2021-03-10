import { readJSONFileToJS } from "../utils/readJSONFileToJS";

export function runStrategyTest(arrayWithClosePrices: number[]): boolean {
    console.log("ma200", arrayWithClosePrices);
    return false;
}

readJSONFileToJS("./output.json")
    .then(function (historicalCandles: number[][]) {
        const arrayWithClosePrices: number[] = historicalCandles.map((array: number[]) => array[4]);
        runStrategyTest(arrayWithClosePrices);
    })
    .catch(function (err) {
        console.error("\n", err);
    });
