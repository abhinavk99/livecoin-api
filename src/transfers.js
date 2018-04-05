'use strict';

const fetch = require('node-fetch');
const qs = require('qs');
const CryptoJS = require('crypto-js');
const getParamString = require('./paramHelper');

class Transfers {

  constructor() {
    this.apiKey = '';
    this.apiSecret = '';

    this.baseUrl = 'https://api.livecoin.net';
    this.payBase = this.baseUrl + '/payment';
    this.outBase = this.payBase + '/out';
  }

  login(apiKey, apiSecret) {
    this.apiKey = apiKey;
    this.apiSecret = apiSecret;
  }

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

  toPayeer(amount, ticker, wallet, options) {
    var params = `amount=${amount}&currency=${ticker.toUpperCase()}`;
    params += options ? `&${getParamString(options)}` : '';
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

  toPerfectMoney(amount, ticker, wallet, options) {
    var params = `amount=${amount}&currency=${ticker.toUpperCase()}`;
    params += options ? `&${getParamString(options)}` : '';
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

}

module.exports = Transfers;