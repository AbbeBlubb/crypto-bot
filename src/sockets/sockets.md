# Web sockets

## URL:s

* Binance Web sockets docs
  * <https://github.com/binance/binance-spot-api-docs/blob/master/web-socket-streams.md>
* The base endpoint is:
  * wss://stream.binance.com:9443
* Raw streams are accessed at /ws/< streamName >
* Stream Name:
  * < symbol >@trade
    * Update Speed: Real-time
  * < symbol >@kline_< interval >
    * Update Speed: 2000ms
    * m -> minutes; h -> hours; d -> days; w -> weeks; M -> months
* Example URL:s:
  * wss://stream.binance.com:9443/ws/btcusdt@trade
  * wss://stream.binance.com:9443/ws/btcusdt@kline_15m

## Connect to Websocket server with wscat

* wscat (WebSocket Cat):
* <https://github.com/websockets/wscat>
* npm i -g wscat
* Help: > wscat
* Connect to a Websocket server: wscat -c < url >

## Response payload

```JSON
{
  "e": "trade",     // Event type
  "E": 123456789,   // Event time
  "s": "BNBBTC",    // Symbol
  "t": 12345,       // Trade ID
  "p": "0.001",     // Price
  "q": "100",       // Quantity
  "b": 88,          // Buyer order ID
  "a": 50,          // Seller order ID
  "T": 123456785,   // Trade time; time stamp in milisec, see https://www.unixtimestamp.com/, delete the 3 last digits to get in sec
  "m": true,        // Is the buyer the market maker?
  "M": true         // Ignore
}
```

```JSON
{
  "e": "kline",     // Event type
  "E": 123456789,   // Event time
  "s": "BNBBTC",    // Symbol
  "k": {
    "t": 123400000, // Kline start time; see above for timestamp comment
    "T": 123460000, // Kline close time; -- || --
    "s": "BNBBTC",  // Symbol
    "i": "1m",      // Interval
    "f": 100,       // First trade ID
    "L": 200,       // Last trade ID
    "o": "0.0010",  // Open price
    "c": "0.0020",  // Close price
    "h": "0.0025",  // High price
    "l": "0.0015",  // Low price
    "v": "1000",    // Base asset volume
    "n": 100,       // Number of trades
    "x": false,     // Is this kline closed?
    "q": "1.0000",  // Quote asset volume
    "V": "500",     // Taker buy base asset volume
    "Q": "0.500",   // Taker buy quote asset volume
    "B": "123456"   // Ignore
  }
}
```

## Save response data with tee

* ... | tee <filename.txt>
  * About the tee command: <https://www.geeksforgeeks.org/tee-command-linux-example/>
* tee command reads the standard input and writes it to both the standard output and one or more files.
  * The file is created and line by line is added when socket data comes in
* Pipe the socket data from the STDIN, to STDOUT/console and file:
  * wscat -c wss://stream.binance.com:9443/ws/btcusdt@kline_15m | tee data.txt
  