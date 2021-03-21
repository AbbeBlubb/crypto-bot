# Node Binance API lib

- Node Binance API, a private API layer for the Binance API (not provided by Binance): <https://www.npmjs.com/package/node-binance-api>

## Import NBA with old-school require

``` JavaScript
import * as dotenv from "dotenv";

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
```

## Import NBA with import

``` TypeScript
import * as NodeBinanceAPI from "node-binance-api";
import * as dotenv from "dotenv";

/**
 * Setup for NBA
 */

dotenv.config({ path: "../../.env" });

const BINANCE_API_KEY = process.env.BINANCE_API_KEY;
const BINANCE_API_SECRET = process.env.BINANCE_API_SECRET;

export function setupNodeBinanceAPI(): any {
    return NodeBinanceAPI().options({
        APIKEY: BINANCE_API_KEY,
        APISECRET: BINANCE_API_SECRET,
        useServerTime: true, // If you get timestamp errors, synchronize to server time at startup
        log: (log) => {
            console.log(log);
        },
    });
}
```
