# Crypto Bot

## Run single TypeScript files

Transpile and run with ts-node:

``` Nodejs
> npx ts-node get.ts
```

Or the classic way:

``` Nodejs
> npm install -g typescript
> tsc <fileName>.ts
> node <filName>.js
```

## Lib: Binance.options

If want to take a look at the Binance.options settins, make a console.log after line 282 in file:
/home/abbe/projects/crypto-bot/node_modules/node-binance-api/node-binance-api.js

## Preload dotenv file

### Problem

.env vars are undefined in the app, despite being imported and loaded first thing in the app:

```nodejs
import * as dotenv from "dotenv";
dotenv.config();
```

### Solution

If using import in the app instead of require, preload the dotenv file when starting the app:

```nodejs
> node -r dotenv/config app.js
```

When using Nodemon, do this in the Nodemon config. In nodemon.json -> execMap -> ts, add:

```JavaScript
-r dotenv/config
 ```

Then, you don't need to require and load dotenv in your application code. So delete:

```nodejs
import * as dotenv from "dotenv";
dotenv.config();
```
