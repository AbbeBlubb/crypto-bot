import { ECryptoSymbols } from "../utils/tickers";

interface ICalculateTakeProfit {
    symbol: ECryptoSymbols;
    latestClosePrice: number;
    takeProfitConfig: { [key: string]: { [key: string]: number } };
}

export function calculateTakeProfit({ symbol, latestClosePrice, takeProfitConfig }: ICalculateTakeProfit): number {
    const takeProfitConfigHasOnlyOneUnit: boolean = Object.keys(takeProfitConfig).length === 1;
    if (!takeProfitConfigHasOnlyOneUnit) {
        throw new Error("Error in takeProfitConfig in function 'calculateTakeProfit'");
    }
    const unit = Object.keys(takeProfitConfig)[0];
    const ammount = takeProfitConfig[unit][symbol];

    switch (unit) {
        case "percent":
            return latestClosePrice + (latestClosePrice / 100) * ammount;
        default:
            throw new Error("Error in switch default case in function 'calculateTakeProfit'");
    }
}

// Test:
//
// console.log(
//     takeProfitConfigHasOnlyOneUnit,
//     unit,
//     ammount,
//     latestClosePrice,
//     latestClosePrice + (latestClosePrice / 100) * ammount
// );
//
// Output: true percent 5 50008.27 52508.6835
