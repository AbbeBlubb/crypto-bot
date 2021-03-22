import * as chalk from "chalk";
import { Response } from "node-fetch";
import * as path from "path";
import { ITulipDataStructure, EInterval } from "../data/data.types";
import { fetchCandles, getURLForCandles } from "../data/fetchUtils";
import { getTulipDataStructureObjectFromJSONFile } from "../data/tulipDataStructureUtils";
import { notifyOnTelegram } from "../notifier/telegramUtils";
import { attachUnhandledRejectionListener } from "../utils/attachUnhandledRejectionListener";
import { getFileNameForCandlesFile, IFileNameForCandlesObject, writeStreamToFile } from "../utils/writeFileUtils";
import { shortTermBullishStrategy } from "./shortTermBullishStrategy";
import { runStrategyAlgorithm } from "./strategyUtils";
import {
    IRunStrategy,
    IStrategyIteratorConfig,
    IStrategySignals,
    EStrategyNames,
    TStrategyHasBeenResolved,
} from "./strategy.types";
import { cryptoSymbolsEURBase, cryptoTickersWithEUR, ECryptoSymbols } from "../utils/tickers";
import { getBalance } from "../account/getBalance";
import { TMyTotalCryptoBalance } from "../account/account.types";

async function runStrategy({
    strategyName,
    strategyAlgorithm,
    symbol,
    interval,
    limit = 500,
    candlesFileFolder,
    candlesFileExtension,
    ordersFileFolder,
    ordersFileExtension,
    additionalMessageToNotifier,
}: IRunStrategy): Promise<TStrategyHasBeenResolved> {
    return new Promise(async function (resolve, reject) {
        try {
            console.log(chalk`{bgGreen.white \nRUNNING STRATEGY ${strategyName}}`);

            // Fetch
            const url = getURLForCandles({ symbol, interval, limit });
            const responseObject: Response = await fetchCandles({ url, symbol, interval, limit });

            // Write
            const {
                candlesFileName,
                candlesFileNameCreatedTime,
            }: IFileNameForCandlesObject = getFileNameForCandlesFile({
                symbol,
                interval,
                limit,
                fileExtension: candlesFileExtension,
            });

            const filePathResponse: string = await writeStreamToFile({
                streamToWrite: responseObject.body,
                targetDir: candlesFileFolder,
                fileName: candlesFileName,
            });

            // Read and create data structure
            const tulipDataStructure: ITulipDataStructure = await getTulipDataStructureObjectFromJSONFile(
                filePathResponse
            );

            // Run strat
            const strategySignals: IStrategySignals = runStrategyAlgorithm({ tulipDataStructure, strategyAlgorithm });

            // ToDo: analysis should be written to file; append line to file, with info about the buy signal, in CSV
            // OR set up a DB with Docker!
            // callFunc({ ...strategySignals, dataIsFromDataFetchedAtTime: fileNameCreatedTime })

            // 3.
            // decideActionOnStrategySignal()
            const balance: TMyTotalCryptoBalance = await getBalance({
                multiCryptoTickersToGet: cryptoTickersWithEUR,
                logToConsole: true,
            });

            // 4. constructOrderFromSignal()
            // Also fix the server version so all is automated

            // 2. placeOrder(buy or sell, quantity...)

            await notifyOnTelegram({
                time: candlesFileNameCreatedTime,
                strategyName,
                enterLongAtMarketPrice: strategySignals.enterLongAtMarketPrice,
                exitLongAtMarketPrice: strategySignals.exitLongAtMarketPrice,
                symbol,
                additionalMessage: additionalMessageToNotifier,
            });

            console.log(chalk`{bgBlue.white \nCOMPLETED STRATEGY ${strategyName}}`);
            resolve("done" as TStrategyHasBeenResolved);
        } catch (error) {
            reject(new Error(error));
        }
    });
}

/**
 * Runs strategy for EUR against crypto
 */

// ToDo: the server that runs the strat regularly. Until then, bring your comp and do it yourelf

(async function runStrategyPromiseLoop(): Promise<void> {
    // To do: move config to separate file with strat nitializer
    const strategyIteratorConfig: IStrategyIteratorConfig = {
        strategyName: EStrategyNames.ShortTermBullishStrategy,
        strategyAlgorithm: shortTermBullishStrategy,
        symbols: cryptoSymbolsEURBase,
        orderAmmountEUR: 200,
        interval: EInterval.FifteenMin,
        limit: 151,

        candlesFileFolder: "./shortTermBullishEUR/fetched/",
        candlesFileExtension: "json",
        ordersFileFolder: "./shortTermBullishEUR/orders/",
        ordersFileExtension: "json",

        additionalMessageToNotifier: undefined,
    };

    attachUnhandledRejectionListener(path.basename(__filename));
    // ToDo: save all STDOUT/console output logging for eventual error handling
    console.log(`\nStarting strategy iterations: ${strategyIteratorConfig.symbols.length} iterations to go`);

    for (let i = 0; i < strategyIteratorConfig.symbols.length; i++) {
        const symbol = strategyIteratorConfig.symbols[i] as ECryptoSymbols;
        const isResolved: TStrategyHasBeenResolved = await runStrategy({ ...strategyIteratorConfig, symbol });
        isResolved === ("done" as TStrategyHasBeenResolved) &&
            console.log(`\nStrategy iteration ${i + 1} of ${strategyIteratorConfig.symbols.length} done`);
    }
})();
