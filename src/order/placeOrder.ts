import * as dotenv from "dotenv";
import { IOrder } from "./order.types";
import { EOrderType, IOrderReciept } from "./order.types";

/**
 * Setup for NBA
 */

dotenv.config({ path: "../../.env" });

const BINANCE_API_KEY = process.env.BINANCE_API_KEY;
const BINANCE_API_SECRET = process.env.BINANCE_API_SECRET;

const NBA = require("node-binance-api")().options({
    APIKEY: BINANCE_API_KEY,
    APISECRET: BINANCE_API_SECRET,
    useServerTime: true, // If you get timestamp errors, synchronize to server time at startup
    log: (log) => {
        console.log(log);
    },
});

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
                console.log("ENTER long market executed");
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
