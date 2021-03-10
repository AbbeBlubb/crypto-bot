import * as tulind from "tulind";
import { SMA } from "../indicators/SMA";
import {
    MultiHistoricalCandles,
    SingleHistoricalCandle,
    OpenPrices,
    HighPrices,
    LowPrices,
    ClosePrices,
    ITulipDataStructure,
} from "../data/data.types";

/**
 * ToDo:
 * - Typing in MA200 function
 * - Make the function general
 * - Maby this indicators should take an TulipDataStructure object, but with ? in keys
 */

export function MA200CrossOver(tulipDataStructure: ITulipDataStructure): boolean {
    // Prepare data
    const arrayWithClosePrices: ClosePrices = tulipDataStructure.close;
    // Calculate indicator data
    const SMAData = SMA(arrayWithClosePrices, 200);
    console.log(SMAData);
    // Calculate signal: is price over MA200?

    return false;
}
