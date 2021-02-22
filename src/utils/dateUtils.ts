function _getDateYYYYMMDD(): string {
    const today = new Date();
    const DD: string = String(today.getDate()).padStart(2, "0");
    const MM: string = String(today.getMonth() + 1).padStart(2, "0");
    const YYYY: number = today.getFullYear();
    return `${YYYY}-${MM}-${DD}`;
}

function _getTimeHHMMSS(): string {
    const today = new Date();
    const HH: string = String(today.getHours()).padStart(2, "0");
    const MM: string = String(today.getMinutes()).padStart(2, "0");
    const SS: string = String(today.getSeconds()).padStart(2, "0");
    return `${HH}:${MM}:${SS}`;
}

export function getLocalTimestamp(): string {
    return `${_getDateYYYYMMDD()} ${_getTimeHHMMSS()}`;
}
