import * as path from "path";
import { ITulipDataStructure } from "../data/data.types";
import { _getTulipDataStructureObjectFromJSONFile } from "../data/tulipDataStructureUtils";
import { INotifyOnTelegramOptions, notifyOnTelegram } from "../notifier/telegramUtils";
import { attachUnhandledRejectionListener } from "../utils/attachUnhandledRejectionListener";
import { halfYearCrossOverStrategy } from "./halfYearCrossOverStrategy";
import { runStrategy } from "./strategyUtils";

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

(async function () {
    attachUnhandledRejectionListener(path.basename(__filename));

    // 2. This run-function should take an options-argument: { symbolsArray = defaultSymbolsArray, candleTimeInterval, periods }. Ready-to-go otpions-objects in separate file

    // 1. a. Functionality here for fetching (copy from testRunFetchHistoricalCandles)
    //    b. Fetch file name passed to the tulipDataStructure functionality

    // 3. forEach(symbol in argsList) ...

    const tulipDataStructure: ITulipDataStructure = await _getTulipDataStructureObjectFromJSONFile(
        "./test-data/BTCUSDT20210310123251.json"
    );

    const buySignal = runStrategy(tulipDataStructure, halfYearCrossOverStrategy);

    // Append line to file, with info about the buy signal, in CSV

    // ToDo: those options
    const notifyOnTelegramOptions: INotifyOnTelegramOptions = {
        time: "20:00", // ToDo: time functionality!
        strategy: "HalfYearCrossOverStrategy",
        buySignal,
        symbol: "EURUSDT", // ToDo: When pairs are run from list
        message: "Great!",
    };

    notifyOnTelegram(notifyOnTelegramOptions);
})();
