/**
 * Call to getLocalTimeStamp() will return date and time in the format "2021-03-09 20:12:41"
 */

interface IDateAndTimeDigits {
    yyyy: string;
    momo: string;
    dd: string;
    hh: string;
    mimi: string;
    ss: string;
    msms: string;
}

function _getDateAndTimeDigits(): IDateAndTimeDigits {
    const today = new Date();
    const yyyy = String(today.getFullYear());
    const momo = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    const hh = String(today.getHours()).padStart(2, "0");
    const mimi = String(today.getMinutes()).padStart(2, "0");
    const ss = String(today.getSeconds()).padStart(2, "0");
    const msms = String(today.getMilliseconds()).padStart(2, "0");
    return { yyyy, momo, dd, hh, mimi, ss, msms };
}

export function getDateYYYYMMDD(separatorInDate = "."): string {
    const { yyyy, momo, dd }: Partial<IDateAndTimeDigits> = _getDateAndTimeDigits();
    return `${yyyy}${separatorInDate}${momo}${separatorInDate}${dd}`;
}

export function getTimeHHMMSS(separatorInTime = "."): string {
    const { hh, mimi, ss }: Partial<IDateAndTimeDigits> = _getDateAndTimeDigits();
    return `${hh}${separatorInTime}${mimi}${separatorInTime}${ss}`;
}

export function getDateAndTimeForConsole(): string {
    const { yyyy, momo, dd, hh, mimi }: Partial<IDateAndTimeDigits> = _getDateAndTimeDigits();
    return `${yyyy}.${momo}.${dd} ${hh}:${mimi}`;
}
