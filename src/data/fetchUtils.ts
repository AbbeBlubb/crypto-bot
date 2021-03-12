import * as chalk from "chalk";
import fetch, { Response } from "node-fetch";
import { IGetURLForCandles, IFetchCandles } from "./data.types";

export function getURLForCandles({ symbol, interval, limit }: IGetURLForCandles): string {
    return `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${limit.toString()}`;
}

export async function fetchCandles({ url, symbol, interval, limit }: IFetchCandles): Promise<Response> {
    console.log(chalk`{yellow \nFETCHING ${symbol} candles ${interval} x ${limit}}`);
    const res = await fetch(url);
    if (!res.ok) throw new Error(`\nUnexpected response: ${res.statusText}`);
    return res;
}
