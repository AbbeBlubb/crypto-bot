import { Interval } from "../data/data.types";

export interface IHalfYearCrossOverStrategyRunConfig {
    strategy: "Half Year Cross-Over Strategy";
    symbol: string; // Eg "BTCUSDT" in capitals
    interval: Interval; // Periods, eg "1d"
    limit: number; // Ammount of candles/periods, in number
    fileFolder: string; // Eg "./fetched/". Relative to the callee context, that is, the top-most highest function context
    fileExtension?: string; // Without dot, eg "json"
}
