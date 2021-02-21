import { currencyTableMyFavorites } from "./currencies";

const APIKEY = process.env.APIKEY;
const APISECRET = process.env.APISECRET;

import * as chalk from "chalk";

const binance = require("node-binance-api")().options({
    APIKEY: APIKEY,
    APISECRET: APISECRET,
    useServerTime: true, // If you get timestamp errors, synchronize to server time at startup
});

// binance.balance(function (error, data) {
//     console.log(chalk.blue("\n", new Date().toUTCString(), "- YOUR CURRENT", tradeRules.currency, "BALANCE:"));
//     console.log(chalk.blue(JSON.stringify(data[tradeRules.currency]), "\n"));
//     boughtCurrencies[tradeRules.currency] = data[tradeRules.currency].available;
// });

interface BinanceAbstractBalanceData {
    available: string;
    onOrder: string;
}

interface BinanceCurrencyBalanceData {
    [key: string]: BinanceAbstractBalanceData;
}

interface CurrencyBalanceData extends BinanceAbstractBalanceData {
    currency: string;
}

type IterableCurrencies = [CurrencyBalanceData];

type GetBalanceCallback = (arg: IterableCurrencies) => void;

function getBalance(cb: GetBalanceCallback, currenciesToGet: Array<string>) {
    const currenciesList = [];

    binance.balance(function (error, balances: BinanceCurrencyBalanceData) {
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

function printBalance(currenciesList: IterableCurrencies) {
    const balanceTextToPrint = `
BALANCE

${currenciesList
    .map(function (element: CurrencyBalanceData) {
        return `${element.currency}: ${element.available} \n`;
    })
    .join("")}
Printed at ${new Date().toUTCString()}`;

    console.log(chalk.blue(balanceTextToPrint));
}

getBalance(printBalance, currencyTableMyFavorites);
