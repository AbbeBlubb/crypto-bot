// Binance response for historical candle data
export type MultiHistoricalCandles = Array<SingleHistoricalCandle>;
export type SingleHistoricalCandle = (string | number)[];

// Data structure for Tulip Node
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
