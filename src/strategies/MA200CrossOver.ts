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

export function MA200CrossOver(arrayWithClosePrices: ClosePrices): boolean {
    const close = arrayWithClosePrices;
    console.log("\nArray with close prices:\n\n", arrayWithClosePrices);

    // Calculate MA200 in separate function
    const SMAdata = SMA(close);
    console.log("\nArray with SMA200:\n\n", SMAdata); // WHY undefined?

    // Is price over MA200?

    return false;
}

/**
 * Run: > npx ts-node MA200CrossOver.ts
 */
