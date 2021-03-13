import { readFile } from "fs";
import { MultiHistoricalCandles } from "../data/data.types";

/**
 * Reads a file path from the context of the callee
 */

async function _readJSONFileToJS(filePath: string): Promise<any> {
    return new Promise(function (resolve, reject) {
        readFile(filePath, function (err, data) {
            if (err) {
                reject(err);
            } else if (data === undefined) {
                reject("Undefined data in readJSONFileToJS");
            } else {
                // var data is a buffer. JSON.parse requires a string. Therefore, the buffer.toString() method is used on var data.
                const parsedData = JSON.parse(data.toString("utf8"));
                resolve(parsedData);
            }
        });
    }).catch(function (err) {
        throw new Error("Error in readJSONFileToJS:\n" + err);
    });
}

/**
 * Separate functions for each case in order to have clear function return types
 */

export async function readHistoricalCandlesFromFile(filePath: string): Promise<MultiHistoricalCandles> {
    try {
        return await _readJSONFileToJS(filePath);
    } catch (err) {
        throw new Error("Error returned from readJSONFileToJS" + err);
    }
}
