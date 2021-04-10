import { EInterval, ITulipDataStructure } from "../data/data.types";
import { ECryptoSymbols, EFiatTickers } from "../utils/tickers";

type TStrategyAlgorithm = ({ symbol, tulipDataStructure }: IStrategyAlgorithm) => IStrategySignals;

export interface IStrategyAlgorithm {
    symbol: ECryptoSymbols;
    tulipDataStructure: ITulipDataStructure;
}

export interface IStrategyIteratorConfig extends Omit<IRunStrategy, "symbol"> {
    symbols: ECryptoSymbols[];
}

export interface IRunStrategy {
    strategyName: string;
    algorithm: TStrategyAlgorithm; // The strategy function imported in the run-file
    baseCurrency: string;
    orderAmmount: number;
    symbol: ECryptoSymbols; // Eg "BTCUSDT" in capitals
    interval: EInterval; // Periods, eg "1d"
    limit: number; // Ammount of candles/periods, in number. API efault 500; max 1000.
    tickersForBalanceCheck: Array<string>;

    candlesFileFolder: string; // Eg "./fetched/". Relative to the callee context, that is, the top-most highest function context
    candlesFileExtension?: string; // Without dot, eg "json"
    ordersFileFolder: string;
    ordersFileExtension?: string;

    additionalMessageToNotifier?: string;
}

export type TStrategyHasBeenResolved = "done";

export interface IRunStrategyAlgorithm {
    symbol: ECryptoSymbols;
    tulipDataStructure: ITulipDataStructure;
    strategyAlgorithm: TStrategyAlgorithm;
}

export interface IStrategyConfig {
    humanReadableName: string;
    programmingName: string;
    baseCurrency: EFiatTickers;
    orderAmmount: number;
    symbols: Array<string>;
    interval: EInterval;
    limit: number;
    additionalMessageToNotifier: string | undefined;
    takeProfitOnPercent: { [key: string]: number };
}

export interface IStrategySignals {
    strategyConfig: IStrategyConfig;
    enterLongAtMarketPrice: boolean;
    exitLongAtMarketPrice: boolean;
    takeProfit: number;
    stopLoss: number;
    report: { [key: string]: number | string | boolean };
}

