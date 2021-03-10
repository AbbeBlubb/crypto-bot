# Historical data

## Useful links

### Fetch and store in DB

* Se denna! Dra ner 500 i taget o peta in i DB <https://www.youtube.com/watch?v=bQVT2WRb4yA&t=3s>

### Binance

* Binance API Docs: <https://binance-docs.github.io/apidocs/spot/en/#compressed-aggregate-trades-list>
* Binacne bloggpost: <https://www.binance.com/en/blog/421499824684901131/Backtest-Your-Trading-Strategy-With-Binance-Futures-Historical-Data>

## Zip with Curl

Get .zip-file

* <https://github.com/binance/binance-public-data#how-to-download-programatically>

## JSON with Curl

Get 1d x 100 and print to STDOUT

``` Bash
> curl -s "https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1d&limit=100"
```

Get 1d x 1000 and save to file

``` Bash
> curl -s "https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1d&limit=100" | tee 1d.json
```

## GET params

* Docs: <https://github.com/binance/binance-spot-api-docs/blob/master/rest-api.md#klinecandlestick-data>
* Base URL: <https://data.binance.vision>

## JSON Response

``` JSON
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
