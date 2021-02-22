function _getDateYYYYMMDD(): string {
    const today = new Date();
    const DD = String(today.getDate()).padStart(2, "0");
    const MM = String(today.getMonth() + 1).padStart(2, "0");
    const YYYY = String(today.getFullYear());
    return `${YYYY}-${MM}-${DD}`;
}

function _getTimeHHMMSS(): string {
    const today = new Date();
    const HH = String(today.getHours()).padStart(2, "0");
    const MM = String(today.getMinutes()).padStart(2, "0");
    const SS = String(today.getSeconds()).padStart(2, "0");
    return `${HH}:${MM}:${SS}`;
}

// ToDo: use lib like Luxon
export function getLocalTimestamp(): string {
    return `${_getDateYYYYMMDD()} ${_getTimeHHMMSS()} (+1h)`;
}
