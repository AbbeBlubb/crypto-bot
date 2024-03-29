# Send message to Telegram Channel with your Telegram Bot

Your Bot will post messages to a Channel!

## URL

* GET method with query parameters, no payload needed

``` Url
https://api.telegram.org/bot[TELEGRAM_BOT_API_KEY]/sendMessage?chat_id=[TELEGRAM_CHANNEL]&text=[MESSAGE_TEXT]
```

## Vars

* TELEGRAM_BOT_API_KEY
  * The API Key generated by BotFather when you created your Bot
  * Search for the BotFather in you Telegram, create your own Bot from the chat with the BotFather, and then create a channel where you give admin permissons to your Bot
  * Instructions on how to create your own Telegram Bot and get your Telegram Bot API key: <https://core.telegram.org/bots#6-botfather> or just write "/start" in the BotFather chat
* TELEGRAM_CHANNEL
  * The handle of your public Channel (e.g. @channel_name) or the unique Channel ID of your private Channel
  * You can see the unique Channel ID in the URL on Telegram Web (the HTTP API call), eg:
    * Telegram Web URL: <https://web.telegram.org/#/im?p=c1291738837_11332353189777368028>
    * Specific Channel URL: 1291738837_11332353189777368028
    * Extract preliminary ID from the Channel URL: 1291738837
    * Make it 13 digits adding "100" at the beginning: 1001291738837
    * Make it negative with a dash: -1001291738837
    * Result Channel-ID: -1001291738837
* MESSAGE
  * URL-encoded text message

## Lib

Simple lib, just a few lines of code: <https://github.com/christian-fei/simple-telegram-message>

## Sources

* How to get an id to use on Telegram Messenger <https://github.com/GabrielRF/telegram-id#web-channel-id>
* Sending a message to a Telegram channel the easy way <https://xabaras.medium.com/sending-a-message-to-a-telegram-channel-the-easy-way-eb0a0b32968>
* How to send a message to a Telegram channel using the HTTP bot sendMessage API <https://usefulmix.com/send-message-telegram-channel-bot-http-api/>
