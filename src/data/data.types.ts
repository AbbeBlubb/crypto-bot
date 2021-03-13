/**
 * Fetch historical candles
 */

export interface IGetURLForCandles {
    symbol: string;
    interval: string;
    limit: number;
}

export interface IFetchCandles extends IGetURLForCandles {
    url: string;
}

export enum Interval {
    OneMin = "1m", // Miniscule m for minute
    TreeMin = "3m",
    FiveMin = "5m",
    FifteenMin = "15m",
    ThirtyMin = "30m",
    OneHour = "1h",
    TwoHours = "2h",
    FourHours = "4h",
    SixHours = "6h",
    EightHours = "8h",
    TwelveHours = "12h",
    OneDay = "1d",
    TreeDays = "3d",
    OneWeek = "1w",
    OneMonth = "1M", // Capital M for Month
}

/**
 * Binance response for historical candle data
 */

export type MultiHistoricalCandles = Array<SingleHistoricalCandle>;
export type SingleHistoricalCandle = (string | number)[];

/**
 * Data structure for Tulip Node
 */

export type OpenPrices = SingleHistoricalCandle;
export type HighPrices = SingleHistoricalCandle;
export type LowPrices = SingleHistoricalCandle;
export type ClosePrices = SingleHistoricalCandle;

export interface ITulipDataStructure {
    open: OpenPrices;
    high: HighPrices;
    low: LowPrices;
    close: ClosePrices;
}
