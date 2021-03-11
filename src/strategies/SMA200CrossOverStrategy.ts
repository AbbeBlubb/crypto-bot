import { ClosePrices, ITulipDataStructure } from "../data/data.types";
import { SMAData } from "../indicators/indicators.types";
import { SMA } from "../indicators/SMA";

export function SMA200CrossOverStrategy(tulipDataStructure: ITulipDataStructure): boolean {
    // Prepare data for indicator
    const arrayWithClosePrices: ClosePrices = tulipDataStructure.close;

    // Calculate indicator data
    const SMA200Data: SMAData = SMA(arrayWithClosePrices, 200);

    // Calculate signal: is price over MA200?

    // ToDo: all signals should be in other files and be named like "latestPriceIsHigherThanLatestSMA200()"
    // ToDo: The Strategy should just send the TulipDataStructure to the signals, and not prepare any data

    const latestSMA200 = SMA200Data.slice(-1)[0];
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
