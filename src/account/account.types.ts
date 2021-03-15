export interface ITotalCryptoBalanceFromNBA {
    [key: string]: { available: string; onOrder: string };
}

export type TMyCryptoBalance = [{ currency: string; available: string; onorder: string }];
