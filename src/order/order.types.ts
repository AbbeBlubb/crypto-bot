import { ECryptoSymbols } from "../utils/tickers";
import { IStrategySignals } from "../strategies/strategy.types";

export enum EOrderType {
    EnterLongMarket = "EnterLongMarket",
    ExitLongMarket = "ExitLongMarket",
    none = "none",
}

export interface IDecideActionOnStrategySignal {
    strategySignals: IStrategySignals;
    symbol: ECryptoSymbols;
    quantity: number;
}

export interface IOrder {
    orderType: EOrderType;
    symbol: ECryptoSymbols;
    quantity: number;
}

export interface IOrderReciept {
    orderType: EOrderType;
    orderHasBeenExecuted: boolean;
    NBAReciept: any;
}