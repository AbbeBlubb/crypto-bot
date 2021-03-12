import { getDateAndTimeDigits } from "./dateAndTime";

interface IGetFileNameForCandlesFile {
    symbol: string;
    interval: string;
    limit: number;
    fileExtension: string;
}

// Returns filename: BTCUSDT--2021.03.12--23.13--10.999--1d--200.json
export function getFileNameForCandlesFile({
    symbol,
    interval,
    limit,
    fileExtension,
}: IGetFileNameForCandlesFile): string {
    const { yyyy, momo, dd, hh, mimi, ss, msmsms } = getDateAndTimeDigits();
    return `${symbol}--${yyyy}.${momo}.${dd}--${hh}.${mimi}--${ss}.${msmsms}--${interval}--${limit}.${fileExtension}`;
}
