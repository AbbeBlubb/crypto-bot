import * as chalk from "chalk";
import { IRunStrategyAlgorithm, IStrategySignals } from "./strategy.types";

export function runStrategyAlgorithm({
    tulipDataStructure,
    strategyAlgorithm,
}: IRunStrategyAlgorithm): IStrategySignals {
    console.log(chalk`{yellow ANALYSING data}`);
    return strategyAlgorithm(tulipDataStructure);
}
