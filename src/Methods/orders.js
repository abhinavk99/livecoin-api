'use strict';

const fetch = require('node-fetch');
const CryptoJS = require('crypto-js');

class Orders {

  constructor() {
    this.apiKey = '';
    this.apiSecret = '';

    this.baseUrl = 'https://api.livecoin.net';
    this.excBase = this.baseUrl + '/exchange';
  }

  login(apiKey, apiSecret) {
    this.apiKey = apiKey;
    this.apiSecret = apiSecret;
  }

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

}

module.exports = Orders;