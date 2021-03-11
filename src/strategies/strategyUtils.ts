import { ITulipDataStructure } from "../data/data.types";

export function runStrategy(
    tulipDataStructure: ITulipDataStructure,
    strategy: (arg: ITulipDataStructure) => boolean
): boolean {
    return strategy(tulipDataStructure);
}
