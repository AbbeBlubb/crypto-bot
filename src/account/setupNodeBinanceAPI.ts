import * as NodeBinanceAPI from "node-binance-api";
import * as dotenv from "dotenv";

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
