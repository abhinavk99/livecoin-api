'use strict';

const fetch = require('node-fetch');
const qs = require('qs');
const CryptoJS = require('crypto-js');
const getParamString = require('./paramHelper');

class PrivateData {

  constructor() {
    this.apiKey = '';
    this.apiSecret = '';

    this.baseUrl = 'https://api.livecoin.net';
    this.excBase = this.baseUrl + '/exchange';
    this.payBase = this.baseUrl + '/payment';
  }

  login(apiKey, apiSecret) {
    this.apiKey = apiKey;
    this.apiSecret = apiSecret;
  }

  getUserTrades(options) {
    var params = options ? getParamString(options) : '';
    var sign = CryptoJS.HmacSHA256(params, this.apiSecret)
      .toString(CryptoJS.enc.Hex).toUpperCase();
    return fetch(this.excBase + '/trades?' + params, {
      method: 'GET',
      headers: { 'API-key': this.apiKey, 'Sign': sign }
    }).then(res => {
      return res.json();
    });
  }

  getClientOrders(options) {
    var params = options ? getParamString(options) : '';
    var sign = CryptoJS.HmacSHA256(params, this.apiSecret)
      .toString(CryptoJS.enc.Hex).toUpperCase();
    return fetch(this.excBase + '/client_orders?' + params, {
      method: 'GET',
      headers: { 'API-key': this.apiKey, 'Sign': sign }
    }).then(res => {
      return res.json();
    });
  }

  getUserOrder(orderId) {
    var sign = CryptoJS.HmacSHA256('orderId=' + orderId, this.apiSecret)
      .toString(CryptoJS.enc.Hex).toUpperCase();
    return fetch(this.excBase + '/order?orderId=' + orderId, {
      method: 'GET',
      headers: { 'API-key': this.apiKey, 'Sign': sign }
    }).then(res => {
      return res.json();
    });
  }

  getBalances(currency = '') {
    var curr = currency.length > 0 ? 'currency=' + currency.toUpperCase() : '';
    var sign = CryptoJS.HmacSHA256(curr, this.apiSecret)
      .toString(CryptoJS.enc.Hex).toUpperCase();
    return fetch(this.payBase + '/balances?currency=' + currency, {
      method: 'GET',
      headers: { 'API-key': this.apiKey, 'Sign': sign }
    }).then(res => {
      return res.json();
    });
  }

  getBalance(currency) {
    currency = currency.toUpperCase();
    var sign = CryptoJS.HmacSHA256(`currency=${currency}`, this.apiSecret)
      .toString(CryptoJS.enc.Hex).toUpperCase();
    return fetch(this.payBase + '/balance?currency=' + currency, {
      method: 'GET',
      headers: { 'API-key': this.apiKey, 'Sign': sign }
    }).then(res => {
      return res.json();
    });
  }

  getTransactions(start, end, options) {
    options.start = start;
    options.end = end;
    var params = options ? getParamString(options) : '';
    var sign = CryptoJS.HmacSHA256(params, this.apiSecret)
      .toString(CryptoJS.enc.Hex).toUpperCase();
    return fetch(this.payBase + '/history/transactions?' + params, {
      method: 'GET',
      headers: { 'API-key': this.apiKey, 'Sign': sign }
    }).then(res => {
      return res.json();
    });
  }

  getNumTransactions(start, end, types) {
    var options = { start: start, end: end };
    if (types) {
      options.types = types;
    }
    var params = options ? getParamString(options) : '';
    var sign = CryptoJS.HmacSHA256(params, this.apiSecret)
      .toString(CryptoJS.enc.Hex).toUpperCase();
    return fetch(this.payBase + '/history/size?' + params, {
      method: 'GET',
      headers: { 'API-key': this.apiKey, 'Sign': sign }
    }).then(res => {
      return res.json();
    });
  }

  getTradingFee() {
    var sign = CryptoJS.HmacSHA256('', this.apiSecret)
      .toString(CryptoJS.enc.Hex).toUpperCase();
    return fetch(this.excBase + '/commission', {
      method: 'GET',
      headers: { 'API-key': this.apiKey, 'Sign': sign }
    }).then(res => {
      return res.json();
    });
  }

  getTradingFeeAndVolume() {
    var sign = CryptoJS.HmacSHA256('', this.apiSecret)
      .toString(CryptoJS.enc.Hex).toUpperCase();
    return fetch(this.excBase + '/commissionCommonInfo', {
      method: 'GET',
      headers: { 'API-key': this.apiKey, 'Sign': sign }
    }).then(res => {
      return res.json();
    });
  }

}

module.exports = PrivateData;