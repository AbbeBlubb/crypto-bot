import { currencyTableMyFavorites } from "../utils/currencies";
import { getLocalTimestamp } from "../utils/dateUtils";
import * as chalk from "chalk";

const APIKEY = process.env.APIKEY;
const APISECRET = process.env.APISECRET;

const binance = require("node-binance-api")().options({
    APIKEY: APIKEY,
    APISECRET: APISECRET,
    useServerTime: true, // If you get timestamp errors, synchronize to server time at startup
});

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

// ToDo: currenciesToGet should have interface corresponding to the Binance available cryptos (crashes if feeded USD, EUR)
export function getBalance(cb: GetBalanceCallback, currenciesToGet: Array<string>): void {
    const currenciesList = [];

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
Printed ${getLocalTimestamp()} \n\n`;

    console.log(chalk.blue(balanceTextToPrint));
}

let _intervalIDForBalanceWatch: NodeJS.Timeout;

function _watchBalance(cb: GetBalanceCallback, currenciesToGet: Array<string>): void {
    const intervalID = setInterval(function () {
        getBalance(cb, currenciesToGet);
    }, 2000);
    _intervalIDForBalanceWatch = intervalID;
}

export function startWatchingBalance(): void {
    _watchBalance(printBalance, currencyTableMyFavorites);
}

export function stopWatchingBalance(): void {
    clearInterval(_intervalIDForBalanceWatch);
    _intervalIDForBalanceWatch = undefined;
}
