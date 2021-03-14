import { Interval } from "../data/data.types";
import { ITulipDataStructure } from "../data/data.types";

type TStrategyAlgorithm = (tulipDataStructure: ITulipDataStructure) => boolean;

export interface IRunStrategy {
    strategyName: "Half Year Cross-Over Strategy";
    strategyAlgorithm: TStrategyAlgorithm; // The strategy function imported in the run-file
    symbol: string; // Eg "BTCUSDT" in capitals
    interval: Interval; // Periods, eg "1d"
    limit: number; // Ammount of candles/periods, in number
    fileFolder: string; // Eg "./fetched/". Relative to the callee context, that is, the top-most highest function context
    fileExtension?: string; // Without dot, eg "json"
    additionalMessageToNotifier?: string;
}

export interface IStrategyIteratorConfig extends Omit<IRunStrategy, "symbol"> {
    symbols: string[];
}
