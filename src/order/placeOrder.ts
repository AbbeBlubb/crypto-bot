import { IOrder } from "./order.types";
import { EOrderType, IOrderReciept } from "./order.types";
import { setupNodeBinanceAPI } from "../account/setupNodeBinanceAPI";
import { ECryptoSymbols } from "../utils/tickers";

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
        try {
            switch (orderType) {
                case EOrderType.EnterLongMarket:
                    const recieptBuy = await NBA.marketBuy(symbol, quantity);
                    console.log("ENTER long market executed: ", recieptBuy);
                    resolve({ orderType, orderHasBeenExecuted: false, NBAReciept: recieptBuy });
                    break;

                case EOrderType.ExitLongMarket:
                    const recieptSell = await NBA.marketSell(symbol, quantity);
                    console.log("EXIT long market executed: ", recieptSell);
                    resolve(recieptSell);
                    break;

                default:
                    throw new Error(
                        "Default clause executed in the switch statement in placeOrder.ts. The value of the given expression doesn't match any of the case clauses."
                    );
            }
        } catch (err) {
            console.log(err);
        }
    });
}

(async function testSell() {
    const a = await placeOrder({ orderType: EOrderType.ExitLongMarket, symbol: ECryptoSymbols.ADABTC, quantity: 1 });
    console.log("a: ", a);
})();
