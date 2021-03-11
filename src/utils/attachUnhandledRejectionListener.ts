import * as chalk from "chalk";

/**
 * Test the listener in the callee file with: new Promise((res, reject) => reject("Wops!"));
 */

export function attachUnhandledRejectionListener(callee: string): NodeJS.Process {
    return process.on("unhandledRejection", (err) => {
        console.error(
            chalk`\n{bgRed.white.bold Unhandled Promise rejection, taken care of in listener attatched in ${callee}:}\n`,
            err,
            "\n"
        );
        process.exit(1);
    });
}
