'use strict';

const RequestHandler = require('./requestHandler');

const Orders = require('./Methods/orders');
const Transfers = require('./Methods/transfers');
const Vouchers = require('./Methods/vouchers');

/** Class representing LiveCoin client */
class LiveCoin {

  /**
   *  Creates an instance of LiveCoin (Key and secret needed if using private section API calls)
   *  @param {string=} apiKey - API key generated from LiveCoin
   *  @param {string=} apiSecret - API secret generated from LiveCoin
   *  @example
   *  const client = new LiveCoin('key here', 'secret here');
   */
  constructor(apiKey = '', apiSecret = '') {
    this.handler = new RequestHandler(apiKey, apiSecret);
    this.ordersClient = new Orders(apiKey, apiSecret);
    this.transfersClient = new Transfers(apiKey, apiSecret);
    this.vouchersClient = new Vouchers(apiKey, apiSecret);
    this.login(apiKey, apiSecret);
  }

  /**
   *  Set client's API key and secret after constructing the object
   *  @param {string} apiKey - API key generated from LiveCoin
   *  @param {string} apiSecret - API secret generated from LiveCoin
   *  @example
   *  client.login('key here', 'secret here');
   */
  login(apiKey, apiSecret) {
    this.handler.login(apiKey, apiSecret);
    this.ordersClient.login(apiKey, apiSecret);
    this.transfersClient.login(apiKey, apiSecret);
    this.vouchersClient.login(apiKey, apiSecret);
  }

  /**
   *  Get ticker information
   *  @param {string} ticker - currency ticker
   *  @param {string} pair - currency being traded with
   *  @return {Object} ticker information
   *  @example
   *  client.getTicker('btc', 'usd').then(console.log).catch(console.error);
   */
  getTicker(ticker, pair) {
    let options = { currencyPair: `${ticker}/${pair}`.toUpperCase() };
    return this.handler.request('exchange/ticker', options, 'GET', false);
  }

  /**
   *  Get all tickers' information
   *  @return {Object} all tickers' information
   *  @example
   *  client.getAllTickers().then(console.log).catch(console.error);
   */
  getAllTickers() {
    return this.handler.request('exchange/ticker', {}, 'GET', false);
  }

  /**
   *  Get information on most recent trades 
   *  @param {string} ticker - currency ticker
   *  @param {string} pair - currency being traded with
   *  @param {Object=} options - options for the query
   *  @param {boolean=} options.minOrHr - if true, info from minute, else hour
   *  @param {string=} options.type - must be either BUY or SELL
   *  @return {Object} information on most recent trades
   *  @example
   *  client.getLastTrades('btc', 'usd').then(console.log);
   *  client.getLastTrades('eth', 'btc', {minOrHr: true}).then(console.log);
   */
  getLastTrades(ticker, pair, options) {
    options.currencyPair = `${ticker}/${pair}`.toUpperCase();
    return this.handler.request('exchange/last_trades', options, 'GET', false);
  }

  /**
   *  Get information on orders 
   *  @param {string} ticker - currency ticker
   *  @param {string} pair - currency being traded with
   *  @param {Object=} options - options for the query
   *  @param {boolean=} options.groupByPrice - if true, groups by price
   *  @param {number=} options.depth - maximum number of orders to return
   *  @return {Object} information on orders
   *  @example
   *  client.getOrders('btc', 'usd').then(console.log).catch(console.log);
   *  client.getOrders('eth', 'btc', {groupByPrice: true, depth: 4}).then(console.log);
   */
  getOrders(ticker, pair, options) {
    options.currencyPair = `${ticker}/${pair}`.toUpperCase();
    return this.handler.request('exchange/order_book', options, 'GET', false);
  }

  /**
   *  Get information on orders for all exchanges
   *  @param {Object=} options - options for the query
   *  @param {boolean=} options.groupByPrice - if true, groups by price
   *  @param {number=} options.depth - maximum number of orders to return
   *  @return {Object} information on orders for all exchanges
   *  @example
   *  client.getAllOrders().then(console.log).catch(console.log);
   *  client.getAllOrders({groupByPrice: true, depth: 4}).then(console.log);
   */
  getAllOrders(options) {
    return this.handler.request('exchange/all/order_book', options, 'GET', false);
  }

  /**
   *  Get maximum bid and minimum ask for a currency
   *  @param {string} ticker - currency ticker
   *  @param {string} pair - currency being traded with
   *  @return {Object} maximum bid and minimum ask
   *  @example
   *  client.getBidAndAsk('btc', 'usd').then(console.log).catch(console.error);
   */
  getBidAndAsk(ticker, pair) {
    let params = { currencyPair: `${ticker}/${pair}`.toUpperCase() };
    return this.handler.request('exchange/maxbid_minask', params, 'GET', false);
  }

  /**
   *  Get maximum bid and minimum ask for all currencies
   *  @return {Object} maximum bid and minimum ask for all currencies
   *  @example
   *  client.getAllBidsAndAsks().then(console.log).catch(console.error);
   */
  getAllBidsAndAsks() {
    return this.handler.request('exchange/maxbid_minask', {}, 'GET', false);
  }

  /**
   *  Get minimum amount to open order for all currencies
   *  @return {Object} minimum amount to open order for all currencies
   *  @example
   *  client.getRestrictions().then(console.log).catch(console.error);
   */
  getRestrictions() {
    return this.handler.request('exchange/restrictions', {}, 'GET', false);
  }

  /**
   *  Get minimum amount to open order for all currencies
   *  @return {Object} minimum amount to open order for all currencies
   *  @example
   *  client.getCurrencies().then(console.log).catch(console.error);
   */
  getCurrencies() {
    return this.handler.request('info/coinInfo', {}, 'GET', false);
  }

  /**
   *  Get information on user's recent trades, requires API key and secret
   *  @param {Object=} options - options for the query
   *  @param {string=} options.currencyPair - exchange in the format BTC/USD
   *  @param {boolean=} options.orderDesc - if true, new orders will be shown first
   *  @param {number=} options.limit - number of items per page
   *  @param {number=} options.offset - page offset
   *  @return {Object} information on user's trades
   *  @example
   *  client.getUserTrades({orderDesc: true, limit: 4}).then(console.log);
   */
  getUserTrades(options) {
    return this.handler.request('exchange/trades', options, 'GET');
  }

  /**
   *  Get information on user's orders, requires API key and secret
   *  @param {Object=} options - options for the query
   *  @param {string=} options.currencyPair - exchange in the format BTC/USD
   *  @param {string=} options.openClosed - type of order, e.g 'ALL' or 'OPEN'
   *  @param {number=} options.issuedFrom - start date in UNIX format
   *  @param {number=} options.issuedTo - end date in UNIX format
   *  @param {number=} options.startRow - sequence number of first record
   *  @param {number=} options.endRow - sequence number of last record
   *  @return {Object} information on user's orders
   *  @example
   *  client.getClientOrders({openClosed: 'CANCELLED', startRow: 2}).then(console.log);
   */
  getClientOrders(options) {
    return this.handler.request('exchange/client_orders', options, 'GET');
  }

  /**
   *  Get order information, requires API key and secret
   *  @param {number} orderId - ID of the order, e.g. 88504958
   *  @return {Object} order information
   *  @example
   *  client.getUserOrder(88504958).then(console.log).catch(console.error);
   */
  getUserOrder(orderId) {
    let options = { orderId: orderId };
    return this.handler.request('exchange/order', options, 'GET');
  }

  /**
   *  Get information on balances, requires API key and secret
   *  @param {string=} currency - will return all balances if not given, e.g. USD
   *  @return {Object[]} information on balances
   *  @example
   *  client.getBalances().then(console.log).catch(console.error);
   */
  getBalances(currency = '') {
    let options = {};
    if (currency !== '')
      options.currency = currency.toUpperCase();
    return this.handler.request('payment/balances', options, 'GET');
  }

  /**
   *  Get information on balance for a currency, requires API key and secret
   *  @param {string} currency - currency to get balance for, e.g. BTC
   *  @return {Object} information on balances
   *  @example
   *  client.getBalance('BTC').then(console.log).catch(console.error);
   */
  getBalance(currency) {
    let options = { currency: currency.toUpperCase() };
    return this.handler.request('payment/balance', options, 'GET');
  }

  /**
   *  Get list of transactions, requires API key and secret
   *  @param {string} start - start date in UNIX format
   *  @param {string} end - end date in UNIX format
   *  @param {Object=} options - options for the query
   *  @param {string=} options.types - type of order, e.g 'BUY' or 'DEPOSIT'
   *  @param {number=} options.limit - max number of results
   *  @param {number=} options.offset - first index
   *  @return {Object[]} list of transactions in the date range
   *  @example
   *  client.getTransactions('1409920436000', '1409920636000', 
   *  {types: 'BUY', limit: 2}).then(console.log).catch(console.error);
   */
  getTransactions(start, end, options) {
    options.start = start;
    options.end = end;
    return this.handler.request('payment/history/transactions', options, 'GET');
  }

  /**
   *  Get number of transactions, requires API key and secret
   *  @param {string} start - start date in UNIX format
   *  @param {string} end - end date in UNIX format
   *  @param {string=} options.types - type of order, e.g 'BUY' or 'DEPOSIT'
   *  @return {number} number of transactions in the date range
   *  @example
   *  client.getNumTransactions('1409920436000', '1409920636000', 'BUY').then(console.log);
   */
  getNumTransactions(start, end, types) {
    let options = { start: start, end: end };
    if (types) {
      options.types = types;
    }
    return this.handler.request('payment/history/size', options, 'GET');
  }

  /**
   *  Get customer's trading fee
   *  @return {Object} trading fee
   *  @example
   *  client.getTradingFee().then(console.log).catch(console.error);
   */
  getTradingFee() {
    return this.handler.request('exchange/commission', {}, 'GET');
  }

  /**
   *  Get customer's trading fee and volume
   *  @return {Object} trading fee and volume
   *  @example
   *  client.getTradingFeeAndVolume().then(console.log).catch(console.error);
   */
  getTradingFeeAndVolume() {
    return this.handler.request('exchange/commissionCommonInfo', {}, 'GET');
  }

  /**
   *  Make a buy limit order
   *  @param {string} ticker - currency ticker
   *  @param {string} pair - currency being traded with
   *  @param {number} price - price of currency
   *  @param {number} quantity - amount of currency to buy
   *  @return {Object} order ID
   *  @example
   *  client.buyLimit('btc', 'usd', 10000, 0.1).then(console.log);
   */
  buyLimit(ticker, pair, price, quantity) {
    return this.ordersClient.buyLimit(ticker, pair, price, quantity);
  }

  /**
   *  Make a sell limit order
   *  @param {string} ticker - currency ticker
   *  @param {string} pair - currency being traded with
   *  @param {number} price - price of currency
   *  @param {number} quantity - amount of currency to sell
   *  @return {Object} order ID
   *  @example
   *  client.sellLimit('btc', 'usd', 10000, 0.1).then(console.log);
   */
  sellLimit(ticker, pair, price, quantity) {
    return this.ordersClient.sellLimit(ticker, pair, price, quantity);
  }

  /**
   *  Make a buy market order
   *  @param {string} ticker - currency ticker
   *  @param {string} pair - currency being traded with
   *  @param {number} quantity - amount of currency to buy
   *  @return {Object} order ID
   *  @example
   *  client.buyMarket('btc', 'usd', 0.1).then(console.log);
   */
  buyMarket(ticker, pair, quantity) {
    return this.ordersClient.buyMarket(ticker, pair, quantity);
  }

  /**
   *  Make a sell market order
   *  @param {string} ticker - currency ticker
   *  @param {string} pair - currency being traded with
   *  @param {number} quantity - amount of currency to sell
   *  @return {Object} order ID
   *  @example
   *  client.sellMarket('btc', 'usd', 0.1).then(console.log);
   */
  sellMarket(ticker, pair, quantity) {
    return this.ordersClient.sellMarket(ticker, pair, quantity);
  }

  /**
   *  Cancel order
   *  @param {string} ticker - currency ticker
   *  @param {string} pair - currency being traded with
   *  @param {number} orderId - ID of order to cancel
   *  @return {Object} order ID
   *  @example
   *  client.cancelLimit('btc', 'usd', 1111).then(console.log);
   */
  cancelLimit(ticker, pair, orderId) {
    return this.ordersClient.cancelLimit(ticker, pair, orderId);
  }

  /**
   *  Get wallet address for a currency
   *  @param {string} ticker - currency ticker
   *  @return {Object} wallet address
   *  @example
   *  client.getAddress('btc').then(console.log);
   */
  getAddress(ticker) {
    return this.transfersClient.getAddress(ticker);
  }

  /**
   *  Withdraw to wallet address
   *  @param {number} amount - amount to withdraw
   *  @param {string} ticker - currency ticker
   *  @param {string} wallet - wallet address
   *  @return {Object} information on withdrawal
   *  @example
   *  client.withdraw(1, 'usd', '1MfTTxGnBBgvyk9477hWurosfqj8MZKkAG')
   *  .then(console.log);
   */
  withdraw(amount, ticker, wallet) {
    return this.transfersClient.withdraw(amount, ticker, wallet);
  }

  /**
   *  Withdraw to Payeer account
   *  @param {number} amount - amount to withdraw
   *  @param {string} ticker - currency ticker
   *  @param {string} wallet - wallet address
   *  @param {Object=} options - options object
   *  @param {string=} options.protect - protection of payment
   *  @param {string=} options.protect_code - protect code
   *  @param {number=} options.protect_period - protect period in days
   *  @return {Object} information on withdrawal
   *  @example
   *  client.toPayeer(1, 'usd', '1MfTTxGnBBgvyk9477hWurosfqj8MZKkAG')
   *  .then(console.log);
   */
  toPayeer(amount, ticker, wallet, options) {
    return this.transfersClient.toPayeer(amount, ticker, wallet, options);
  }

  /**
   *  Withdraw to Capitalist account
   *  @param {number} amount - amount to withdraw
   *  @param {string} currency - can be USD, EUR, or RUR only
   *  @param {string} wallet - wallet address
   *  @return {Object} information on withdrawal
   *  @example
   *  client.toCapitalist(1, 'USD', 'U0000001')
   *  .then(console.log);
   */
  toCapitalist(amount, currency, wallet) {
    return this.transfersClient.toCapitalist(amount, currency, wallet);
  }

  /**
   *  Withdraw to Advcash account
   *  @param {number} amount - amount to withdraw
   *  @param {string} currency - can be USD, EUR, or RUR only
   *  @param {string} wallet - wallet address
   *  @return {Object} information on withdrawal
   *  @example
   *  client.toAdvcash(1, 'USD', 'U123456789012')
   *  .then(console.log);
   */
  toAdvcash(amount, currency, wallet) {
    return this.transfersClient.toAdvcash(amount, currency, wallet);
  }

  /**
   *  Withdraw to bank card
   *  @param {number} amount - amount to withdraw
   *  @param {string} currency - can be USD, EUR, or RUR only
   *  @param {string} account - bank account number
   *  @return {Object} information on withdrawal
   *  @example
   *  client.toBankCard(1, 'USD', '5567025017512543', '09', '18')
   *  .then(console.log);
   */
  toBankCard(amount, currency, account) {
    return this.transfersClient.toBankCard(amount, currency, account);
  }

  /**
   *  Withdraw to Okpay card
   *  @param {number} amount - amount to withdraw
   *  @param {string} currency - can be USD, EUR, or RUR only
   *  @param {string} wallet - account wallet
   *  @param {number=} invoice - optional invoice number
   *  @return {Object} information on withdrawal
   *  @example
   *  client.toOkpay(1, 'USD', 'OK123456789')
   *  .then(console.log);
   */
  toOkpay(amount, currency, wallet, invoice = '') {
    return this.transfersClient.toOkpay(amount, currency, wallet, invoice);
  }

  /**
   *  Withdraw to PerfectMoney account
   *  @param {number} amount - amount to withdraw
   *  @param {string} ticker - currency ticker
   *  @param {string} wallet - wallet address
   *  @param {Object=} options - options object
   *  @param {string=} options.protect_code - protect code
   *  @param {number=} options.protect_period - protect period in days
   *  @return {Object} information on withdrawal
   *  @example
   *  client.toPerfectMoney(1, 'usd', '1MfTTxGnBBgvyk9477hWurosfqj8MZKkAG')
   *  .then(console.log);
   */
  toPerfectMoney(amount, ticker, wallet, options) {
    return this.transfersClient.toPerfectMoney(amount, ticker, wallet, options);
  }

  /**
   *  Creates a voucher
   *  @param {number} amount - amount to withdraw
   *  @param {string} ticker - currency ticker
   *  @param {string=} description - purpose of payment
   *  @return {string} voucher code
   *  @example
   *  client.makeVoucher(1, 'usd', 'need a voucher')
   *  .then(console.log);
   */
  makeVoucher(amount, ticker, description = '') {
    return this.vouchersClient.makeVoucher(amount, ticker, description);
  }

  /**
   *  Get voucher amount from voucher code
   *  @param {string} voucherCode - voucher code
   *  @return {string} voucher amount
   *  @example
   *  client.getVoucherAmount('LVC-USD-12345678-87654321-ABCDEFGI-ABCD1234')
   *  .then(console.log);
   */
  getVoucherAmount(voucherCode) {
    return this.vouchersClient.getVoucherAmount(voucherCode);
  }

  /**
   *  Redeem voucher from code
   *  @param {string} voucherCode - voucher code
   *  @return {Object} information on voucher redeeming
   *  @example
   *  client.redeemVoucher('LVC-USD-12345678-87654321-ABCDEFGI-ABCD1234')
   *  .then(console.log);
   */
  redeemVoucher(voucherCode) {
    return this.vouchersClient.redeemVoucher(voucherCode);
  }

}

module.exports = LiveCoin;