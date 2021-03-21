# Strategi utrönad från Cryptoverse (Benjamin Cowen)

## Entry

* Inspiration: <https://www.youtube.com/watch?v=VWjuRwGdfTI>

Gäller för BTC, 1w:

* 21w EMA
* 20w SMA

Borde även gälla för 1d, isf:

* 21 x 7 = 147 EMA
* 20 x 7 = 140 SMA

Teorin

* Teorin är att i en lång uppgång så testar BTC 21w EMA eller 20w SMA och studsar uppåt
* Detta funkar INTE lika bra med SMA200; man missar trades då.

## Exit & SL

Behöver vara en kortare SMA/EMA, eftersom det annars kan sjunka rejält innan priset når EMA150/SMA140.

SL om priset sjunker till under köpsignalen. Kan ju vara så att säljsignal inte utlöses och att en SL därför behövs.

## TP

Om gummisnodden är för hårt spänd: förebråelse om kraftig rekyl ner.

Vad är för hårt spänd?

* Jämför en kort SMA med den långa som gav köpsignal

## Output data

### Interface

``` TypeScript
export interface IStrategySignals {
    enterLongAtMarketPrice: boolean;
    exitLongAtMarketPrice: boolean;
    takeProfit: number;
    stopLoss: number;
    report: { [key: string]: number | string | boolean };
}
```

### Object example

``` JavaScript
{
  enterLongAtMarketPrice: true,
  exitLongAtMarketPrice: false,
  takeProfit: 100,
  stopLoss: 90,
  report: {
    strategy: 'Half Year Cross-Over Strategy',
    latestSMA140: 0.0000013015714285714297,
    latestEMA150: 0.000001752424891334612,
    latestClosePrice: 0.00000397,
    isLatestCandleCloseHigherThanLatestSMA140: true,
    isLatestCandleCloseHigherThanLatestEMA150: true,
    isLatestCandleCloseHigherThanOneOfTheMAs: true,
    isLatestCandleCloseLowerThanLatestSMA140: false,
    isLatestCandleCloseLowerThanLatestEMA150: false,
    isLatestCandleCloseLowerThanOneOfTheMAs: false
  }
}
```
