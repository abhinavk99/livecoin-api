'use strict';

const fetch = require('node-fetch');
const CryptoJS = require('crypto-js');

class Vouchers {

  constructor() {
    this.apiKey = '';
    this.apiSecret = '';

    this.baseUrl = 'https://api.livecoin.net';
    this.payBase = this.baseUrl + '/payment';
    this.vouBase = this.payBase + '/voucher';
  }

  login(apiKey, apiSecret) {
    this.apiKey = apiKey;
    this.apiSecret = apiSecret;
  }

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

module.exports = Vouchers;