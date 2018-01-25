# livecoin-api

Simple LiveCoin API wrapper for Node.js

LiveCoin API documentation can be found at <https://www.livecoin.net/api/common>

Currently only wraps the Public Data section of the LiveCoin API, the rest to come soon!

## Installation

  `npm install livecoin-api`

## Usage

```js
const LiveCoin = require('livecoin-api');
const client = new LiveCoin('key here', 'secret here');

client.getTicker('btc', 'usd').then(console.log).catch(console.error);
client.getAllTickers().then(console.log).catch(console.error);
client.getCurrencies().then(console.log).catch(console.error);
```

See examples.js for more examples.

## Tests

  `npm test`

## API

Check out the documentation at <https://github.com/abhinavk99/livecoin-api/blob/master/docs.md>

## Contributing

Contributions welcome!
