'use strict';

const fetch = require('node-fetch');
const qs = require('qs');

/** Class representing LiveCoin client */
class LiveCoin {

  /**
   *  Creates an instance of LiveCoin
   *  @example
   *  const client = new LiveCoin();
   */
  constructor() {
    this.baseUrl = 'https://api.livecoin.net';
    this.excBase = this.baseUrl + '/exchange';
  }

  /**
   *  Get ticker information
   *  @param {string} ticker - currency ticker
   *  @param {string} pair - currency being traded with
   *  @return {Object} ticker information
   *  @example
   *  client.getTicker('btc', 'usd').then(console.log).catch(console.error);
   *  client.getTicker('eth', 'btc').then(console.log).catch(console.error);
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
   *  const client = new LiveCoin();
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
   *  client.getRestrictions().then(console.log).catch(console.error);
   */
  getCurrencies() {
    return fetch(this.baseUrl + '/info/coinInfo').then(res => {
      return res.json();
    });
  }
}

module.exports = LiveCoin;