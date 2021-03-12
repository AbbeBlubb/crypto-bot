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

interface IGetLocalTimeStampOptions {
    separatorInDate?: string; // 2021x03x09
    separatorInTime?: string; // 20x12x41
    separatorForDateAndTimeBlocks?: string; // 2021-03-09x20:12:41
    generalSeparator?: string | false; // 2021x03x09x20x12x41
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

function _getDateYYYYMMDD(separatorInDate = "."): string {
    const { yyyy, momo, dd }: Partial<IDateAndTimeDigits> = _getDateAndTimeDigits();
    return `${yyyy}${separatorInDate}${momo}${separatorInDate}${dd}`;
}

function _getTimeHHMMSS(separatorInTime = "."): string {
    const { hh, mimi, ss }: Partial<IDateAndTimeDigits> = _getDateAndTimeDigits();
    return `${hh}${separatorInTime}${mimi}${separatorInTime}${ss}`;
}

export function getDateAndTimeString({
    separatorInDate = ".",
    separatorInTime = ":",
    separatorForDateAndTimeBlocks = " ",
    generalSeparator = false,
}: IGetLocalTimeStampOptions = {}): string {
    if (generalSeparator === false) {
        return `${_getDateYYYYMMDD(separatorInDate)}${separatorForDateAndTimeBlocks}${_getTimeHHMMSS(separatorInTime)}`;
    } else {
        return `${_getDateYYYYMMDD(generalSeparator)}${generalSeparator}${_getTimeHHMMSS(generalSeparator)}`;
    }
}
