import { TMyTotalCryptoBalance, ISingleCryptoBalance } from "../account/account.types";
import { IOrder, EOrderType, IDecideActionOnStrategySignal } from "../order/order.types";
import { ECryptoSymbols } from "../utils/tickers";

interface IGetSingleCryptoBalance {
    balance: TMyTotalCryptoBalance;
    symbol: ECryptoSymbols;
}

export function decideActionOnStrategySignal({
    balance,
    strategySignals,
    symbol,
    quantity,
}: IDecideActionOnStrategySignal): IOrder {
    const { enterLongAtMarketPrice, exitLongAtMarketPrice } = strategySignals;
    // This is not nessesary; to read balance from API?
    const singleCryptoBalance: ISingleCryptoBalance = _findSingleCryptoBalance({ balance, symbol });

    const latestOrder = _getLatestWrittenOrder(symbol);

    // Read order file; seek the order nr of the previous bought order!
    // BUT THIS SHOULD BE DONE IN THE RUNSTRATEGY, SAME AS FOR THE WRITE/READ FETCH

    // If there's no previous order, and the signal is buy, make buy order

    // If there's no previous order, and the signal is sell, make nothing

    // If there's a previous order, and signal is buy, do nothing

    // If there's a previous order, and signal is sell, make sell order

    // This shouldn't be possible? entry=false + exit=false?
    if (!enterLongAtMarketPrice && !exitLongAtMarketPrice) {
        return {
            orderType: EOrderType.none,
            symbol,
            quantity,
        };
    }

    const hasPositonInSymbol = parseFloat(singleCryptoBalance.available) > 0.0001;
}

function _findSingleCryptoBalance({ balance, symbol }: IGetSingleCryptoBalance) {
    return balance.find((singleCryptoBalance: ISingleCryptoBalance) => singleCryptoBalance.currency === symbol);
}

function _getLatestWrittenOrder(symbol) {

}
