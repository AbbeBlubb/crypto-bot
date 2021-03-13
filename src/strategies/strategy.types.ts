export interface IHalfYearCrossOverStrategyRunConfig {
    symbol: string; // Eg "BTCUSDT" in capitals
    interval: string; // Periods, eg "1d"
    limit: number; // Ammount of candles/periods, in number
    fileFolder: string; // Eg "./fetched/". Relative to the callee context, that is, the top-most highest function context
    fileExtension?: string; // Without dot, eg "json"
}
