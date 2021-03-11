import { createTulipDataStructureObject } from "../data/createTulipDataStructureObject";
import { ITulipDataStructure, MultiHistoricalCandles } from "../data/data.types";
import { readHistoricalCandlesFromFile } from "../utils/readFileUtils";
import { MA200CrossOverStrategy } from "./MA200CrossOverStrategy";
import { attachUnhandledRejectionListener } from "../utils/attachUnhandledRejectionListener";
import * as path from "path";

async function _getTulipDataStructure(filePath: string): Promise<ITulipDataStructure> {
    const multiHistoricalCandles: MultiHistoricalCandles = await readHistoricalCandlesFromFile(filePath);
    return createTulipDataStructureObject(multiHistoricalCandles);
}

function _runStrategy(
    tulipDataStructure: ITulipDataStructure,
    strategy: (arg: ITulipDataStructure) => boolean
): boolean {
    return strategy(tulipDataStructure);
}

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
    
    const tulipDataStructure: ITulipDataStructure = await _getTulipDataStructure("./BTCUSDT20210310123251.json");
    const buySignal = _runStrategy(tulipDataStructure, MA200CrossOverStrategy);
    console.log("\nBuy signal: ", buySignal);
})();
