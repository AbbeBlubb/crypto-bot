import * as chalk from "chalk";
import fetch, { Response } from "node-fetch";
import { IGetURLForHistoricalCandles, IFetchCandles } from "./data.types";

export function getURLForHistoricalCandles({ symbol, interval, limit }: IGetURLForHistoricalCandles): string {
    return `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${limit.toString()}`;
}

export async function fetchCandles({ url, symbol, interval, limit }: IFetchCandles): Promise<Response> {
    console.log(chalk`{yellow \nFETCHING ${symbol} candles ${interval} x ${limit}}`);
    const res = await fetch(url);
    if (!res.ok) throw new Error(`\nUnexpected response: ${res.statusText}`);
    return res;
}
