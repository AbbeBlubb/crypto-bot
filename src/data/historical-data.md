# Historical data

* Base URL: <https://data.binance.vision>
* Se denna! Dra ner 500 i taget o peta in i DB <https://www.youtube.com/watch?v=bQVT2WRb4yA&t=3s>
* Binance API Docs: <https://binance-docs.github.io/apidocs/spot/en/#compressed-aggregate-trades-list>
* Binacne bloggpost: <https://www.binance.com/en/blog/421499824684901131/Backtest-Your-Trading-Strategy-With-Binance-Futures-Historical-Data>

## Curl

* curl -s "https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1m&limit=2"
* <https://github.com/binance/binance-public-data#how-to-download-programatically>

Get 1d x 1000 and save to file

* curl -s "https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1d&limit=1000" | tee 1d.js

## GET and response

* Docs: <https://github.com/binance/binance-spot-api-docs/blob/master/rest-api.md#klinecandlestick-data>

``` JavaScript
[
  [
    1499040000000,      // Open time
    "0.01634790",       // Open
    "0.80000000",       // High
    "0.01575800",       // Low
    "0.01577100",       // Close
    "148976.11427815",  // Volume
    1499644799999,      // Close time
    "2434.19055334",    // Quote asset volume
    308,                // Number of trades
    "1756.87402397",    // Taker buy base asset volume
    "28.46694368",      // Taker buy quote asset volume
    "17928899.62484339" // Ignore.
  ]
]
```

