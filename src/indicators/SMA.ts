import * as tulind from "tulind";
import { ClosePrices } from "../data/data.types";

export function SMA(arrayWithClosePrices: ClosePrices, period: number): number[] {
    const _real = [arrayWithClosePrices];
    const _period = [period];
    let result: number[];

    tulind.indicators.sma.indicator(_real, _period, (err, res) => {
        if (err) throw new Error(err);
        // res is an array, containing one array, with all the values
        result = res[0];

        /**
         * res[0] - the arr with all MAs
         * slice(-1) - the last (and newest) value. slice returns an arr
         * [0] get the first element in the returned arr
         */
        console.log(res[0].slice(-1)[0]);
    });

    return result;
}
