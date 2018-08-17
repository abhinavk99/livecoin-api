const LiveCoin = require('livecoin-api');
// Get your key and secret from livecoin.net
const client = new LiveCoin('key here', 'secret here');

// Gets price of BTC/USD
client.getTicker('BTC', 'USD')
  .then(console.log)
  .catch(console.error);

// Buys 0.5 BTC with USD at market price
client.buyMarket('BTC', 'USD', 0.5)
  .then(console.log)
  .catch(console.error);

// Sells 0.3 BTC with USD at $6,350
client.sellLimit('BTC', 'USD', 6350, 0.3)
  .then(console.log)
  .catch(console.error);
