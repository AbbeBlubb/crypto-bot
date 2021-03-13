import * as chalk from "chalk";
import { Response } from "node-fetch";
import * as path from "path";
import { ITulipDataStructure, Interval } from "../data/data.types";
import { fetchCandles, getURLForCandles } from "../data/fetchUtils";
import { _getTulipDataStructureObjectFromJSONFile } from "../data/tulipDataStructureUtils";
import { INotifyOnTelegramOptions, notifyOnTelegram } from "../notifier/telegramUtils";
import { attachUnhandledRejectionListener } from "../utils/attachUnhandledRejectionListener";
import { getFileNameForCandlesFile, IFileNameObject, writeStreamToFile } from "../utils/writeFileUtils";
import { halfYearCrossOverStrategy } from "./halfYearCrossOverStrategy";
import { runStrategy } from "./strategyUtils";
import { IHalfYearCrossOverStrategyRunConfig } from "./strategy.types";

/**
 * Call context:
 *   - Must be called in context of this folder because of the filePath context.
 *   - Cd from root and then run file: > cd src/strategies/ && npx ts-node runHalfYearCrossOverStrategy.ts
 *   - Run from this folder context: > npx ts-node runHalfYearCrossOverStrategy.ts
 *
 * ToDo:
 *   - Auto-fetch and write to file, then use the file
 *   - Use for many cryptos
 */

async function halfYearCrossOverStrategyRun({
    strategy,
    symbol,
    interval,
    limit,
    fileFolder,
    fileExtension,
    additionalMessageToNotifier,
}: IHalfYearCrossOverStrategyRunConfig) {
    attachUnhandledRejectionListener(path.basename(__filename));
    console.log(chalk`{bgGreen.white RUNNING STRATEGY Half Year Cross-Over Strategy}`);
    // 2. This run-function should take an options-argument: { symbolsArray = defaultSymbolsArray, candleTimeInterval, periods }. Ready-to-go otpions-objects in separate file

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
    const tulipDataStructure: ITulipDataStructure = await _getTulipDataStructureObjectFromJSONFile(filePathResponse);

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

    console.log(chalk`{bgGreen.white COMPLETED STRATEGY Half Year Cross-Over Strategy}`);
}

const config: IHalfYearCrossOverStrategyRunConfig = {
    strategy: "Half Year Cross-Over Strategy",
    symbol: "BTCUSDT", // Symbols arr!
    interval: Interval.OneDay,
    limit: 201,
    fileFolder: "./fetched/",
    fileExtension: "json",
    additionalMessageToNotifier: undefined,
};

/**
 * Run from root: cd src/data && npx ts-node halfYearCrossOverStrategyRun.ts
 * Output path: this folder; ./fetched/
 * Read path: context same as the output
 */

halfYearCrossOverStrategyRun(config);
