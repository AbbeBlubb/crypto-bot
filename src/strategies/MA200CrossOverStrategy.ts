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
    // Prepare data for indicator
    const arrayWithClosePrices: ClosePrices = tulipDataStructure.close;

    // Calculate indicator data
    const SMAData: SMAData = SMA(arrayWithClosePrices, 200);

    // Calculate signal: is price over MA200?

    // ToDo: all signals should be in other files and be named like "latestPriceIsHigherThanLatestSMA200()"
    // ToDo: The Strategy should just send the TulipDataStructure to the signals, and not prepare any data

    const latestSMA200 = SMAData.slice(-1)[0];
    const latestClosePrice: number = <number>tulipDataStructure.close.slice(-1)[0];

    console.log(
        "\nLatest SMA200: ",
        latestSMA200,
        "\nLatest close price: ",
        latestClosePrice,
        "\nLatest close prise > latest SMA200?",
        latestClosePrice > latestSMA200
    );

    return latestClosePrice > latestSMA200;
}
