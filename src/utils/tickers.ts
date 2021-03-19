export type TCryptoTickers = Array<TSingleCryptoTicker>;
export type TCryptoSymbols = Array<TSingleCryptoSymbol>;
export type TFiatTickers = Array<TSingleFiatTicker>;
export type TForbiddenTickers = Array<TSingleForbiddenTicker>;
export type TSingleCryptoTicker = string;
export type TSingleCryptoSymbol = string;
export type TSingleFiatTicker = string;
export type TSingleForbiddenTicker = string;

export const ADA = "ADA";
export const BNB = "BNB";
export const BTC = "BTC";
export const ETH = "ETH";
export const DOT = "DOT";
export const LINK = "LINK";
export const LIT = "LIT";
export const LTC = "LTC";
export const RVN = "RVN";

export const EUR = "EUR";
export const USD = "USD";

export const ADABTC = "ADABTC";
export const BNBBTC = "BNBBTC";
export const BTCUSDT = "BTCUSDT";
export const ETHBTC = "ETHBTC";
export const DOTBTC = "DOTBTC";
export const LINKBTC = "LINKBTC";
export const LITBTC = "LITBTC";
export const LTCBTC = "LTCBTC";
export const RVNBTC = "RVNBTC";
export const BTCEUR = "BTCEUR";

export const fiatTickers: Array<string> = [EUR, USD];
export const cryptoTickers: Array<string> = [ADA, BNB, BTC, ETH, DOT, LINK, LIT, LTC, RVN];
export const cryptoTickersWithEUR: Array<string> = [EUR, ADA, BNB, BTC, ETH, DOT, LINK, LIT, LTC, RVN];
export const forbiddenTickers: Array<string> = [USD, "EURO"];

export const cryptoSymbols: Array<string> = [
    ADABTC,
    BNBBTC,
    BTCUSDT,
    ETHBTC,
    DOTBTC,
    LINKBTC,
    LITBTC,
    LTCBTC,
    RVNBTC,
    BTCEUR,
];

export enum ECryptoSymbols {
    ADABTC = "ADABTC",
    BANBBTC = "BNBBTC",
    BTCUSDT = "BTCUSDT",
    ETHBTC = "ETHBTC",
    DOTBTC = "DOTBTC",
    LINKBTC = "LINKBTC",
    LITBTC = "LITBTC",
    LTCBTC = "LTCBTC",
    RVNBTC = "RVNBTC",
    BTCEUR = "BTCEUR",
}
