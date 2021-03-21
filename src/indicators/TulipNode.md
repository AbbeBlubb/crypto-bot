# Tulip Node and other libs for TA

## Tulip Node - Tulip Indicators for Nodejs

Wrapper for Tulip Indicators

### Tulip Node sources

* Documentation
  * <https://tulipindicators.org/list>
* Tulip Node GitHub repo:
  * <https://github.com/TulipCharts/tulipnode>
* Tulip Node NPM registry:
  * <https://www.npmjs.com/package/tulind>
* Tulip Node video and code examples:
  * <https://www.youtube.com/watch?v=G03vE4ZVrNk>
  * <https://github.com/karthik947/Tulip-Indicators>

### Install for Linux

Observe that the name of the library is Tulip Node, althought the name in the NPM registry is "tulind", as for "Tulip Indicators".

``` Bash
> sudo apt-get install
> sudo apt-get update
> sudo apt-get install build-essential
> npm install tulind
```

## How to use Tulip Node

* Documentation:
  * <https://tulipindicators.org/list>

### Indicators

Log all indicators:

``` JavaScript
console.log(tulind.indicators);
```

### Indicator arguments

Log the specific indicator to see it's arguments:

``` JavaScript
console.log(tulind.indicators.stoch);
```

Produces:

```JavaScript
{
  name: 'stoch',
  full_name: 'Stochastic Oscillator',
  type: 'indicator',
  inputs: 3,
  options: 3,
  outputs: 2,
  input_names: [ 'high', 'low', 'close' ],
  option_names: [ '%k period', '%k slowing period', '%d period' ],
  output_names: [ 'stoch_k', 'stoch_d' ],
  indicator: [Function (anonymous)],
  start: [Function (anonymous)]
}
```

### Input data structure

* GitHub repo examples assume you have price data like this below
* Data order is from oldest to newset (index 0 is the oldest)

``` Javascript
              oldest            newest
var open   = [4,5,5,5,4,4,4,6,6,6];
var high   = [9,7,8,7,8,8,7,7,8,7];
var low    = [1,2,3,3,2,1,2,2,2,3];
var close  = [4,5,6,6,6,5,5,5,6,4];
var volume = [123,232,212,232,111,232,212,321,232,321];
```
