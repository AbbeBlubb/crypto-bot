import { EInterval, ITulipDataStructure } from "../data/data.types";
import { ECryptoSymbols } from "../utils/tickers";

type TStrategyAlgorithm = (tulipDataStructure: ITulipDataStructure) => IStrategySignals;

export interface IRunStrategy {
    strategyName: EStrategyNames;
    strategyAlgorithm: TStrategyAlgorithm; // The strategy function imported in the run-file
    symbol: ECryptoSymbols; // Eg "BTCUSDT" in capitals
    orderAmmountEUR: number;
    interval: EInterval; // Periods, eg "1d"
    limit: number; // Ammount of candles/periods, in number

    candlesFileFolder: string; // Eg "./fetched/". Relative to the callee context, that is, the top-most highest function context
    candlesFileExtension?: string; // Without dot, eg "json"
    ordersFileFolder: string;
    ordersFileExtension?: string;

    additionalMessageToNotifier?: string;
}

export interface IStrategyIteratorConfig extends Omit<IRunStrategy, "symbol"> {
    symbols: ECryptoSymbols[];
}

export interface IRunStrategyAlgorithm {
    tulipDataStructure: ITulipDataStructure;
    strategyAlgorithm: TStrategyAlgorithm;
}

export interface IStrategySignals {
    enterLongAtMarketPrice: boolean;
    exitLongAtMarketPrice: boolean;
    takeProfit: number;
    stopLoss: number;
    report: { [key: string]: number | string | boolean };
}

export enum EStrategyNames {
    HalfYearCrossOverStrategy = "Half Year Cross-Over Strategy",
    ShortTermBullishBTCStrategy = "Short Term Bullish BTC Strategy"
}

export type TStrategyHasBeenResolved = "done";
