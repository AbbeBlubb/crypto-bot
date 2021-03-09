/**
 * Call to getLocalTimeStamp() will return date and time in the format "2021-03-09 20:12:41"
 */

interface IGetLocalTimeStampOptions {
    separatorInDate?: string;
    separatorInTime?: string;
    separatorForDateAndTimeBlocks?: string;
}

function _getDateYYYYMMDD(separatorInDate = "-"): string {
    const today = new Date();
    const DD = String(today.getDate()).padStart(2, "0");
    const MM = String(today.getMonth() + 1).padStart(2, "0");
    const YYYY = String(today.getFullYear());
    return `${YYYY}${separatorInDate}${MM}${separatorInDate}${DD}`;
}

function _getTimeHHMMSS(separatorInTime = ":"): string {
    const today = new Date();
    const HH = String(today.getHours()).padStart(2, "0");
    const MM = String(today.getMinutes()).padStart(2, "0");
    const SS = String(today.getSeconds()).padStart(2, "0");
    return `${HH}${separatorInTime}${MM}${separatorInTime}${SS}`;
}

export function getLocalTimestamp({
    separatorInDate = "-",
    separatorInTime = ":",
    separatorForDateAndTimeBlocks = " ",
}: IGetLocalTimeStampOptions = {}): string {
    return `${_getDateYYYYMMDD(separatorInDate)}${separatorForDateAndTimeBlocks}${_getTimeHHMMSS(separatorInTime)}`;
}
