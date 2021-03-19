import * as dotenv from "dotenv";
import { IOrder } from "./order.types";
import { EOrderType, IOrderReciept } from "./order.types";
import { setupNodeBinanceAPI } from "../account/setupNodeBinanceAPI";

/**
 * Setup for NBA
 */

const NBA = setupNodeBinanceAPI();

/**
 * - Get crypto balance
 * - Available fiats: EUR, GBP
 */

// ToDo: resolve, reject
export async function placeOrder({ orderType, symbol, quantity }: IOrder): Promise<IOrderReciept> {
    return new Promise(async function (resolve, reject) {
        switch (orderType) {
            case EOrderType.EnterLongMarket:
                const recieptBuy = await NBA.marketBuy(symbol, quantity);
                console.log("ENTER long market executed: ", recieptBuy);
                resolve({ orderType, orderHasBeenExecuted: false, NBAReciept: recieptBuy });
                break;

            case EOrderType.ExitLongMarket:
                const recieptSell = await NBA.marketSell(symbol, quantity);
                console.log("EXIT long market executed");
                resolve(recieptSell);
                break;

            default:
                throw new Error(
                    "Default clause executed in the switch statement in placeOrder.ts. The value of the given expression doesn't match any of the case clauses."
                );
        }
    });
}
