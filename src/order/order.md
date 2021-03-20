# Order

## node-binance-api.js

Spot order
Row 350

marketBuy
Row 2868

## node-binance-api docs

- <https://www.npmjs.com/package/node-binance-api>
- Placing a MARKET order

## Sucessful limit buy response order

``` JavaScript
{
  symbol: 'BNBETH',
  orderId: 4480717,
  clientOrderId: 'te38xGILZUXrPZHnTQPH6h',
  transactTime: 1509049732437,
  price: '0.00402030',
  origQty: '5.00000000',
  executedQty: '5.00000000',
  status: 'FILLED',
  timeInForce: 'GTC',
  type: 'LIMIT',
  side: 'BUY' 
}
```

## Market sell, successful + error

When sell has been successful, the returned error is null. The response is an object with .orderId.
When sell is not successfull, the returned response is empty object. The error is a large JSON object.

``` Nodejs
(async function testSell() {
    //const a = await placeOrder({ orderType: EOrderType.ExitLongMarket, symbol: ECryptoSymbols.ADABTC, quantity: 1 });
    NBA.marketSell("ADABTC", 5, (error, response) => {
        console.log("Response: ", response);
        console.log("Error: ", error);
    });
})();
```

``` Nodejs
(async function testSell() {
    //const a = await placeOrder({ orderType: EOrderType.ExitLongMarket, symbol: ECryptoSymbols.ADABTC, quantity: 1 });
    try {
        const a = await NBA.marketSell("ADABTC", 1);
        console.log("r: ", a);
    } catch (e) {
        console.log("e: ", e);
    }
})();
```

``` JavaScript
Response:  [Object: null prototype] {
  symbol: 'ADABTC',
  orderId: 323347679,
  orderListId: -1,
  clientOrderId: 'k2W4utV8kRHaPNYlK2oa5Y',
  transactTime: 1616192661160,
  price: '0.00000000',
  origQty: '5.00000000',
  executedQty: '5.00000000',
  cummulativeQuoteQty: '0.00011305',
  status: 'FILLED',
  timeInForce: 'GTC',
  type: 'MARKET',
  side: 'SELL',
  fills: [
    [Object: null prototype] {
      price: '0.00002261',
      qty: '5.00000000',
      commission: '0.00001825',
      commissionAsset: 'BNB',
      tradeId: 61284044
    }
  ]
}

Error:  null
```

## Market buy, successful + error

x

## Unsuccessful response from order

See folder "secrets" in root

## Binance trading rules: minimum trade ammount

<https://www.binance.us/en/trade-limits>
