import * as path from "path";
import { ITulipDataStructure } from "../data/data.types";
import { _getTulipDataStructureObjectFromJSONFile } from "../data/tulipDataStructureUtils";
import { attachUnhandledRejectionListener } from "../utils/attachUnhandledRejectionListener";
import { MA200CrossOverStrategy } from "./MA200CrossOverStrategy";
import { runStrategy } from "./strategyUtils";

/**
 * Call context:
 *   - Must be called in context of this folder because of the filePath context.
 *   - Cd from root and then run file: > cd src/strategies/ && npx ts-node runMA200CrossOverStrategy.ts
 *   - Run from this folder context: > npx ts-node runMA200CrossOverStrategy.ts
 *
 * Prepare 2 things:
 *   - _getTulipDataStructure needs a file path as arg. The file must contain an array with candle-arrays
 *   - Then feed the Tulip Data Structure to the Strategy
 * 
 * Error handling
 *   - No try-catches here; this is made in the separate functions
 *   - When a function throw, the error will be catched by the unhandledRejection listener; strange but yes, even if it's an Error and not a Promise
 * 
 * ToDo:
 *   - Auto-fetch and write to file, then use the file
 */

(async function () {
    attachUnhandledRejectionListener(path.basename(__filename));
    new Promise((res, reject) => reject("Wops!"));
    const tulipDataStructure: ITulipDataStructure = await _getTulipDataStructureObjectFromJSONFile("./test-data/BTCUSDT20210310123251.json");
    const buySignal = runStrategy(tulipDataStructure, MA200CrossOverStrategy);
    console.log("\nBuy signal: ", buySignal);
})();
