/**
 * Call to getLocalTimeStamp() will return date and time in the format "2021-03-09 20:12:41"
 */

interface IGetLocalTimeStampOptions {
    separatorInDate?: string; // 2021x03x09
    separatorInTime?: string; // 20x12x41
    separatorForDateAndTimeBlocks?: string; // 2021-03-09x20:12:41
    generalSeparator?: string | false; // 2021x03x09x20x12x41
}

interface IDateDigits {
    YYYY: string;
    MM: string;
    DD: string;
}

interface ITimeDigits {
    HH: string;
    MM: string;
    SS: string;
    MsMs: string;
}

function _getDateDigits(): IDateDigits {
    const today = new Date();
    const YYYY = String(today.getFullYear());
    const MM = String(today.getMonth() + 1).padStart(2, "0");
    const DD = String(today.getDate()).padStart(2, "0");
    return { YYYY, MM, DD };
}

function _getDateYYYYMMDD(separatorInDate = "."): string {
    const { YYYY, MM, DD }: IDateDigits = _getDateDigits();
    return `${YYYY}${separatorInDate}${MM}${separatorInDate}${DD}`;
}

function _getTimeDigits(): ITimeDigits {
    const today = new Date();
    const HH = String(today.getHours()).padStart(2, "0");
    const MM = String(today.getMinutes()).padStart(2, "0");
    const SS = String(today.getSeconds()).padStart(2, "0");
    const MsMs = String(today.getMilliseconds()).padStart(2, "0");
    return { HH, MM, SS, MsMs };
}

function _getTimeHHMMSS(separatorInTime = "."): string {
    const { HH, MM, SS } = _getTimeDigits();
    return `${HH}${separatorInTime}${MM}${separatorInTime}${SS}`;
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
