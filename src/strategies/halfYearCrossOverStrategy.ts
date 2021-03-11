import { ClosePrices, ITulipDataStructure } from "../data/data.types";
import { SMAData, EMAData } from "../indicators/indicators.types";
import { SMA } from "../indicators/SMA";
import { EMA } from "../indicators/EMA";

export function halfYearCrossOverStrategy(tulipDataStructure: ITulipDataStructure): boolean {
    // Prepare data for indicator
    const arrayWithClosePrices: ClosePrices = tulipDataStructure.close;

    // Calculate indicator data
    const SMA140Data: SMAData = SMA(arrayWithClosePrices, 140);
    const EMA150Data: EMAData = EMA(arrayWithClosePrices, 150);
    const latestSMA140 = SMA140Data.slice(-1)[0];
    const latestEMA150 = EMA150Data.slice(-1)[0];
    const latestClosePrice: number = <number>tulipDataStructure.close.slice(-1)[0];

    // Calculate signal

    // Latest price is over latest SMA140?
    // compareLatestPriceWithLatestMA(price, average);

    // Latest price is over latest EMA150?

    // ToDo: all signals should be in other files and be named like "latestPriceIsHigherThanLatestSMA200()"
    // ToDo: The Strategy should just send the TulipDataStructure to the signals, and not prepare any data

    console.log(
        "\nLatest SMA140: ",
        latestSMA140,
        "\nLatest EMA150: ",
        latestEMA150,
        "\nLatest close price: ",
        latestClosePrice,
        "\nLatest close prise > latest SMA140 or latest EMA150?",
        "no"
    );

    return false;
}
