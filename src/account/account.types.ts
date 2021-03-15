export interface ITotalCryptoBalanceFromNBA {
    [key: string]: { available: string; onOrder: string };
}

export type TMyTotalCryptoBalance = Array<ISingleCryptoBalance>;

export interface ISingleCryptoBalance {
    currency: string;
    available: string;
    onorder: string;
}
