'use strict';

const fetch = require('node-fetch');
const CryptoJS = require('crypto-js');
const getParamString = require('./paramHelper');

class RequestHandler {

  constructor(apiKey = '', apiSecret = '') {
    this.login(apiKey, apiSecret);
    this.baseUrl = 'https://api.livecoin.net';
  }

  login(apiKey, apiSecret) {
    this.apiKey = apiKey;
    this.apiSecret = apiSecret;
  }

  request(endpoint, params, method, needsAuthorization = true) {
    return new Promise((resolve, reject) => {
      let queryString = getParamString(params);
      let requestInfo = {
        method: method
      };
      if (needsAuthorization) {
        let sign = CryptoJS.HmacSHA256(queryString, this.apiSecret)
          .toString(CryptoJS.enc.Hex).toUpperCase();
        let headers = {
          'API-key': this.apiKey,
          'Sign': sign,
          'Content-type': 'application/x-www-form-urlencoded'
        };
        requestInfo.headers = headers;
        if (method === 'POST')
          requestInfo.body = queryString;
      }
      let uri = method === 'POST'
        ? `${this.baseUrl}/${endpoint}`
        : `${this.baseUrl}/${endpoint}?${queryString}`;

      fetch(uri, requestInfo)
        .then(res => resolve(res.json()))
        .catch(err => reject(err));
    });
  }

}

module.exports = RequestHandler;