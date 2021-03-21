import * as chalk from "chalk";
import { Response } from "node-fetch";
import * as path from "path";
import { ITulipDataStructure, EInterval } from "../data/data.types";
import { fetchCandles, getURLForCandles } from "../data/fetchUtils";
import { getTulipDataStructureObjectFromJSONFile } from "../data/tulipDataStructureUtils";
import { notifyOnTelegram } from "../notifier/telegramUtils";
import { attachUnhandledRejectionListener } from "../utils/attachUnhandledRejectionListener";
import { getFileNameForCandlesFile, IFileNameObject, writeStreamToFile } from "../utils/writeFileUtils";
import { halfYearCrossOverStrategy } from "./halfYearCrossOverStrategy";
import { runStrategyAlgorithm } from "./strategyUtils";
import {
    IRunStrategy,
    IStrategyIteratorConfig,
    IStrategySignals,
    EStrategyNames,
    TStrategyHasBeenResolved,
} from "./strategy.types";
import { cryptoSymbols, cryptoTickersWithEUR, ECryptoSymbols } from "../utils/tickers";
import { getBalance } from "../account/getBalance";

async function runStrategy({
    strategyName,
    strategyAlgorithm,
    symbol,
    interval,
    limit,
    fileFolder,
    fileExtension,
    additionalMessageToNotifier,
}: IRunStrategy): Promise<TStrategyHasBeenResolved> {
    return new Promise(async function (resolve, reject) {
        try {
            console.log(chalk`{bgGreen.white \nRUNNING STRATEGY ${strategyName}}`);

            // Fetch
            const url = getURLForCandles({ symbol, interval, limit });
            const responseObject: Response = await fetchCandles({ url, symbol, interval, limit });

            // Write
            const { fileName, fileNameCreatedTime }: IFileNameObject = getFileNameForCandlesFile({
                symbol,
                interval,
                limit,
                fileExtension,
            });
            const filePath: string = fileFolder + fileName;
            const filePathResponse: string = await writeStreamToFile({
                streamToWrite: responseObject.body,
                filePath,
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
            const balance = await getBalance({ multiCryptoTickersToGet: cryptoTickersWithEUR, logToConsole: true });

            // 4. constructOrderFromSignal()
            // Also fix the server version so all is automated

            // 2. placeOrder(buy or sell, quantity...)

            await notifyOnTelegram({
                time: fileNameCreatedTime,
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
 * Runs specific strategy feeded through the config object
 * Run from root: cd src/strategies && npx ts-node runStrategy.ts
 * Output path: this folder; ./fetched/
 * Read path: context same as the output
 */

// ToDo: the server that runs the strat regularly. Until then, bring your comp and do it yourelf

(async function runStrategyPromiseLoop(): Promise<void> {
    // ToDo for config: entry ammount
    const config: IStrategyIteratorConfig = {
        strategyName: EStrategyNames.HalfYearCrossOverStrategy,
        strategyAlgorithm: halfYearCrossOverStrategy,
        symbols: cryptoSymbols,
        interval: EInterval.OneDay,
        limit: 201,
        fileFolder: "./fetched/",
        fileExtension: "json",
        additionalMessageToNotifier: undefined,
    };

    attachUnhandledRejectionListener(path.basename(__filename));
    // ToDo: save all STDOUT/console output logging for eventual error handling
    console.log(`\nStarting strategy iterations: ${config.symbols.length} iterations to go`);

    for (let i = 0; i < config.symbols.length; i++) {
        const symbol = config.symbols[i] as ECryptoSymbols;
        const isResolved: TStrategyHasBeenResolved = await runStrategy({ ...config, symbol });
        isResolved === ("done" as TStrategyHasBeenResolved) &&
            console.log(`\nStrategy iteration ${i + 1} of ${config.symbols.length} done`);
    }
})();
