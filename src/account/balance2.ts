import * as chalk from "chalk";
import { getDateAndTimeForConsole } from "../utils/dateAndTime";
import { cryptoTickers, TCryptoTickers, TSingleCryptoTicker } from "../utils/tickers";
import { ISingleCryptoBalance, ITotalCryptoBalanceFromNBA, TMyTotalCryptoBalance } from "./account.types";

// Setup

import * as dotenv from "dotenv";
dotenv.config({ path: "../../.env" });

const BINANCE_API_KEY = process.env.BINANCE_API_KEY;
const BINANCE_API_SECRET = process.env.BINANCE_API_SECRET;

const binance = require("node-binance-api")().options({
    APIKEY: BINANCE_API_KEY,
    APISECRET: BINANCE_API_SECRET,
    useServerTime: true, // If you get timestamp errors, synchronize to server time at startup
    log: (log) => {
        console.log(log);
    },
});

// Features

// ToDo: currenciesToGet should have interface corresponding to the Binance available cryptos (crashes if feeded USD, EUR)
export async function getCryptoBalance(
    multiCryptoTickersToGet: TCryptoTickers,
    log = false
): Promise<TMyTotalCryptoBalance> {
    const myTotalCryptoBalance = [];

    const totalCryptoBalanceFromNBA: ITotalCryptoBalanceFromNBA = await binance.balance();

    multiCryptoTickersToGet.forEach(function (singleCryptoTickerToGet: TSingleCryptoTicker): void {
        myTotalCryptoBalance.push({
            currency: singleCryptoTickerToGet,
            available: totalCryptoBalanceFromNBA[singleCryptoTickerToGet].available,
            onOrder: totalCryptoBalanceFromNBA[singleCryptoTickerToGet].onOrder,
        });
    });

    log && logMyCryptoBalance(myTotalCryptoBalance as TMyTotalCryptoBalance);

    return myTotalCryptoBalance as TMyTotalCryptoBalance;
}

export function logMyCryptoBalance(myCryptoBalance: TMyTotalCryptoBalance): void {
    const balanceTextToPrint = `\nBALANCE ${getDateAndTimeForConsole()} ${_mapMyCryptoBalanceToTemplateLiteral(
        myCryptoBalance
    )}`;
    console.log(chalk.blue(balanceTextToPrint));
}

function _mapMyCryptoBalanceToTemplateLiteral(myCryptoBalance: TMyTotalCryptoBalance) {
    return `${myCryptoBalance
        .map(function (singleCryptoBalance: ISingleCryptoBalance) {
            return `\n- ${singleCryptoBalance.currency}: ${singleCryptoBalance.available}`;
        })
        .join("")}`;
}

/**
 * Run: > cd src/account && npx ts-node balance2.ts
 */

getCryptoBalance(cryptoTickers, true);
