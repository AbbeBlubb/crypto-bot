import * as chalk from "chalk";
import { Response } from "node-fetch";
import * as path from "path";
import { TMyTotalCryptoBalance } from "../account/account.types";
import { getBalance } from "../account/getBalance";
import { ITulipDataStructure } from "../data/data.types";
import { fetchCandles, getURLForCandles } from "../data/fetchUtils";
import { getTulipDataStructureObjectFromJSONFile } from "../data/tulipDataStructureUtils";
import { notifyOnTelegram } from "../notifier/telegramUtils";
import { attachUnhandledRejectionListener } from "../utils/attachUnhandledRejectionListener";
import { tickersForBalanceCheck, ECryptoSymbols } from "../utils/tickers";
import { getFileNameForCandlesFile, IFileNameForCandlesObject, writeStreamToFile } from "../utils/writeFileUtils";
import { IRunStrategy, IStrategyIteratorConfig, IStrategySignals, TStrategyHasBeenResolved } from "./strategy.types";
import { runStrategyAlgorithm } from "./strategyUtils";

async function _runStrategyOnSymbol({
    strategyName,
    algorithm,
    baseCurrency,
    orderAmmount,
    symbol,
    interval,
    limit,
    tickersForBalanceCheck,
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
            const strategySignals: IStrategySignals = runStrategyAlgorithm({
                tulipDataStructure,
                strategyAlgorithm: algorithm,
            });

            // ToDo: decideActionOnStrategySignal()

            const balance: TMyTotalCryptoBalance = await getBalance({
                multiCryptoTickersToGet: tickersForBalanceCheck,
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

async function _promiseLoopForStrategy(strategyObject): Promise<void> {
    const { config, algorithm } = strategyObject;
    const {
        humanReadableName,
        programmingName,
        baseCurrency,
        orderAmmount,
        symbols,
        interval,
        limit = 500,
        additionalMessageToNotifier = undefined,
    } = config;

    const strategyIteratorConfig: IStrategyIteratorConfig = {
        strategyName: humanReadableName,
        algorithm,

        baseCurrency,
        orderAmmount,
        symbols, // The promise loop will iterate over these
        interval,
        limit,
        tickersForBalanceCheck,

        candlesFileFolder: `./${programmingName}-${config.baseCurrency}/fetched/`,
        candlesFileExtension: "json",
        ordersFileFolder: `./${programmingName}-${config.baseCurrency}/orders/`,
        ordersFileExtension: "json",

        additionalMessageToNotifier,
    };

    attachUnhandledRejectionListener(path.basename(__filename));
    // ToDo: save all STDOUT/console output logging for eventual error handling
    console.log(`\nStarting strategy iterations: ${strategyIteratorConfig.symbols.length} iterations to go`);

    for (let i = 0; i < strategyIteratorConfig.symbols.length; i++) {
        const symbol = strategyIteratorConfig.symbols[i] as ECryptoSymbols;
        const isResolved: TStrategyHasBeenResolved = await _runStrategyOnSymbol({ ...strategyIteratorConfig, symbol });
        isResolved === ("done" as TStrategyHasBeenResolved) &&
            console.log(`\nStrategy iteration ${i + 1} of ${strategyIteratorConfig.symbols.length} done`);
    }
}

/**
 * Runs the strategy instructions in _runStrategyOnSymbol for each symbol in the strategy object
 */

export function runStrategy(strategyObject): void {
    _promiseLoopForStrategy(strategyObject);
}
