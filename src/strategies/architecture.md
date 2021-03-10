# Architecture for the strategies

run-file prepares data -> strategy file checks signals -> signals file checks indicators -> fileindicators are general

Run-file

- Prepares data
- Feeds the whole TulipDataStructure to the Strategy

Strategy file

- Prepares the TulipDataStructure data as the indicator functions wants the data
- Calls the indicator functions, like so: "latestPriceIsHigherThanLatestSMA200()"
- Calculates signal logic
- Returns true or false, depending on if the whole strategy (all the signals in the strategy) are fullfilled or not

Signals file

- Export functions that easily can be used to construct strategies
- All functions are named like so: "latestPriceIsHigherThanLatestSMA200()"

Indicator file

- Indicator functions are general
