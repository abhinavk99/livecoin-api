'use strict';

const Config = require('./testConfig.json');
var expect = require('chai').expect;
const LiveCoin = require('../src/index');
const client = new LiveCoin(Config.key, Config.secret);

describe('#LiveCoin Private Data', function() {

  it('should return LiveCoin client', function() {
    expect(client.getUserTrades).to.exist;
    expect(client.getClientOrders).to.exist;
    expect(client.getUserOrder).to.exist;
    expect(client.getBalances).to.exist;
    expect(client.getBalance).to.exist;
    expect(client.getTransactions).to.exist;
    expect(client.getNumTransactions).to.exist;
    expect(client.getTradingFee).to.exist;
    expect(client.getTradingFeeAndVolume).to.exist;
  });

  it('should get user trades', async function() {
    var info = await client.getUserTrades({
      orderDesc: true,
      limit: 4
    });
    expect(info).to.be.an('object');
  });
  
  it('should get client orders', async function() {
    var info = await client.getClientOrders({
      openClosed: 'CANCELLED',
      startRow: 2
    });
    expect(info).to.be.an('object');
  });

  it('should get user order', async function() {
    var info = await client.getUserOrder(88504958);
    expect(info).to.be.an('object');
  });

  it('should get balances', async function() {
    var info = await client.getBalances('BTC');
    expect(info).to.be.an('array');
  });

  it('should get balance', async function() {
    var info = await client.getBalance('BTC');
    expect(info).to.be.an('object');
  });

  it('should get transactions', async function() {
    var info = await client.getTransactions('1409920436000', '1409920636000', {
      types: 'BUY',
      limit: 2
    });
    expect(info).to.be.an('array');
  });

  it('should get number of transactions', async function() {
    var info = await client.getNumTransactions('1409920436000', '1409920636000', 'BUY');
    expect(info).to.be.a('number');
  });

  it('should get trading fee', async function() {
    var info = await client.getTradingFee();
    expect(info).to.be.a('object');
  });

  it('should get trading fee and volume', async function() {
    var info = await client.getTradingFeeAndVolume();
    expect(info).to.be.a('object');
  });
});