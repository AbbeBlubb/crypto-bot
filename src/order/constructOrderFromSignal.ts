import { IStrategySignals } from "../strategies/strategy.types";
import { IOrder } from "./order.types";

export function constructOrderFromSignal({ buy, sell, takeProfit, stopLoss, report }: IStrategySignals): IOrder {
    return {
        long: true,
    };
}
