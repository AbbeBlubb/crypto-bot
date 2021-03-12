export function getURLForHistoricalCandles(symbol: string, interval: string, limit: number): string {
    return `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${limit.toString()}`;
}
