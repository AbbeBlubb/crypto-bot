import * as chalk from "chalk";
import { getDateAndTimeForConsole } from "../utils/dateAndTime";
import { cryptoTickers } from "../utils/tickers";

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

// Types

interface IBinanceAbstractBalanceData {
    available: string;
    onOrder: string;
}

interface IBinanceCurrencyBalanceData {
    [key: string]: IBinanceAbstractBalanceData;
}

interface CurrencyBalanceData extends IBinanceAbstractBalanceData {
    currency: string;
}

type IterableCurrencies = Array<CurrencyBalanceData>;

type GetBalanceCallback = (arg: IterableCurrencies) => void;

// Features

// ToDo: currenciesToGet should have interface corresponding to the Binance available cryptos (crashes if feeded USD, EUR)
export async function getCryptoBalance(currenciesToGet: Array<string>): Promise<any> {
    const currenciesList = [];

    //await binance.useServerTime();
    const balanceForAllCryptos = await binance.balance();
    // console.log(balanceForAllCryptos)
    currenciesToGet.forEach(function (currencyTicker): void {
        currenciesList.push({
            currency: currencyTicker,
            available: balanceForAllCryptos[currencyTicker].available,
            onOrder: balanceForAllCryptos[currencyTicker].onOrder,
        });
    });
    console.log(currenciesList);
}

export function printBalance(currenciesList: IterableCurrencies): void {
    const balanceTextToPrint = `
BALANCE

${currenciesList
    .map(function (element: CurrencyBalanceData) {
        return `${element.currency}: ${element.available} \n`;
    })
    .join("")}
Printed ${getDateAndTimeForConsole()}`;

    console.log(chalk.blue(balanceTextToPrint));
}

/**
 * Run: > npx ts-node balance2.ts
 */

getCryptoBalance(cryptoTickers);
