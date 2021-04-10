import { EInterval } from "../data/data.types";
import { EMA } from "../indicators/EMA";
import { SMA } from "../indicators/SMA";
import { isAtLeastOneBooleanTrue } from "../signals/booleanComparisions";
import { firstNumberIsGreaterThanSecondNumber } from "../signals/numberComparisions";
import { cryptoSymbolsEURBase, ECryptoSymbols, EFiatTickers } from "../utils/tickers";
import { IStrategyAlgorithm, IStrategyConfig, IStrategySignals } from "./strategy.types";
import { calculateTakeProfit } from "../signals/calculateTakeProfit";

/**
 * Configuration for the strategy
 */

const config: IStrategyConfig = {
    humanReadableName: "Short Term Bullish Strategy",
    programmingName: "shortTermBullishStrategy",
    baseCurrency: EFiatTickers.EUR,
    orderAmmount: 200,
    symbols: cryptoSymbolsEURBase,
    interval: EInterval.FifteenMin,
    limit: 601,
    additionalMessageToNotifier: undefined,
    takeProfit: {
        percent: {
            [ECryptoSymbols.BTCEUR]: 5,
            [ECryptoSymbols.ADAEUR]: 5,
            [ECryptoSymbols.BNBEUR]: 5,
            [ECryptoSymbols.DOTEUR]: 5,
            [ECryptoSymbols.ETHEUR]: 5,
            [ECryptoSymbols.LINKEUR]: 5,
            [ECryptoSymbols.LTCEUR]: 5,
        },
        // usdt: {
        //     [ECryptoSymbols.BTCEUR]: 4,
        // },
    },
};

/**
 * - EUR against crypto
 * - 15 min candles
 * - Calculates long-term sentiment with: 140 days SMA and 150 days EMA, in 15-min candles
 * - Calculates short-term sentiment with: xxx
 */

function algorithm({ symbol, tulipDataStructure }: IStrategyAlgorithm): IStrategySignals {
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
     * Take profit
     * Hm this must be calculated on the entry price, when the order is done!
     */

    const takeProfitFunctionReturn = calculateTakeProfit({
        symbol,
        latestClosePrice,
        takeProfitConfig: config.takeProfit,
    });

    /**
     * Stop-loss
     */

    const stopLossFunctionReturn = 90; // To do

    /**
     * Build report with all the calculated data
     */

    const reportForStrat = {
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

    const strategyConfig = config;
    const enterLongAtMarketPrice = isLatestCandleCloseHigherThanOneOfTheMAs || false;
    const exitLongAtMarketPrice = isLatestCandleCloseLowerThanOneOfTheMAs || false;
    const takeProfit = takeProfitFunctionReturn;
    const stopLoss = stopLossFunctionReturn;
    const report = reportForStrat;

    return { strategyConfig, enterLongAtMarketPrice, exitLongAtMarketPrice, takeProfit, stopLoss, report };
}

export const shortTermBullish = {
    config,
    algorithm,
};
