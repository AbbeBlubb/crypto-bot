# getBalance

## Output data on console

``` Text
BALANCE 2021.03.21 12:13 
- ADA: 504.00000000
- BNB: 0.14925692
- BTC: 0.00011320
- ETH: 0.00000000
- DOT: 0.00000000
- LINK: 0.00000000
- LIT: 0.00000000
- LTC: 0.00000000
- RVN: 0.00000000
- EUR: 1698.08424162
```

## Interface

``` TypeScript
export type TMyTotalCryptoBalance = Array<ISingleCryptoBalance>;

export interface ISingleCryptoBalance {
    currency: string;
    available: string;
    onorder: string;
}
```

## Object

``` JavaScript
[
  { currency: 'ADA', available: '504.00000000', onOrder: '0.00000000' },
  { currency: 'BNB', available: '0.14925692', onOrder: '0.00000000' },
  { currency: 'BTC', available: '0.00011320', onOrder: '0.00000000' },
  { currency: 'ETH', available: '0.00000000', onOrder: '0.00000000' },
  { currency: 'DOT', available: '0.00000000', onOrder: '0.00000000' },
  { currency: 'LINK', available: '0.00000000', onOrder: '0.00000000' },
  { currency: 'LIT', available: '0.00000000', onOrder: '0.00000000' },
  { currency: 'LTC', available: '0.00000000', onOrder: '0.00000000' },
  { currency: 'RVN', available: '0.00000000', onOrder: '0.00000000' },
  {
    currency: 'EUR',
    available: '1698.08424162',
    onOrder: '0.00000000'
  }
]
```
