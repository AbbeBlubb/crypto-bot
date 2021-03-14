import { IRunStrategyAlgorithm, IStrategySignals } from "./strategy.types";

export function runStrategyAlgorithm({
    tulipDataStructure,
    strategyAlgorithm,
}: IRunStrategyAlgorithm): IStrategySignals {
    return strategyAlgorithm(tulipDataStructure);
}
