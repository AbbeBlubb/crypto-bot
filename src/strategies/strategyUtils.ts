import { ITulipDataStructure } from "../data/data.types";

export function runStrategyAlgorithm(
    tulipDataStructure: ITulipDataStructure,
    strategyAlgorithm: (tulipDataStructure: ITulipDataStructure) => boolean
): boolean {
    return strategyAlgorithm(tulipDataStructure);
}
