'use strict';

const Config = require('./test/testConfig.json');
const LiveCoin = require('./src/index');
const client = new LiveCoin(Config.key, Config.secret);

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

// Private Data API calls

client.getUserTrades({
  orderDesc: true,
  limit: 4
}).then(console.log).catch(console.error);

client.getClientOrders({openClosed: 'CANCELLED', startRow: 2})
.then(console.log).catch(console.error);

client.getUserOrder(88504958)
.then(console.log).catch(console.error);

client.getBalances('BTC')
.then(console.log).catch(console.error);

client.getBalance('BTC')
.then(console.log).catch(console.error);

client.getTransactions('1527810400000', '1527810401000', {
  types: 'BUY',
  limit: 2
}).then(console.log).catch(console.error);

client.getNumTransactions('1527810400000', '1527810401000', 'BUY')
.then(console.log).catch(console.error);

client.getTradingFee().then(console.log).catch(console.error);

client.getTradingFeeAndVolume().then(console.log).catch(console.error);

// Open/cancel Orders API calls

client.buyLimit('btc', 'usd', 10000, 0.1)
.then(console.log).catch(console.error);

client.sellLimit('btc', 'usd', 10000, 0.1)
.then(console.log).catch(console.error);

client.buyMarket('btc', 'usd', 0.1)
.then(console.log).catch(console.error);

client.sellMarket('btc', 'usd', 0.1)
.then(console.log).catch(console.error);

client.cancelLimit('btc', 'usd', 1111)
.then(console.log).catch(console.error);

// Deposit and Withdrawal API calls

client.getAddress('btc')
.then(console.log).catch(console.error);

client.withdraw(1, 'usd', '1MfTTxGnBBgvyk9477hWurosfqj8MZKkAG')
.then(console.log).catch(console.error);

client.toPayeer(1, 'usd', '1MfTTxGnBBgvyk9477hWurosfqj8MZKkAG', {
  protect: 1,
  protect_period: 3
}).then(console.log).catch(console.error);

client.toCapitalist(1, 'usd', '1MfTTxGnBBgvyk9477hWurosfqj8MZKkAG')
.then(console.log).catch(console.error);

client.toAdvcash(1, 'usd', '1MfTTxGnBBgvyk9477hWurosfqj8MZKkAG')
.then(console.log).catch(console.error);

client.toBankCard(1, 'usd', '5567025017512543', '09', '18')
.then(console.log).catch(console.error);

client.toOkpay(1, 'USD', 'OK123456789').then(console.log).catch(console.error);

client.toPerfectMoney(1, 'usd', '1MfTTxGnBBgvyk9477hWurosfqj8MZKkAG')
.then(console.log).catch(console.error);

// Vouchers API calls

client.makeVoucher(1, 'usd', 'need a voucher')
.then(console.log).catch(console.error);

client.getVoucherAmount('LVC-USD-12345678-87654321-ABCDEFGI-ABCD1234')
.then(console.log).catch(console.error);

client.redeemVoucher('LVC-USD-12345678-87654321-ABCDEFGI-ABCD1234')
.then(console.log).catch(console.error);