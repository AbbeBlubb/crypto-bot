import { bgBlue } from "chalk";

/**
 * Test the listener in the callee file with: new Promise((res, reject) => reject("Wops!"));
 */

export function attachUnhandledRejectionListener(callee: string): NodeJS.Process {
    return process.on("unhandledRejection", (err) => {
        console.error(`\nUnhandled Promise rejection, taken care of in listener attatched in ${callee}: `, err);
        process.exit(1);
    });
}
