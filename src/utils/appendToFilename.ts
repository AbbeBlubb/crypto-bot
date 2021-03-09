/**
 * Inserts given string before the file name extension
 */
interface IAppendToFilenameOptions {
    filename: string;
    stringToAppend: string;
}

export function appendToFilename({ filename, stringToAppend }: IAppendToFilenameOptions): string {
    const dotIndex = filename.lastIndexOf(".");
    if (dotIndex == -1) return filename + stringToAppend;
    else return filename.substring(0, dotIndex) + stringToAppend + filename.substring(dotIndex);
}
