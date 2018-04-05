'use strict';

const Config = require('./testConfig.json');
var expect = require('chai').expect;
const LiveCoin = require('../src/index');
const client = new LiveCoin(Config.key, Config.secret);

describe('#LiveCoin Orders', function () {

  it('should return LiveCoin client', function () {
    expect(client.buyLimit).to.exist;
    expect(client.sellLimit).to.exist;
    expect(client.buyMarket).to.exist;
    expect(client.sellMarket).to.exist;
    expect(client.cancelLimit).to.exist;
  });

  it('should make a buy limit order', async function () {
    var info = await client.buyLimit('btc', 'usd', 10000, 0.1);
    expect(info).to.be.an('object');
  });

  it('should make a sell limit order', async function () {
    var info = await client.sellLimit('btc', 'usd', 10000, 0.1);
    expect(info).to.be.an('object');
  });

  it('should make a buy market order', async function () {
    var info = await client.buyMarket('btc', 'usd', 0.1);
    expect(info).to.be.an('object');
  });

  it('should make a sell market order', async function () {
    var info = await client.sellMarket('btc', 'usd', 0.1);
    expect(info).to.be.an('object');
  });

  it('should cancel a limit order', async function () {
    var info = await client.cancelLimit('btc', 'usd', 1111);
    expect(info).to.be.an('object');
  });

});