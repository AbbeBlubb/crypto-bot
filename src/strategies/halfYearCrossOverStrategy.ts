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

    const arrayWithOpenPrices = tulipDataStructure.open;
    const arrayWithHighPrices = tulipDataStructure.high;
    const arrayWithLowPrices = tulipDataStructure.low;
    const arrayWithClosePrices = tulipDataStructure.close;

    /**
     * Buy-signal to enter long position (not general buy/buy-back-shorted-position-signal)
     */

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
     * Sell-signal for entered positions (not general sell/short-signal) - TO DO
     */

    const sellSignal = false;

    /**
     * Take profit, stop-loss: separate functions that calculate for each run, and the run-strat can change existing orders
     */

    const takeProfitFunctionReturn = 100;
    const stopLossFunctionReturn = 90;

    /**
     * Build report with all the calculated data
     */

    const reportForStrat = {
        strategy: EStrategyNames.HalfYearCrossOverStrategy,
        latestSMA140,
        latestEMA150,
        latestClosePrice,
        isLatestCandleClosePriceHigherThanLatestSMA140,
        isLatestCandleCloseHigherThanLatestEMA150,
        isLatestCandleCloseHigherThanOneOfTheMAs,
    };

    /**
     * Return signals
     */

    const enterLongAtMarketPrice = isLatestCandleCloseHigherThanOneOfTheMAs || false;
    const exitLongAtMarketPrice = sellSignal || false;
    const takeProfit = takeProfitFunctionReturn;
    const stopLoss = stopLossFunctionReturn;
    const report = reportForStrat;

    return { enterLongAtMarketPrice, exitLongAtMarketPrice, takeProfit, stopLoss, report };
}
