# Architecture for the strategies

run-file prepares data -> strategy checks signals -> indicators are general

Run-file

- Prepares data
- Feeds the whole TulipDataStructure to the Strategy

Strategy file

- Prepares the TulipDataStructure data as the indicator functions wants the data
- Calls the indicators
- Calculates signal logic
- Returns true or false, depending on if the whole strategy (all the signals in the strategy) are fullfilled or not

Indicator file

- Indicator functions are general
