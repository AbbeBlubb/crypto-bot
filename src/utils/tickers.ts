export const forbiddenTickers: Array<string> = ["USD", "EURO"];

export enum EFiatTickers {
    EUR = "EUR",
}

enum ECryptoTickers {
    ADA = "ADA",
    BNB = "BNB",
    BTC = "BTC",
    DOT = "DOT",
    ETH = "ETH",
    LINK = "LINK",
    LIT = "LIT",
    LTC = "LTC",
    RVN = "RVN",
    USDT = "USDT",
}

export const tickersForBalanceCheck: Array<string> = [
    EFiatTickers.EUR,
    ECryptoTickers.USDT,

    ECryptoTickers.ADA,
    ECryptoTickers.BNB,
    ECryptoTickers.BTC,
    ECryptoTickers.DOT,
    ECryptoTickers.ETH,
    ECryptoTickers.LINK,
    ECryptoTickers.LIT,
    ECryptoTickers.LTC,
    ECryptoTickers.RVN,
];

/**
 * Symbols for data-fetch and orders
 * - Symbols = pairs
 * - The only fiat in a pair is EUR for a BTC pair
 * - USD is represented with USDT for a BTC pair
 */

export enum ECryptoSymbols {
    BTCEUR = "BTCEUR",
    BTCUSDT = "BTCUSDT",

    ADABTC = "ADABTC",
    BNBBTC = "BNBBTC",
    DOTBTC = "DOTBTC",
    ETHBTC = "ETHBTC",
    LINKBTC = "LINKBTC",
    LITBTC = "LITBTC",
    LTCBTC = "LTCBTC",
    RVNBTC = "RVNBTC",

    ADAEUR = "ADAEUR",
    BNBEUR = "BNBEUR",
    DOTEUR = "DOTEUR",
    ETHEUR = "ETHEUR",
    LINKEUR = "LINKEUR",
    LTCEUR = "LTCEUR",

    LITUSDT = "LITUSDT",
    RVNUSDT = "RVNUSDT",
}

export const cryptoSymbolsBTCBase: Array<ECryptoSymbols> = [
    ECryptoSymbols.ADABTC,
    ECryptoSymbols.BNBBTC,
    ECryptoSymbols.BTCEUR,
    ECryptoSymbols.BTCUSDT,
    ECryptoSymbols.DOTBTC,
    ECryptoSymbols.ETHBTC,
    ECryptoSymbols.LINKBTC,
    ECryptoSymbols.LITBTC,
    ECryptoSymbols.LTCBTC,
    ECryptoSymbols.RVNBTC,
];

export const cryptoSymbolsEURBase: Array<ECryptoSymbols> = [
    ECryptoSymbols.BTCEUR,
    ECryptoSymbols.ADAEUR,
    ECryptoSymbols.BNBEUR,
    ECryptoSymbols.DOTEUR,
    ECryptoSymbols.ETHEUR,
    ECryptoSymbols.LINKEUR,
    ECryptoSymbols.LTCEUR,
];
