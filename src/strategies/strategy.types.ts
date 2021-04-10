import { EInterval, ITulipDataStructure } from "../data/data.types";
import { ECryptoSymbols, EFiatTickers } from "../utils/tickers";

type TStrategyAlgorithm = (tulipDataStructure: ITulipDataStructure) => IStrategySignals;

export interface IRunStrategy {
    strategyName: string;
    algorithm: TStrategyAlgorithm; // The strategy function imported in the run-file
    baseCurrency: string;
    orderAmmount: number;
    symbol: ECryptoSymbols; // Eg "BTCUSDT" in capitals
    interval: EInterval; // Periods, eg "1d"
    limit: number; // Ammount of candles/periods, in number. API efault 500; max 1000.

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

interface IStrategyConfig {
    humanReadableName: string;
    programmingName: string;
    baseCurrency: EFiatTickers;
    orderAmmount: number;
    symbols: Array<string>;
    interval: EInterval;
    limit: number;
}

export interface IStrategySignals {
    strategyConfig: IStrategyConfig;
    enterLongAtMarketPrice: boolean;
    exitLongAtMarketPrice: boolean;
    takeProfit: number;
    stopLoss: number;
    report: { [key: string]: number | string | boolean };
}

// export enum EStrategyNames {
//     HalfYearCrossOverStrategy = "Half Year Cross-Over Strategy",
//     ShortTermBullishStrategy = "Short Term Bullish Strategy",
// }

export type TStrategyHasBeenResolved = "done";
