'use strict';

const fetch = require('node-fetch');
const qs = require('qs');

class PublicData {

  constructor() {
    this.baseUrl = 'https://api.livecoin.net';
    this.excBase = this.baseUrl + '/exchange';
  }

  getTicker(ticker, pair) {
    // Converts ticker to currency pair string needed for API call
    var currencyPair = (ticker + '/' + pair).toUpperCase();
    var base = this.excBase + '/ticker';
    return fetch(`${base}?currencyPair=${currencyPair}`).then(res => {
      return res.json();
    });
  }

  getAllTickers() {
    return fetch(this.excBase + '/ticker').then(res => {
      return res.json();
    });
  }

  getLastTrades(ticker, pair, options) {
    var currencyPair = (ticker + '/' + pair).toUpperCase();
    var base = this.excBase + '/last_trades?currencyPair=' + currencyPair;
    return fetch(`${base}${options ? `&${qs.stringify(options)}` : ''}`).then(res => {
      return res.json();
    });
  }

  getOrders(ticker, pair, options) {
    var currencyPair = (ticker + '/' + pair).toUpperCase();
    var base = this.excBase + '/order_book?currencyPair=' + currencyPair;
    return fetch(`${base}${options ? `&${qs.stringify(options)}` : ''}`).then(res => {
      return res.json();
    });
  }

  getAllOrders(options) {
    var base = this.excBase + '/all/order_book';
    return fetch(`${base}${options ? `?${qs.stringify(options)}` : ''}`).then(res => {
      return res.json();
    });
  }

  getBidAndAsk(ticker, pair) {
    var currencyPair = (ticker + '/' + pair).toUpperCase();
    var base = this.excBase + '/maxbid_minask';
    return fetch(`${base}?currencyPair=${currencyPair}`).then(res => {
      return res.json();
    });
  }

  getAllBidsAndAsks() {
    return fetch(this.excBase + '/maxbid_minask').then(res => {
      return res.json();
    });
  }

  getRestrictions() {
    return fetch(this.excBase + '/restrictions').then(res => {
      return res.json();
    });
  }

  getCurrencies() {
    return fetch(this.baseUrl + '/info/coinInfo').then(res => {
      return res.json();
    });
  }

}

module.exports = PublicData;