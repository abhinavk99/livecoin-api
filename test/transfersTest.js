'use strict';

const Config = require('./testConfig.json');
var expect = require('chai').expect;
const LiveCoin = require('../src/index');
const client = new LiveCoin(Config.key, Config.secret);

describe('#LiveCoin Transfers', function () {

  it('should return LiveCoin client', function () {
    expect(client.getAddress).to.exist;
    expect(client.withdraw).to.exist;
    expect(client.toPayeer).to.exist;
    expect(client.toCapitalist).to.exist;
    expect(client.toAdvcash).to.exist;
    expect(client.toBankCard).to.exist;
    expect(client.toOkpay).to.exist;
    expect(client.toPerfectMoney).to.exist;
  });

  it('should get address of coin', async function () {
    var info = await client.getAddress('btc');
    expect(info).to.be.an('object');
  });

  it('should withdraw from wallet address', async function () {
    var info = await client.withdraw(1, 'usd',
      '1MfTTxGnBBgvyk9477hWurosfqj8MZKkAG');
    expect(info).to.be.an('object');
  });

  it('should transfer to Payeer', async function () {
    var info = await client.toPayeer(1, 'usd',
      '1MfTTxGnBBgvyk9477hWurosfqj8MZKkAG', {
      protect: 1,
      protect_period: 3
    });
    expect(info).to.be.an('object');
  });

  it('should transfer to Capitalist', async function () {
    var info = await client.toCapitalist(1, 'usd',
      '1MfTTxGnBBgvyk9477hWurosfqj8MZKkAG');
    expect(info).to.be.an('object');
  });

  it('should transfer to Advcash', async function () {
    var info = await client.toAdvcash(1, 'usd',
      '1MfTTxGnBBgvyk9477hWurosfqj8MZKkAG');
    expect(info).to.be.an('object');
  });

  it('should transfer to bank card', async function () {
    var info = await client.toBankCard(1, 'usd',
      '5567025017512543', '09', '18');
    expect(info).to.be.an('object');
  });

  it('should transfer to Okpay', async function () {
    var info = await client.toOkpay(1, 'USD', 'OK123456789');
    expect(info).to.be.an('object');
  });

  it('should transfer to Perfect Money', async function () {
    var info = await client.toPerfectMoney(1, 'usd',
      '1MfTTxGnBBgvyk9477hWurosfqj8MZKkAG');
    expect(info).to.be.an('object');
  });

});