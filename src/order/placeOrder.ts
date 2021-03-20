import { IOrder } from "./order.types";
import { EOrderType, IOrderReciept } from "./order.types";
import { setupNodeBinanceAPI } from "../account/setupNodeBinanceAPI";
// import { ECryptoSymbols } from "../utils/tickers";

/**
 * Setup for NBA
 */

const NBA = setupNodeBinanceAPI();

/**
 * - Get crypto balance
 * - Available fiats: EUR, GBP
 */

export async function placeOrder({ orderType, symbol, quantity }: IOrder): Promise<IOrderReciept> {
    return new Promise(async function (resolve, reject) {
        let recieptEnterLongMarket, recieptExitLongMarket;

        try {
            switch (orderType) {
                case EOrderType.EnterLongAtMarketPrice:
                    recieptEnterLongMarket = await NBA.marketBuy(symbol, quantity);
                    console.log("ENTER long market executed: ", recieptEnterLongMarket);
                    resolve({
                        orderType,
                        symbol,
                        quantity,
                        orderHasBeenExecuted: true,
                        NBAReciept: recieptEnterLongMarket,
                        errorMessage: null,
                    } as IOrderReciept);
                    break;

                case EOrderType.ExitLongAtMarketPrice:
                    recieptExitLongMarket = await NBA.marketSell(symbol, quantity);
                    console.log("EXIT long market executed: ", recieptExitLongMarket);
                    resolve({
                        orderType,
                        symbol,
                        quantity,
                        orderHasBeenExecuted: true,
                        NBAReciept: recieptExitLongMarket,
                        errorMessage: null,
                    } as IOrderReciept);
                    break;

                default:
                    throw new Error(
                        "Default clause executed in the switch statement in placeOrder.ts. The value of the given expression doesn't match any of the case clauses."
                    );
            }
            // Catch rejected promises from awaits
        } catch (error) {
            const errorMessage = `Rejected promise in placeOrder.ts. Order type: ${orderType}, symbol: ${symbol}, quantity: ${quantity}. Error body: ${error.body}`;
            reject({
                orderType,
                symbol,
                quantity,
                orderHasBeenExecuted: false,
                NBAReciept: null,
                errorMessage,
            } as IOrderReciept);
        }
    });
}

/**
 * Run: > cd src/order && npx ts-node placeOrder.ts
 */

// (async function testSell() {
//     await placeOrder({ orderType: EOrderType.ExitLongMarket, symbol: ECryptoSymbols.ADABTC, quantity: 1 });
// })();
