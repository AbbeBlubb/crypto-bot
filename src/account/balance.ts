import * as chalk from "chalk";
import { getDateAndTimeForConsole } from "../utils/dateAndTime";
import { cryptoTickers } from "../utils/tickers";

// Setup

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
export async function getBalance(cb: GetBalanceCallback, currenciesToGet: Array<string>): Promise<any> {
    const currenciesList = [];

    await binance.useServerTime();
    binance.balance(function (error, balances: IBinanceCurrencyBalanceData) {
        currenciesToGet.forEach(function (currencyTicker): void {
            currenciesList.push({
                currency: currencyTicker,
                available: balances[currencyTicker].available,
                onOrder: balances[currencyTicker].onOrder,
            });
        });
        cb(currenciesList as IterableCurrencies);
    });
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

let _intervalIDForBalanceWatch: NodeJS.Timeout;

function _watchBalance(cb: GetBalanceCallback, currenciesToGet: Array<string>): void {
    const intervalID = setInterval(function () {
        getBalance(cb, currenciesToGet);
    }, 60000);
    _intervalIDForBalanceWatch = intervalID;
}

export function startWatchingBalance(): void {
    _watchBalance(printBalance, cryptoTickers);
}

export function stopWatchingBalance(): void {
    clearInterval(_intervalIDForBalanceWatch);
    _intervalIDForBalanceWatch = undefined;
}

/**
 * Run the server or, if want to run this file, must load the .env
 */

//getBalance(printBalance, cryptoTickers);
