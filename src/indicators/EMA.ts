import * as tulind from "tulind";
import { EMAData } from "./indicators.types";

export function EMA(arrayWithClosePrices: Array<number>, period: number): EMAData {
    const _real = [arrayWithClosePrices];
    const _period = [period];
    let result: number[];

    try {
        tulind.indicators.ema.indicator(_real, _period, (err, res: number[][]) => {
            if (err) throw new Error(err);

            // res is an array, containing one array, with all the values
            result = res[0];
        });
    } catch (err) {
        throw new Error(err);
    }

    return result;
}
