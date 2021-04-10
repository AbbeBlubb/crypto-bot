import { runStrategy } from "./runStrategy";
import { shortTermBullish } from "./shortTermBullishStrategy";

/**
 * This will be run by the server with interval
 * Run from root: cd src/strategies && npx ts-node start.ts
 */

runStrategy(shortTermBullish);
