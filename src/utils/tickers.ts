/**
 * Tickers for account information
 */

enum EFiatTickers {
    EUR = "EUR",
    USD = "USD",
}

enum ECryptoTickers {
    ADA = "ADA",
    BNB = "BNB",
    BTC = "BTC",
    ETH = "ETH",
    DOT = "DOT",
    LINK = "LINK",
    LIT = "LIT",
    LTC = "LTC",
    RVN = "RVN",
}

export const cryptoTickersWithEUR: Array<string> = [
    ECryptoTickers.ADA,
    ECryptoTickers.BNB,
    ECryptoTickers.BTC,
    ECryptoTickers.ETH,
    ECryptoTickers.DOT,
    ECryptoTickers.LINK,
    ECryptoTickers.LIT,
    ECryptoTickers.LTC,
    ECryptoTickers.RVN,
    EFiatTickers.EUR,
];

export const forbiddenTickers: Array<string> = ["USD", "EURO"];

/**
 * Symbols for data-fetch and orders
 * - Symbols = pairs
 * - The only fiat in a pair is EUR for a BTC pair
 * - USD is represented with USDT for a BTC pair
 */

export enum ECryptoSymbols {
    ADABTC = "ADABTC",
    BNBBTC = "BNBBTC",
    BTCEUR = "BTCEUR",
    BTCUSDT = "BTCUSDT",
    DOTBTC = "DOTBTC",
    ETHBTC = "ETHBTC",
    LINKBTC = "LINKBTC",
    LITBTC = "LITBTC",
    LTCBTC = "LTCBTC",
    RVNBTC = "RVNBTC",
}

export const cryptoSymbols: Array<string> = [
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
