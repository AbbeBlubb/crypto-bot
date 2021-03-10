import { ClosePrices, ITulipDataStructure } from "../data/data.types";
import { SMA } from "../indicators/SMA";
import { SMAData } from "../indicators/indicators.types";

/**
 * ToDo:
 * - Typing in MA200 function
 * - Make the function general
 * - Maby this indicators should take an TulipDataStructure object, but with ? in keys
 */

export function MA200CrossOverStrategy(tulipDataStructure: ITulipDataStructure): boolean {
    // Prepare data
    const arrayWithClosePrices: ClosePrices = tulipDataStructure.close;
    // Calculate indicator data
    const SMAData: SMAData = SMA(arrayWithClosePrices, 200);
    console.log(SMAData);

    /**
     * res[0] - the arr with all MAs
     * slice(-1) - the last (and newest) value. slice returns an arr
     * [0] get the first element in the returned arr
     */
    console.log(SMAData.slice(-1)[0]);

    // Calculate signal: is price over MA200?

    return false;
}
