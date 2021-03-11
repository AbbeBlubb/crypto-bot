# Architecture for the strategies

## Chain

* Run-file gets the data needed for the Strategy ->
* Strategy runs Indicators (that returns arrays), extract nessesary data for the Indicators, and then feeds nessesasry data to the Signals ->
* Signals are for specific cases responds with boolean ->
* Indicators are general and responds with array ->
* The Run-file recieves a boolan from the Strategy and then manages the notifications and/or orders

## Run-file

* Gets the data in the format Tulip wants it in - here called "Tulip Data Structure Object"
  * The data needs to be imported/fetched
  * The data needs to be parsed from JSON to JS
  * The data needs to be processed to a Tulip Data Structure Object
* Then the run-file it feeds the whole Tulip Data Structure Object in to the Strategy
* The run-file recieves a boolean from the Strategy
* The run-file then makes the nessesary notifications

## Strategy file

* Prepares the data from the Tulip Data Structure Object
  * Calls Indicators to recieve data
  * Uses the Indicators data to call Signals
* Because the Strategy prepares the data, the same data can be sent to several Indicators, and the reieved data from Indicators can be sent to several Signals
* Data needs to be as the Indicators and Signals wants the data
* Returns true or false, depending on if the whole strategy (all the signals in the strategy) are fullfilled or not

## Signals file

* Export functions that easily can be used to construct strategies
* All functions are named like so: "latestPriceIsHigherThanLatestSMA200()"
* Signals are specific in order to be possible to use as declarative requesites in the Strategy
* Might call Indicators (but this should be done by the Strategy to keep things simple)
* Returns true or false, depending on if the Signal is fulfilled or not

## Indicator file

* The Indicator processes the needed data feeded from the Strategy
* Indicator functions are general Indicators; the SMA Indicator calculates all kinds of SMA
* Returns an array
