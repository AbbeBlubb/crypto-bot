/**
 * Fetch historical candles
 */

export interface IFetchHistoricalCandlesOptions {
    symbol: string; // Eg "BTCUSDT" in capitals
    interval: string; // Periods, eg "1d"
    limit: number; // Ammount of candles/periods, in number
    fileFolder: string; // Relative to this file, eg "./fetched/"
    fileExtension: string; // Without dot, eg "json"
}

export interface IGetURLForCandles {
    symbol: string;
    interval: string;
    limit: number;
}

export interface IFetchCandles extends IGetURLForCandles {
    url: string;
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
