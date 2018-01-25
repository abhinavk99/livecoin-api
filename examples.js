'use strict';

const LiveCoin = require('./index');
const client = new LiveCoin();

// Public Data API calls

client.getTicker('btc', 'usd')
.then(console.log).catch(console.error);

client.getAllTickers()
.then(console.log).catch(console.error);

client.getLastTrades('btc', 'usd', {
  minOrHr: true, 
  type: "BUY"
}).then(console.log).catch(console.error);

client.getOrders('btc', 'usd', {
  groupByPrice: true, 
  depth: 4
}).then(console.log).catch(console.error);

client.getAllOrders({
  groupByPrice: true, 
  depth: 4
}).then(console.log).catch(console.error);

client.getBidAndAsk('btc', 'usd')
.then(console.log).catch(console.error);

client.getAllBidsAndAsks()
.then(console.log).catch(console.error);

client.getRestrictions()
.then(console.log).catch(console.error);

client.getCurrencies()
.then(console.log).catch(console.error);