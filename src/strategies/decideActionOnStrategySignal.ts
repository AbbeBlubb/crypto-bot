import { IOrder, EOrderType, IDecideActionOnStrategySignal } from "../order/order.types";
import { ECryptoSymbols } from "../utils/tickers";

export function decideActionOnStrategySignal({
    strategySignals,
    symbol,
    quantity,
}: IDecideActionOnStrategySignal): IOrder {
    return {
        orderType: EOrderType.none,
        symbol: ECryptoSymbols.BTCEUR,
        quantity: 1,
    };
}
