import * as chalk from "chalk";
import { Response } from "node-fetch";
import * as path from "path";
import { ITulipDataStructure, Interval } from "../data/data.types";
import { fetchCandles, getURLForCandles } from "../data/fetchUtils";
import { _getTulipDataStructureObjectFromJSONFile } from "../data/tulipDataStructureUtils";
import { notifyOnTelegram } from "../notifier/telegramUtils";
import { attachUnhandledRejectionListener } from "../utils/attachUnhandledRejectionListener";
import { getFileNameForCandlesFile, IFileNameObject, writeStreamToFile } from "../utils/writeFileUtils";
import { halfYearCrossOverStrategy } from "./halfYearCrossOverStrategy";
import { runStrategyAlgorithm } from "./strategyUtils";
import { IRunStrategy, IStrategyIteratorConfig } from "./strategy.types";

async function runStrategy({
    strategyName,
    strategyAlgorithm,
    symbol,
    interval,
    limit,
    fileFolder,
    fileExtension,
    additionalMessageToNotifier,
}: IRunStrategy): Promise<string> {
    return new Promise(async function (resolve, reject) {
        try {
            attachUnhandledRejectionListener(path.basename(__filename));
            console.log(chalk`{bgGreen.white \nRUNNING STRATEGY Half Year Cross-Over Strategy}`);

            const url = getURLForCandles({ symbol, interval, limit });
            const responseObject: Response = await fetchCandles({ url, symbol, interval, limit });
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
            const tulipDataStructure: ITulipDataStructure = await _getTulipDataStructureObjectFromJSONFile(
                filePathResponse
            );

            const buySignal = runStrategyAlgorithm(tulipDataStructure, strategyAlgorithm);

            // The analysis should be written to file: append line to file, with info about the buy signal, in CSV

            // Make this function as promise to wait for completion before consol-logging that the strat is done
            await notifyOnTelegram({
                time: fileNameCreatedTime,
                strategyName,
                buySignal,
                symbol,
                additionalMessage: additionalMessageToNotifier,
            });

            console.log(chalk`{bgBlue.white \nCOMPLETED STRATEGY Half Year Cross-Over Strategy}`);
            resolve("done");
        } catch (error) {
            reject(new Error(error));
        }
    });
}

/**
 * Runs specific strategy feeded through the config object
 * Run from root: cd src/data && npx ts-node halfYearCrossOverStrategyRun.ts
 * Output path: this folder; ./fetched/
 * Read path: context same as the output
 */

(async function runStrategyPromiseLoop(): Promise<void> {
    const config: IStrategyIteratorConfig = {
        strategyName: "Half Year Cross-Over Strategy",
        strategyAlgorithm: halfYearCrossOverStrategy, // The imported strategy function
        symbols: ["BTCUSDT", "ADABTC", "DOTBTC"], // ToDo: Import the symbols arr! + interface more compact
        interval: Interval.OneDay,
        limit: 201,
        fileFolder: "./fetched/",
        fileExtension: "json",
        additionalMessageToNotifier: undefined,
    };

    for (let i = 0; i < config.symbols.length; i++) {
        const symbol = config.symbols[i];
        const isResolved: string = await runStrategy({ ...config, symbol });
        isResolved === "done" && console.log(`\nStrategy iteration ${i + 1} of ${config.symbols.length} done`);
    }
})();
