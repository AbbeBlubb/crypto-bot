import { runStrategy } from "./runStrategy";
import { shortTermBullish } from "./shortTermBullishStrategy";

/**
 * Run from root: cd src/strategies && npx ts-node start.ts
 */

runStrategy(shortTermBullish);
