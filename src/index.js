'use strict';

const fetch = require('node-fetch');
const qs = require('qs');
const CryptoJS = require('crypto-js');

// Importing the sub-modules
const PublicData = require('./publicData');
const publicClient = new PublicData();
const PrivateData = require('./privateData');
const privateClient = new PrivateData();
const Orders = require('./orders');
const ordersClient = new Orders();

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
    this.apiKey = apiKey;
    this.apiSecret = apiSecret;
    privateClient.login(apiKey, apiSecret);
    ordersClient.login(apiKey, apiSecret);

    this.baseUrl = 'https://api.livecoin.net';
    this.excBase = this.baseUrl + '/exchange';
    this.payBase = this.baseUrl + '/payment';
    this.outBase = this.payBase + '/out';
    this.vouBase = this.payBase + '/voucher';
  }

  /**
   *  Set client's API key and secret after constructing the object
   *  @param {string} apiKey - API key generated from LiveCoin
   *  @param {string} apiSecret - API secret generated from LiveCoin
   *  @example
   *  client.login('key here', 'secret here');
   */
  login(apiKey, apiSecret) {
    this.apiKey = apiKey;
    this.apiSecret = apiSecret;
    privateClient.login(apiKey, apiSecret);
    ordersClient.login(apiKey, apiSecret);
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
    return publicClient.getTicker(ticker, pair);
  }

  /**
   *  Get all tickers' information
   *  @return {Object} all tickers' information
   *  @example
   *  client.getAllTickers().then(console.log).catch(console.error);
   */
  getAllTickers() {
    return publicClient.getAllTickers();
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
    return publicClient.getLastTrades(ticker, pair, options);
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
    return publicClient.getOrders(ticker, pair, options);
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
    return publicClient.getAllOrders(options);
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
    return publicClient.getBidAndAsk(ticker, pair);
  }

  /**
   *  Get maximum bid and minimum ask for all currencies
   *  @return {Object} maximum bid and minimum ask for all currencies
   *  @example
   *  client.getAllBidsAndAsks().then(console.log).catch(console.error);
   */
  getAllBidsAndAsks() {
    return publicClient.getAllBidsAndAsks();
  }

  /**
   *  Get minimum amount to open order for all currencies
   *  @return {Object} minimum amount to open order for all currencies
   *  @example
   *  client.getRestrictions().then(console.log).catch(console.error);
   */
  getRestrictions() {
    return publicClient.getRestrictions();
  }

  /**
   *  Get minimum amount to open order for all currencies
   *  @return {Object} minimum amount to open order for all currencies
   *  @example
   *  client.getCurrencies().then(console.log).catch(console.error);
   */
  getCurrencies() {
    return publicClient.getCurrencies();
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
    return privateClient.getUserTrades();
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
    return privateClient.getClientOrders(options);
  }

  /**
   *  Get order information, requires API key and secret
   *  @param {number} orderId - ID of the order, e.g. 88504958
   *  @return {Object} order information
   *  @example
   *  client.getUserOrder(88504958).then(console.log).catch(console.error);
   */
  getUserOrder(orderId) {
    return privateClient.getUserOrder(orderId);
  }

  /**
   *  Get information on balances, requires API key and secret
   *  @param {string=} currency - will return all balances if not given, e.g. USD
   *  @return {Object[]} information on balances
   *  @example
   *  client.getBalances().then(console.log).catch(console.error);
   */
  getBalances(currency = '') {
    return privateClient.getBalances(currency);
  }

  /**
   *  Get information on balance for a currency, requires API key and secret
   *  @param {string} currency - currency to get balance for, e.g. BTC
   *  @return {Object} information on balances
   *  @example
   *  client.getBalance('BTC').then(console.log).catch(console.error);
   */
  getBalance(currency) {
    return privateClient.getBalance(currency);
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
    return privateClient.getTransactions(start, end, options);
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
    return privateClient.getNumTransactions(start, end, types);
  }

  /**
   *  Get customer's trading fee
   *  @return {Object} trading fee
   *  @example
   *  client.getTradingFee().then(console.log).catch(console.error);
   */
  getTradingFee() {
    return privateClient.getTradingFee();
  }

  /**
   *  Get customer's trading fee and volume
   *  @return {Object} trading fee and volume
   *  @example
   *  client.getTradingFeeAndVolume().then(console.log).catch(console.error);
   */
  getTradingFeeAndVolume() {
    return privateClient.getTradingFeeAndVolume();
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
    return ordersClient.buyLimit(ticker, pair, price, quantity);
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
    return ordersClient.sellLimit(ticker, pair, price, quantity);
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
    return ordersClient.buyMarket(ticker, pair, quantity);
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
    return ordersClient.sellMarket(ticker, pair, quantity);
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
    return ordersClient.cancelLimit(ticker, pair, orderId);
  }

  /**
   *  Get wallet address for a currency
   *  @param {string} ticker - currency ticker
   *  @return {Object} wallet address
   *  @example
   *  client.getAddress('btc').then(console.log);
   */
  getAddress(ticker) {
    var params = `currency=${ticker.toUpperCase()}`;
    var sign = CryptoJS.HmacSHA256(params, this.apiSecret)
                .toString(CryptoJS.enc.Hex).toUpperCase();
    return fetch(this.payBase + '/get/address?' + params, {
      method: 'GET',
      headers: {
        'API-key': this.apiKey,
        'Sign': sign,
        'Content-type': 'application/x-www-form-urlencoded'
      },
      body: params
    }).then(res => {
      return res.json();
    });
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
    var params = `amount=${amount}&currency=${ticker.toUpperCase()}`
      + `wallet=${wallet}`;
    var sign = CryptoJS.HmacSHA256(params, this.apiSecret)
                .toString(CryptoJS.enc.Hex).toUpperCase();
    return fetch(this.outBase + '/coin?' + params, {
      method: 'POST',
      headers: {
        'API-key': this.apiKey,
        'Sign': sign,
        'Content-type': 'application/x-www-form-urlencoded'
      },
      body: params
    }).then(res => {
      return res.json();
    });
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
    var params = `amount=${amount}&currency=${ticker.toUpperCase()}`;
    params += options ? `&${this._getParamString(options)}` : '';
    params += `&wallet=${wallet}`;
    var sign = CryptoJS.HmacSHA256(params, this.apiSecret)
                .toString(CryptoJS.enc.Hex).toUpperCase();
    return fetch(this.outBase + '/payeer?' + params, {
      method: 'POST',
      headers: {
        'API-key': this.apiKey,
        'Sign': sign,
        'Content-type': 'application/x-www-form-urlencoded'
      },
      body: params
    }).then(res => {
      return res.json();
    });
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
    var params = `amount=${amount}&currency=${currency.toUpperCase()}`;
    params += `&wallet=${wallet}`;
    var sign = CryptoJS.HmacSHA256(params, this.apiSecret)
                .toString(CryptoJS.enc.Hex).toUpperCase();
    return fetch(this.outBase + '/capitalist?' + params, {
      method: 'POST',
      headers: {
        'API-key': this.apiKey,
        'Sign': sign,
        'Content-type': 'application/x-www-form-urlencoded'
      },
      body: params
    }).then(res => {
      return res.json();
    });
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
    var params = `amount=${amount}&currency=${currency.toUpperCase()}`;
    params += `&wallet=${wallet}`;
    var sign = CryptoJS.HmacSHA256(params, this.apiSecret)
                .toString(CryptoJS.enc.Hex).toUpperCase();
    return fetch(this.outBase + '/advcah?' + params, {
      method: 'POST',
      headers: {
        'API-key': this.apiKey,
        'Sign': sign,
        'Content-type': 'application/x-www-form-urlencoded'
      },
      body: params
    }).then(res => {
      return res.json();
    });
  }

  /**
   *  Withdraw to bank card
   *  @param {number} amount - amount to withdraw
   *  @param {string} currency - can be USD, EUR, or RUR only
   *  @param {number} cardNumber - bank card number
   *  @param {string} expiryMonth - '01' to '12'
   *  @param {string} expiryYear - last 2 digits, e.g. '18'
   *  @return {Object} information on withdrawal
   *  @example
   *  client.toBankCard(1, 'USD', '5567025017512543', '09', '18')
   *  .then(console.log);
   */
  toBankCard(amount, currency, cardNumber, expiryMonth, expiryYear) {
    var params = `amount=${amount}&currency=${currency.toUpperCase()}`;
    params += `&card_number=${cardNumber}&expiry_month=${expiryMonth}`;
    params += `&expiry_year=${expiryYear}`;
    var sign = CryptoJS.HmacSHA256(params, this.apiSecret)
                .toString(CryptoJS.enc.Hex).toUpperCase();
    return fetch(this.outBase + '/card?' + params, {
      method: 'POST',
      headers: {
        'API-key': this.apiKey,
        'Sign': sign,
        'Content-type': 'application/x-www-form-urlencoded'
      },
      body: params
    }).then(res => {
      return res.json();
    });
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
    var params = `amount=${amount}&currency=${currency.toUpperCase()}`;
    params += invoice == '' ? '' : `&invoice=${invoice}`;
    params += `&wallet=${wallet}`;
    var sign = CryptoJS.HmacSHA256(params, this.apiSecret)
                .toString(CryptoJS.enc.Hex).toUpperCase();
    return fetch(this.outBase + '/okpay?' + params, {
      method: 'POST',
      headers: {
        'API-key': this.apiKey,
        'Sign': sign,
        'Content-type': 'application/x-www-form-urlencoded'
      },
      body: params
    }).then(res => {
      return res.json();
    });
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
    var params = `amount=${amount}&currency=${ticker.toUpperCase()}`;
    params += options ? `&${this._getParamString(options)}` : '';
    params += `&wallet=${wallet}`;
    var sign = CryptoJS.HmacSHA256(params, this.apiSecret)
                .toString(CryptoJS.enc.Hex).toUpperCase();
    return fetch(this.outBase + '/perfectmoney?' + params, {
      method: 'POST',
      headers: {
        'API-key': this.apiKey,
        'Sign': sign,
        'Content-type': 'application/x-www-form-urlencoded'
      },
      body: params
    }).then(res => {
      return res.json();
    });
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
    var params = `amount=${amount}&currency=${ticker.toUpperCase()}`;
    params += `&description=${description}`;
    var sign = CryptoJS.HmacSHA256(params, this.apiSecret)
                .toString(CryptoJS.enc.Hex).toUpperCase();
    return fetch(this.vouBase + '/make?' + params, {
      method: 'POST',
      headers: {
        'API-key': this.apiKey,
        'Sign': sign,
        'Content-type': 'application/x-www-form-urlencoded'
      },
      body: params
    }).then(res => {
      return res.json();
    });
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
    var params = `voucher_code=${voucherCode}`;
    var sign = CryptoJS.HmacSHA256(params, this.apiSecret)
                .toString(CryptoJS.enc.Hex).toUpperCase();
    return fetch(this.vouBase + '/amount?' + params, {
      method: 'POST',
      headers: {
        'API-key': this.apiKey,
        'Sign': sign,
        'Content-type': 'application/x-www-form-urlencoded'
      },
      body: params
    }).then(res => {
      return res.json();
    });
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
    var params = `voucher_code=${voucherCode}`;
    var sign = CryptoJS.HmacSHA256(params, this.apiSecret)
                .toString(CryptoJS.enc.Hex).toUpperCase();
    return fetch(this.vouBase + '/redeem?' + params, {
      method: 'POST',
      headers: {
        'API-key': this.apiKey,
        'Sign': sign,
        'Content-type': 'application/x-www-form-urlencoded'
      },
      body: params
    }).then(res => {
      return res.json();
    });
  }

}

module.exports = LiveCoin;