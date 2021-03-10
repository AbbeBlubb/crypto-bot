import * as tulind from "tulind";

/**
 * ToDo:
 * - Export types to separate file
 * - Typing in MA200 function
 * - Make the function general
 * - Maby this indicators should take an TulipDataStructure object, but with ? in keys
 */
type ClosePrices = number[];

export function MA200CrossOver(arrayWithClosePrices: ClosePrices): boolean {
    const close = arrayWithClosePrices;
    console.log("\nArray with close prices:\n\n", arrayWithClosePrices);

    // Calculate MA200 in separate function
    tulind.indicators.sma.indicator([close], [200], (err, res) => {
        if (err) return console.log(err);
        console.log("\nArray with SMA200:\n\n", res[0]);
        // log(res[0].slice(-1)[0]);
    });

    // Is price over MA200?

    return false;
}

/**
 * Run: > npx ts-node MA200CrossOver.ts
 */
