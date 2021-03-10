import * as tulind from "tulind";
import {
    MultiHistoricalCandles,
    SingleHistoricalCandle,
    OpenPrices,
    HighPrices,
    LowPrices,
    ClosePrices,
    ITulipDataStructure,
} from "../data/data.types";

export function SMA(arrayWithClosePrices: ClosePrices) {
    const close = arrayWithClosePrices;

    tulind.indicators.sma.indicator([close], [200], (err, res) => {
        if (err) return console.log(err);
        console.log("SMA func result: ", res);
        console.log("Sma func but element 0: ", res[0]);
        return res[0]; // the res is an array, with only one array inside
        // log(res[0].slice(-1)[0]);
    });
}
