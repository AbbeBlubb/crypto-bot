import * as chalk from "chalk";
import { getDateAndTimeForConsole } from "../utils/dateAndTime";
import { cryptoTickersWithEUR, TSingleCryptoTicker, forbiddenTickers } from "../utils/tickers";
import {
    IGetCryptoBalance,
    ISingleCryptoBalance,
    ITotalCryptoBalanceFromNBA,
    TMyTotalCryptoBalance,
} from "./account.types";
import { setupNodeBinanceAPI } from "./setupNodeBinanceAPI";

/**
 * Setup for NBA
 */

const NBA = setupNodeBinanceAPI();

/**
 * - Get crypto balance
 * - Available fiats: EUR, GBP
 */

export async function getBalance({
    multiCryptoTickersToGet,
    logToConsole = false,
}: IGetCryptoBalance): Promise<TMyTotalCryptoBalance> {
    return new Promise(async function (resolve, reject) {
        if (forbiddenTickers.some((forbiddenTicker) => multiCryptoTickersToGet.includes(forbiddenTicker))) {
            throw new Error("getCryptoBalance was feeded with a forbidden ticker");
        }

        const myTotalCryptoBalance = [];
        let totalCryptoBalanceFromNBA: ITotalCryptoBalanceFromNBA;

        try {
            totalCryptoBalanceFromNBA = await NBA.balance();
        } catch (err) {
            reject(err);
        }

        // If ticker don't exist, this crashes. It's a good thing, as I will notice fast and add it to the forbiddenTickers
        multiCryptoTickersToGet.forEach(function (singleCryptoTickerToGet: TSingleCryptoTicker): void {
            myTotalCryptoBalance.push({
                currency: singleCryptoTickerToGet,
                available: totalCryptoBalanceFromNBA[singleCryptoTickerToGet].available,
                onOrder: totalCryptoBalanceFromNBA[singleCryptoTickerToGet].onOrder,
            });
        });

        logToConsole && _logMyCryptoBalance(myTotalCryptoBalance as TMyTotalCryptoBalance);

        resolve(myTotalCryptoBalance as TMyTotalCryptoBalance);
    });
}

function _logMyCryptoBalance(myCryptoBalance: TMyTotalCryptoBalance): void {
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
 * Run: > cd src/account && npx ts-node getBalance.ts
 */

// getBalance({ multiCryptoTickersToGet: cryptoTickersWithEUR, logToConsole: true })
//     .then((res) => console.log(res))
//     .catch((err) => console.log(err));
