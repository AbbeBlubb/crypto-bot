import { EInterval, ITulipDataStructure } from "../data/data.types";
import { EMA } from "../indicators/EMA";
import { SMA } from "../indicators/SMA";
import { isAtLeastOneBooleanTrue } from "../signals/booleanComparisions";
import { firstNumberIsGreaterThanSecondNumber } from "../signals/numberComparisions";
import { cryptoSymbolsEURBase, EFiatTickers } from "../utils/tickers";
import { IStrategySignals } from "./strategy.types";

/**
 * Configuration for the strategy
 */

const config = {
    humanReadableName: "Short Term Bullish Strategy",
    programmingName: "shortTermBullishStrategy",
    baseCurrency: EFiatTickers.EUR,
    orderAmmount: 200,
    symbols: cryptoSymbolsEURBase,
    interval: EInterval.FifteenMin,
    limit: 601, // TODO: CHECK AGAIN THE MA:S WORK FINE
};

/**
 * - EUR against crypto
 * - 15 min candles
 * - Calculates long-term sentiment with: 140 days SMA and 150 days EMA, in 15-min candles
 * - Calculates short-term sentiment with: xxx
 */

// INTERFACE!!
export function strategy(tulipDataStructure: ITulipDataStructure): IStrategySignals {
    /**
     * Prepare data for indicators
     */

    // Prepare data set
    const arrayWithClosePrices = tulipDataStructure.close;

    // Calculate indicator data

    // 140 periods on 1-h shart equals to 140 * 4 = 560 in 15-min chart
    // 150 periods on 1-h shart equals to 150 * 4 = 600 in 15-min chart

    const SMA560Data: number[] = SMA(arrayWithClosePrices, 560);
    const EMA600Data: number[] = EMA(arrayWithClosePrices, 600);
    const latestSMA560: number = SMA560Data.slice(-1)[0];
    const latestEMA600: number = EMA600Data.slice(-1)[0];
    const latestClosePrice: number = <number>tulipDataStructure.close.slice(-1)[0];

    /**
     * Calculate buy-signal to enter long position
     */

    const isLatestCandleCloseHigherThanLatestSMA560: boolean = firstNumberIsGreaterThanSecondNumber(
        latestClosePrice,
        latestSMA560
    );
    const isLatestCandleCloseHigherThanLatestEMA600: boolean = firstNumberIsGreaterThanSecondNumber(
        latestClosePrice,
        latestEMA600
    );
    const isLatestCandleCloseHigherThanOneOfTheMAs: boolean = isAtLeastOneBooleanTrue(
        isLatestCandleCloseHigherThanLatestSMA560,
        isLatestCandleCloseHigherThanLatestEMA600
    );

    /**
     * Calculate sell-signal for entered positions - TO DO
     */

    const isLatestCandleCloseLowerThanLatestSMA560: boolean = firstNumberIsGreaterThanSecondNumber(
        latestSMA560,
        latestClosePrice
    );

    const isLatestCandleCloseLowerThanLatestEMA600: boolean = firstNumberIsGreaterThanSecondNumber(
        latestEMA600,
        latestClosePrice
    );

    const isLatestCandleCloseLowerThanOneOfTheMAs: boolean = isAtLeastOneBooleanTrue(
        isLatestCandleCloseLowerThanLatestSMA560,
        isLatestCandleCloseLowerThanLatestEMA600
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
        strategyConfig: config,
        latestSMA560,
        latestEMA600,
        latestClosePrice,
        isLatestCandleCloseHigherThanLatestSMA560,
        isLatestCandleCloseHigherThanLatestEMA600,
        isLatestCandleCloseHigherThanOneOfTheMAs,
        isLatestCandleCloseLowerThanLatestSMA560,
        isLatestCandleCloseLowerThanLatestEMA600,
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

export const shortTermBullish = {
    config,
    strategy,
};
