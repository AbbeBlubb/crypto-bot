import * as tulind from "tulind";
import { ClosePrices } from "../data/data.types";
import { SMAData } from "./indicators.types";

export function SMA(arrayWithClosePrices: ClosePrices, period: number): SMAData {
    const _real = [arrayWithClosePrices];
    const _period = [period];
    let result: number[];

    try {
        tulind.indicators.sma.indicator(_real, _period, (err, res: number[][]) => {
            if (err) throw new Error(err);

            // res is an array, containing one array, with all the values
            result = res[0];
        });
    } catch (err) {
        throw new Error(err);
    }

    return result;
}
