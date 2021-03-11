import { ClosePrices, ITulipDataStructure } from "../data/data.types";
import { SMAData, EMAData } from "../indicators/indicators.types";
import { SMA } from "../indicators/SMA";
import { EMA } from "../indicators/EMA";
import { firstNumberIsGreaterThanSecondNumber } from "../signals/numberComparisions";
import { isAtLeastOneBooleanTrue } from "../signals/booleanComparisions";

export function halfYearCrossOverStrategy(tulipDataStructure: ITulipDataStructure): boolean {
    // Prepare data for indicator
    const arrayWithClosePrices: ClosePrices = tulipDataStructure.close;

    // Calculate indicator data
    const SMA140Data: SMAData = SMA(arrayWithClosePrices, 140);
    const EMA150Data: EMAData = EMA(arrayWithClosePrices, 150);
    const latestSMA140: number = SMA140Data.slice(-1)[0];
    const latestEMA150: number = EMA150Data.slice(-1)[0];
    const latestClosePrice: number = <number>tulipDataStructure.close.slice(-1)[0];

    // Calculate signal

    const isLatestCandleClosePriceHigherThanLatestSMA140: boolean = firstNumberIsGreaterThanSecondNumber(
        latestClosePrice,
        latestSMA140
    );

    const isLatestCandleCloseHigherThanLatestEMA150: boolean = firstNumberIsGreaterThanSecondNumber(
        latestClosePrice,
        latestEMA150
    );

    const isLatestCandleCloseHigherThanOneOfTheMAs: boolean = isAtLeastOneBooleanTrue(
        isLatestCandleClosePriceHigherThanLatestSMA140,
        isLatestCandleCloseHigherThanLatestEMA150
    );

    console.log(
        "\nLatest SMA140: ",
        latestSMA140,
        "\nLatest EMA150: ",
        latestEMA150,
        "\nLatest close price: ",
        latestClosePrice,
        "\nisLatestCandleCloseHigherThanLatestSMA140: ",
        isLatestCandleClosePriceHigherThanLatestSMA140,
        "\nisLatestCandleCloseHigherThanLatestEMA150: ",
        isLatestCandleCloseHigherThanLatestEMA150,
        "\nisLatestCandleCloseHigherThanTheMAs",
        isLatestCandleCloseHigherThanOneOfTheMAs
    );

    return isLatestCandleCloseHigherThanOneOfTheMAs;
}
