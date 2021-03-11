import { MultiHistoricalCandles, ITulipDataStructure, SingleHistoricalCandle } from "./data.types";

export function createTulipDataStructureObject(multiHistoricalCandles: MultiHistoricalCandles): ITulipDataStructure {
    try {
        const open = multiHistoricalCandles.map((array: SingleHistoricalCandle) => array[1]);
        const high = multiHistoricalCandles.map((array: SingleHistoricalCandle) => array[2]);
        const low = multiHistoricalCandles.map((array: SingleHistoricalCandle) => array[3]);
        const close = multiHistoricalCandles.map((array: SingleHistoricalCandle) => array[4]);
        return { open, high, low, close };
    } catch (err) {
        throw new Error("Unexpected data: " + err);
    }
}
