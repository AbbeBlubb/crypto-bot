// What data does an order need in order for it to be an order?
export interface IOrder {
    long?: boolean;
    short?: boolean;
    buy?: boolean;
    sell?: boolean;
    takeProfit?: number;
    stopLoss?: number;
    limit?: number;
}
