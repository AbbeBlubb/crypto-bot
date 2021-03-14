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
import { runStrategy } from "./strategyUtils";
import { IHalfYearCrossOverStrategyRunConfig, IIteratorForStrategy } from "./strategy.types";

async function halfYearCrossOverStrategyRun({
    strategy,
    symbol,
    interval,
    limit,
    fileFolder,
    fileExtension,
    additionalMessageToNotifier,
}: IHalfYearCrossOverStrategyRunConfig): Promise<string> {
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

            const buySignal = runStrategy(tulipDataStructure, halfYearCrossOverStrategy);

            // The analysis should be written to file: append line to file, with info about the buy signal, in CSV

            // Make this function as promise to wait for completion before consol-logging that the strat is done
            notifyOnTelegram({
                time: fileNameCreatedTime,
                strategy,
                buySignal,
                symbol,
                additionalMessage: additionalMessageToNotifier,
            });

            console.log(chalk`{bgGreen.white \nCOMPLETED STRATEGY Half Year Cross-Over Strategy}`);
            resolve("done");
        } catch (error) {
            reject(new Error(error));
        }
    });
}

/**
 * Run from root: cd src/data && npx ts-node halfYearCrossOverStrategyRun.ts
 * Output path: this folder; ./fetched/
 * Read path: context same as the output
 */

(async function strategyPromiseLoop(): Promise<void> {
    const config: IIteratorForStrategy = {
        strategy: "Half Year Cross-Over Strategy",
        symbols: ["BTCUSDT", "ADABTC", "DOTBTC"], // ToDo: Import the symbols arr! + interface more compact
        interval: Interval.OneDay,
        limit: 201,
        fileFolder: "./fetched/",
        fileExtension: "json",
        additionalMessageToNotifier: undefined,
    };

    for (let i = 0; i < config.symbols.length; i++) {
        const symbol = config.symbols[i];
        const isResolved: string = await halfYearCrossOverStrategyRun({ ...config, symbol });
        isResolved === "done" && console.log(`\nStrategy iteration ${i + 1} of ${config.symbols.length + 1} done`);
    }
})();
