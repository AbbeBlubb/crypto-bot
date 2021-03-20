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

export enum EInterval {
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
export type SingleHistoricalCandle = [
    number,
    string,
    string,
    string,
    string,
    string,
    number,
    string,
    number,
    string,
    string,
    string
];

/**
 * Data structure for Tulip Node lib
 */

export interface ITulipDataStructure {
    open: Array<number>;
    high: Array<number>;
    low: Array<number>;
    close: Array<number>;
}
