'use strict';

const fetch = require('node-fetch');
const qs = require('qs');
const CryptoJS = require("crypto-js");

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

    this.baseUrl = 'https://api.livecoin.net';
    this.excBase = this.baseUrl + '/exchange';
    this.payBase = this.baseUrl + '/payment';
    this.outBase = this.payBase + '/out';
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
    // Converts ticker to currency pair string needed for API call
    var currencyPair = (ticker + '/' + pair).toUpperCase();
    var base = this.excBase + '/ticker';
    return fetch(`${base}?currencyPair=${currencyPair}`).then(res => {
      return res.json();
    });
  }

  /**
   *  Get all tickers' information
   *  @return {Object} all tickers' information
   *  @example
   *  client.getAllTickers().then(console.log).catch(console.error);
   */
  getAllTickers() {
    return fetch(this.excBase + '/ticker').then(res => {
      return res.json();
    });
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
    var currencyPair = (ticker + '/' + pair).toUpperCase();
    var base = this.excBase + '/last_trades?currencyPair=' + currencyPair;
    return fetch(`${base}${options ? `&${qs.stringify(options)}` : ''}`).then(res => {
      return res.json();
    });
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
    var currencyPair = (ticker + '/' + pair).toUpperCase();
    var base = this.excBase + '/order_book?currencyPair=' + currencyPair;
    return fetch(`${base}${options ? `&${qs.stringify(options)}` : ''}`).then(res => {
      return res.json();
    });
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
    var base = this.excBase + '/all/order_book';
    return fetch(`${base}${options ? `?${qs.stringify(options)}` : ''}`).then(res => {
      return res.json();
    });
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
    var currencyPair = (ticker + '/' + pair).toUpperCase();
    var base = this.excBase + '/maxbid_minask';
    return fetch(`${base}?currencyPair=${currencyPair}`).then(res => {
      return res.json();
    });
  }

  /**
   *  Get maximum bid and minimum ask for all currencies
   *  @return {Object} maximum bid and minimum ask for all currencies
   *  @example
   *  client.getAllBidsAndAsks().then(console.log).catch(console.error);
   */
  getAllBidsAndAsks() {
    return fetch(this.excBase + '/maxbid_minask').then(res => {
      return res.json();
    });
  }

  /**
   *  Get minimum amount to open order for all currencies
   *  @return {Object} minimum amount to open order for all currencies
   *  @example
   *  client.getRestrictions().then(console.log).catch(console.error);
   */
  getRestrictions() {
    return fetch(this.excBase + '/restrictions').then(res => {
      return res.json();
    });
  }

  /**
   *  Get minimum amount to open order for all currencies
   *  @return {Object} minimum amount to open order for all currencies
   *  @example
   *  client.getCurrencies().then(console.log).catch(console.error);
   */
  getCurrencies() {
    return fetch(this.baseUrl + '/info/coinInfo').then(res => {
      return res.json();
    });
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
    var params = options ? this._getParamString(options) : '';
    var sign = CryptoJS.HmacSHA256(params, this.apiSecret)
                .toString(CryptoJS.enc.Hex).toUpperCase();
    return fetch(this.excBase + '/trades?' + params, {
      method: 'GET',
      headers: {'API-key': this.apiKey, 'Sign': sign}
    }).then(res => {
      return res.json();
    });
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
    var params = options ? this._getParamString(options) : '';
    var sign = CryptoJS.HmacSHA256(params, this.apiSecret)
                .toString(CryptoJS.enc.Hex).toUpperCase();
    return fetch(this.excBase + '/client_orders?' + params, {
      method: 'GET',
      headers: {'API-key': this.apiKey, 'Sign': sign}
    }).then(res => {
      return res.json();
    });
  }

  /**
   *  Get order information, requires API key and secret
   *  @param {number} orderId - ID of the order, e.g. 88504958
   *  @return {Object} order information
   *  @example
   *  client.getUserOrder(88504958).then(console.log).catch(console.error);
   */
  getUserOrder(orderId) {
    var sign = CryptoJS.HmacSHA256('orderId=' + orderId, this.apiSecret)
                .toString(CryptoJS.enc.Hex).toUpperCase();
    return fetch(this.excBase + '/order?orderId=' + orderId, {
      method: 'GET',
      headers: {'API-key': this.apiKey, 'Sign': sign}
    }).then(res => {
      return res.json();
    });
  }

  /**
   *  Get information on balances, requires API key and secret
   *  @param {string=} currency - will return all balances if not given, e.g. USD
   *  @return {Object[]} information on balances
   *  @example
   *  client.getBalances().then(console.log).catch(console.error);
   */
  getBalances(currency = '') {
    var curr = currency.length > 0 ? 'currency=' + currency.toUpperCase() : '';
    var sign = CryptoJS.HmacSHA256(curr, this.apiSecret)
                .toString(CryptoJS.enc.Hex).toUpperCase();
    return fetch(this.payBase + '/balances?currency=' + currency, {
      method: 'GET',
      headers: {'API-key': this.apiKey, 'Sign': sign}
    }).then(res => {
      return res.json();
    });
  }

  /**
   *  Get information on balance for a currency, requires API key and secret
   *  @param {string} currency - currency to get balance for, e.g. BTC
   *  @return {Object} information on balances
   *  @example
   *  client.getBalance('BTC').then(console.log).catch(console.error);
   */
  getBalance(currency) {
    currency = currency.toUpperCase();
    var sign = CryptoJS.HmacSHA256(`currency=${currency}`, this.apiSecret)
                .toString(CryptoJS.enc.Hex).toUpperCase();
    return fetch(this.payBase + '/balance?currency=' + currency, {
      method: 'GET',
      headers: {'API-key': this.apiKey, 'Sign': sign}
    }).then(res => {
      return res.json();
    });
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
    var params = options ? this._getParamString(options) : '';
    var sign = CryptoJS.HmacSHA256(params, this.apiSecret)
                .toString(CryptoJS.enc.Hex).toUpperCase();
    return fetch(this.payBase + '/history/transactions?' + params, {
      method: 'GET',
      headers: {'API-key': this.apiKey, 'Sign': sign}
    }).then(res => {
      return res.json();
    });
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
    var options = {start: start, end: end};
    if (types) {
      options.types = types;
    }
    var params = options ? this._getParamString(options) : '';
    var sign = CryptoJS.HmacSHA256(params, this.apiSecret)
                .toString(CryptoJS.enc.Hex).toUpperCase();
    return fetch(this.payBase + '/history/size?' + params, {
      method: 'GET',
      headers: {'API-key': this.apiKey, 'Sign': sign}
    }).then(res => {
      return res.json();
    });
  }

  /**
   *  Get customer's trading fee
   *  @return {Object} trading fee
   *  @example
   *  client.getTradingFee().then(console.log).catch(console.error);
   */
  getTradingFee() {
    var sign = CryptoJS.HmacSHA256('', this.apiSecret)
                .toString(CryptoJS.enc.Hex).toUpperCase();
    return fetch(this.excBase + '/commission', {
      method: 'GET',
      headers: {'API-key': this.apiKey, 'Sign': sign}
    }).then(res => {
      return res.json();
    });
  }

  /**
   *  Get customer's trading fee and volume
   *  @return {Object} trading fee and volume
   *  @example
   *  client.getTradingFeeAndVolume().then(console.log).catch(console.error);
   */
  getTradingFeeAndVolume() {
    var sign = CryptoJS.HmacSHA256('', this.apiSecret)
                .toString(CryptoJS.enc.Hex).toUpperCase();
    return fetch(this.excBase + '/commissionCommonInfo', {
      method: 'GET',
      headers: {'API-key': this.apiKey, 'Sign': sign}
    }).then(res => {
      return res.json();
    });
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
    var currencyPair = (ticker + '/' + pair).toUpperCase();
    var params = `currencyPair=${currencyPair}&price=${price}` 
      + `&quantity=${quantity}`;
    var sign = CryptoJS.HmacSHA256(params, this.apiSecret)
                .toString(CryptoJS.enc.Hex).toUpperCase();
    return fetch(this.excBase + '/buylimit?' + params, {
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
    var currencyPair = (ticker + '/' + pair).toUpperCase();
    var params = `currencyPair=${currencyPair}&price=${price}` 
      + `&quantity=${quantity}`;
    var sign = CryptoJS.HmacSHA256(params, this.apiSecret)
                .toString(CryptoJS.enc.Hex).toUpperCase();
    return fetch(this.excBase + '/selllimit?' + params, {
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
   *  Make a buy market order
   *  @param {string} ticker - currency ticker
   *  @param {string} pair - currency being traded with
   *  @param {number} quantity - amount of currency to buy
   *  @return {Object} order ID
   *  @example
   *  client.buyMarket('btc', 'usd', 0.1).then(console.log);
   */
  buyMarket(ticker, pair, quantity) {
    var currencyPair = (ticker + '/' + pair).toUpperCase();
    var params = `currencyPair=${currencyPair}&quantity=${quantity}`;
    var sign = CryptoJS.HmacSHA256(params, this.apiSecret)
                .toString(CryptoJS.enc.Hex).toUpperCase();
    return fetch(this.excBase + '/buymarket?' + params, {
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
   *  Make a sell market order
   *  @param {string} ticker - currency ticker
   *  @param {string} pair - currency being traded with
   *  @param {number} quantity - amount of currency to sell
   *  @return {Object} order ID
   *  @example
   *  client.sellMarket('btc', 'usd', 0.1).then(console.log);
   */
  sellMarket(ticker, pair, quantity) {
    var currencyPair = (ticker + '/' + pair).toUpperCase();
    var params = `currencyPair=${currencyPair}&quantity=${quantity}`;
    var sign = CryptoJS.HmacSHA256(params, this.apiSecret)
                .toString(CryptoJS.enc.Hex).toUpperCase();
    return fetch(this.excBase + '/sellmarket?' + params, {
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
   *  Cancel order
   *  @param {string} ticker - currency ticker
   *  @param {string} pair - currency being traded with
   *  @param {number} orderId - ID of order to cancel
   *  @return {Object} order ID
   *  @example
   *  client.cancelLimit('btc', 'usd', 1111).then(console.log);
   */
  cancelLimit(ticker, pair, orderId) {
    var currencyPair = (ticker + '/' + pair).toUpperCase();
    var params = `currencyPair=${currencyPair}&orderId=${orderId}`;
    var sign = CryptoJS.HmacSHA256(params, this.apiSecret)
                .toString(CryptoJS.enc.Hex).toUpperCase();
    return fetch(this.excBase + '/cancellimit?' + params, {
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
   *  @param {Object} options - options object
   *  @param {string} options.protect - protection of payment
   *  @param {string} options.protect_code - protect code
   *  @param {number} protect_period - protect period in days
   *  @return {Object} information on withdrawal
   *  @example
   *  client.payeer(1, 'usd', '1MfTTxGnBBgvyk9477hWurosfqj8MZKkAG')
   *  .then(console.log);
   */
  payeer(amount, ticker, wallet, options) {
    var params = `amount=${amount}&currency=${ticker.toUpperCase()}`;
    params += options ? `&${this._getParamString(options)}` : '';
    params += `&wallet=${wallet}`;
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
   *  Returns whether a comes before or after b alphabetically
   *  @param {string=} a - first string
   *  @param {string=} b - second string
   *  @return {number} whether a comes before or after b
   */
  _alphabeticalSort(a, b) {
    return a.localeCompare(b);
  }

  /**
   *  Return sorted parameter query strong for options object
   */
  _getParamString(options) {
    return qs.stringify(options, {sort: this._alphabeticalSort});
  }
}

module.exports = LiveCoin;