import * as chalk from "chalk";
import { Response } from "node-fetch";
import * as path from "path";
import { ITulipDataStructure, Interval } from "../data/data.types";
import { fetchCandles, getURLForCandles } from "../data/fetchUtils";
import { _getTulipDataStructureObjectFromJSONFile } from "../data/tulipDataStructureUtils";
import { INotifyOnTelegramOptions, notifyOnTelegram } from "../notifier/telegramUtils";
import { attachUnhandledRejectionListener } from "../utils/attachUnhandledRejectionListener";
import { getFileNameForCandlesFile, writeStreamToFile } from "../utils/writeFileUtils";
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
}: IHalfYearCrossOverStrategyRunConfig) {
    attachUnhandledRejectionListener(path.basename(__filename));

    // 2. This run-function should take an options-argument: { symbolsArray = defaultSymbolsArray, candleTimeInterval, periods }. Ready-to-go otpions-objects in separate file

    const url = getURLForCandles({ symbol, interval, limit });
    const responseObject: Response = await fetchCandles({ url, symbol, interval, limit });
    const filePath: string = fileFolder + getFileNameForCandlesFile({ symbol, interval, limit, fileExtension });
    const filePathResponse: string = await writeStreamToFile({
        streamToWrite: responseObject.body,
        filePath,
    });
    const tulipDataStructure: ITulipDataStructure = await _getTulipDataStructureObjectFromJSONFile(filePathResponse);

    const buySignal = runStrategy(tulipDataStructure, halfYearCrossOverStrategy);

    // Append line to file, with info about the buy signal, in CSV

    // ToDo: those options
    const notifyOnTelegramOptions: INotifyOnTelegramOptions = {
        time: "20:00", // ToDo: time functionality!
        strategy,
        buySignal,
        symbol: "EURUSDT", // ToDo: When pairs are run from list
        message: "Great!",
    };

    notifyOnTelegram(notifyOnTelegramOptions);
}

const config: IHalfYearCrossOverStrategyRunConfig = {
    strategy: "Half Year Cross-Over Strategy",
    symbol: "BTCUSDT", // Symbols arr!
    interval: Interval.OneDay,
    limit: 201,
    fileFolder: "./fetched/",
    fileExtension: "json",
};

/**
 * Run from root: cd src/data && npx ts-node halfYearCrossOverStrategyRun.ts
 * Output path: this folder; ./fetched/
 * Read path: context same as the output
 */

halfYearCrossOverStrategyRun(config);
