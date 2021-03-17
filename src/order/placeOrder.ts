import { IOrder } from "./order.types";

interface IOrderReciept {
    orderHasBeenExecuted: boolean;
}

// Arguments are random for now
export function placeOrder({ long, short, buy, sell, takeProfit, stopLoss, limit }: IOrder): Promise<IOrderReciept> {
    return new Promise(function (resolve, reject) {
        resolve({ orderHasBeenExecuted: false });
    });
}
