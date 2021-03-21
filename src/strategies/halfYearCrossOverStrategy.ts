import { ITulipDataStructure } from "../data/data.types";
import { EMA } from "../indicators/EMA";
import { EMAData, SMAData } from "../indicators/indicators.types";
import { SMA } from "../indicators/SMA";
import { isAtLeastOneBooleanTrue } from "../signals/booleanComparisions";
import { firstNumberIsGreaterThanSecondNumber } from "../signals/numberComparisions";
import { EStrategyNames, IStrategySignals } from "./strategy.types";

export function halfYearCrossOverStrategy(tulipDataStructure: ITulipDataStructure): IStrategySignals {
    /**
     * Prepare data for indicators
     */

    // Prepare data set
    const arrayWithClosePrices = tulipDataStructure.close;

    // Calculate indicator data
    const SMA140Data: SMAData = SMA(arrayWithClosePrices, 140);
    const EMA150Data: EMAData = EMA(arrayWithClosePrices, 150);
    const latestSMA140: number = SMA140Data.slice(-1)[0];
    const latestEMA150: number = EMA150Data.slice(-1)[0];
    const latestClosePrice: number = <number>tulipDataStructure.close.slice(-1)[0];

    /**
     * Calculate buy-signal to enter long position (not general buy/buy-back-shorted-position-signal)
     */

    const isLatestCandleCloseHigherThanLatestSMA140: boolean = firstNumberIsGreaterThanSecondNumber(
        latestClosePrice,
        latestSMA140
    );
    const isLatestCandleCloseHigherThanLatestEMA150: boolean = firstNumberIsGreaterThanSecondNumber(
        latestClosePrice,
        latestEMA150
    );
    const isLatestCandleCloseHigherThanOneOfTheMAs: boolean = isAtLeastOneBooleanTrue(
        isLatestCandleCloseHigherThanLatestSMA140,
        isLatestCandleCloseHigherThanLatestEMA150
    );

    /**
     * Calculate sell-signal for entered positions (not general sell/short-signal) - TO DO
     */

    const isLatestCandleCloseLowerThanLatestSMA140: boolean = firstNumberIsGreaterThanSecondNumber(
        latestSMA140,
        latestClosePrice
    );

    const isLatestCandleCloseLowerThanLatestEMA150: boolean = firstNumberIsGreaterThanSecondNumber(
        latestEMA150,
        latestClosePrice
    );

    const isLatestCandleCloseLowerThanOneOfTheMAs: boolean = isAtLeastOneBooleanTrue(
        isLatestCandleCloseLowerThanLatestSMA140,
        isLatestCandleCloseLowerThanLatestEMA150
    );

    /**
     * Take profit, stop-loss: separate functions that calculate for each run, and the run-strat can change existing orders
     * To do!
     */

    const takeProfitFunctionReturn = 100; // To do
    const stopLossFunctionReturn = 90; // To do

    /**
     * Build report with all the calculated data
     */

    const reportForStrat = {
        strategy: EStrategyNames.HalfYearCrossOverStrategy,
        latestSMA140,
        latestEMA150,
        latestClosePrice,
        isLatestCandleCloseHigherThanLatestSMA140,
        isLatestCandleCloseHigherThanLatestEMA150,
        isLatestCandleCloseHigherThanOneOfTheMAs,
        isLatestCandleCloseLowerThanLatestSMA140,
        isLatestCandleCloseLowerThanLatestEMA150,
        isLatestCandleCloseLowerThanOneOfTheMAs,
    };

    /**
     * Return signals
     */

    const enterLongAtMarketPrice = isLatestCandleCloseHigherThanOneOfTheMAs || false;
    const exitLongAtMarketPrice = isLatestCandleCloseLowerThanOneOfTheMAs || false;
    const takeProfit = takeProfitFunctionReturn;
    const stopLoss = stopLossFunctionReturn;
    const report = reportForStrat;

    return { enterLongAtMarketPrice, exitLongAtMarketPrice, takeProfit, stopLoss, report };
}
