import { readFile } from "fs";

/**
 * Reads a file path from the context of the callee
 */
export function readJSONFileToJS(filePath: string): Promise<any> {
    return new Promise(function (resolve, reject) {
        readFile(filePath, (err, data) => {
            if (err) {
                return reject(err);
            } else if (data === undefined) {
                return reject("Undefined data in readJSONFileToJS");
            } else {
                // var data is a buffer. JSON.parse requires a string. Therefore, the buffer.toString() method is used on var data.
                const parsedData = JSON.parse(data.toString("utf8"));
                resolve(parsedData);
            }
        });
    });
}
