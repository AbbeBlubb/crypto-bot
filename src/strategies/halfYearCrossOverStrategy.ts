import { ClosePrices, ITulipDataStructure } from "../data/data.types";
import { EMA } from "../indicators/EMA";
import { EMAData, SMAData } from "../indicators/indicators.types";
import { SMA } from "../indicators/SMA";
import { isAtLeastOneBooleanTrue } from "../signals/booleanComparisions";
import { firstNumberIsGreaterThanSecondNumber } from "../signals/numberComparisions";
import { IStrategySignals } from "./strategy.types";

export function halfYearCrossOverStrategy(tulipDataStructure: ITulipDataStructure): IStrategySignals {
    /**
     * Buy signal
     */

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

    /**
     * Sell signal
     */

    const sellSignal = false;

    /**
     * Return signals
     */

    return { buy: isLatestCandleCloseHigherThanOneOfTheMAs, sell: sellSignal };
}

// Print values:
// console.log(
//     "\nLatest SMA140: ",
//     latestSMA140,
//     "\nLatest EMA150: ",
//     latestEMA150,
//     "\nLatest close price: ",
//     latestClosePrice,
//     "\nisLatestCandleCloseHigherThanLatestSMA140: ",
//     isLatestCandleClosePriceHigherThanLatestSMA140,
//     "\nisLatestCandleCloseHigherThanLatestEMA150: ",
//     isLatestCandleCloseHigherThanLatestEMA150,
//     "\nisLatestCandleCloseHigherThanTheMAs",
//     isLatestCandleCloseHigherThanOneOfTheMAs
// );
