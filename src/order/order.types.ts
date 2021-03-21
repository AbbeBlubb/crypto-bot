import { ECryptoSymbols } from "../utils/tickers";
import { IStrategySignals } from "../strategies/strategy.types";
import { TMyTotalCryptoBalance } from "../account/account.types";

export enum EOrderType {
    EnterLongAtMarketPrice = "EnterLongAtMarketPrice",
    ExitLongAtMarketPrice = "ExitLongMarket",
    none = "none",
}

export interface IDecideActionOnStrategySignal {
    balance: TMyTotalCryptoBalance;
    strategySignals: IStrategySignals;
    symbol: ECryptoSymbols;
    quantity: number;
}

export interface IOrder {
    orderType: EOrderType;
    symbol: ECryptoSymbols;
    quantity: number;
}

export interface IOrderReciept extends IOrder {
    orderHasBeenExecuted: boolean;
    NBAReciept: any;
    errorMessage: string;
}
