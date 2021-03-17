import { EInterval, ITulipDataStructure } from "../data/data.types";

type TStrategyAlgorithm = (tulipDataStructure: ITulipDataStructure) => IStrategySignals;

export interface IRunStrategy {
    strategyName: "Half Year Cross-Over Strategy";
    strategyAlgorithm: TStrategyAlgorithm; // The strategy function imported in the run-file
    symbol: string; // Eg "BTCUSDT" in capitals
    interval: EInterval; // Periods, eg "1d"
    limit: number; // Ammount of candles/periods, in number
    fileFolder: string; // Eg "./fetched/". Relative to the callee context, that is, the top-most highest function context
    fileExtension?: string; // Without dot, eg "json"
    additionalMessageToNotifier?: string;
}

export interface IRunStrategyAlgorithm {
    tulipDataStructure: ITulipDataStructure;
    strategyAlgorithm: TStrategyAlgorithm;
}

export interface IStrategyIteratorConfig extends Omit<IRunStrategy, "symbol"> {
    symbols: string[];
}

// Specify if it's a position long/short, entry/exit
export interface IStrategySignals {
    buy: boolean;
    sell: boolean;
    takeProfit: number;
    stopLoss: number;
    report: { [key: string]: number | string | boolean };
}

export enum EStrategyNames {
    HalfYearCrossOverStrategy = "Half Year Cross-Over Strategy",
}

export type TStrategyHasBeenResolved = "done";
