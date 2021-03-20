import * as chalk from "chalk";
import { MultiHistoricalCandles, ITulipDataStructure, SingleHistoricalCandle } from "./data.types";
import { readHistoricalCandlesFromFile } from "../utils/readFileUtils";

function _createTulipDataStructureObject(multiHistoricalCandles: MultiHistoricalCandles): ITulipDataStructure {
    console.log(chalk`{yellow PROCESSING data}`);
    try {
        const open = multiHistoricalCandles.map((array: SingleHistoricalCandle) => parseFloat(array[1]));
        const high = multiHistoricalCandles.map((array: SingleHistoricalCandle) => parseFloat(array[2]));
        const low = multiHistoricalCandles.map((array: SingleHistoricalCandle) => parseFloat(array[3]));
        const close = multiHistoricalCandles.map((array: SingleHistoricalCandle) => parseFloat(array[4]));
        return { open, high, low, close };
    } catch (err) {
        throw new Error("Unexpected data: " + err);
    }
}

export async function getTulipDataStructureObjectFromJSONFile(filePath: string): Promise<ITulipDataStructure> {
    const multiHistoricalCandles: MultiHistoricalCandles = await readHistoricalCandlesFromFile(filePath);
    return _createTulipDataStructureObject(multiHistoricalCandles);
}
