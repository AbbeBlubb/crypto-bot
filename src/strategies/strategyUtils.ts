import * as chalk from "chalk";
import { IRunStrategyAlgorithm, IStrategySignals } from "./strategy.types";

export function runStrategyAlgorithm({
    symbol,
    tulipDataStructure,
    strategyAlgorithm,
}: IRunStrategyAlgorithm): IStrategySignals {
    console.log(chalk`{yellow ANALYSING data}`);
    return strategyAlgorithm({ symbol, tulipDataStructure });
}
