'use strict';

const Config = require('./testConfig.json');
var expect = require('chai').expect;
const LiveCoin = require('../index');

describe('#LiveCoin Public Data', function() {
  it('should be defined', function() {
    expect(LiveCoin).to.exist;
  });

  it('should return LiveCoin client', function() {
    const client = new LiveCoin(Config.key, Config.secret);
    expect(client.getTicker).to.exist;
    expect(client.getAllTickers).to.exist;
    expect(client.getLastTrades).to.exist;
    expect(client.getOrders).to.exist;
    expect(client.getAllOrders).to.exist;
    expect(client.getBidAndAsk).to.exist;
    expect(client.getAllBidsAndAsks).to.exist;
    expect(client.getRestrictions).to.exist;
    expect(client.getCurrencies).to.exist;
  });

  it('should get ticker info', async function() {
    const client = new LiveCoin(Config.key, Config.secret);
    var info = await client.getTicker('btc', 'usd');
    expect(info).to.be.an('object');
    expect(info['cur']).to.equal('BTC');
    expect(info['symbol']).to.equal('BTC/USD');
    expect(info['last']).to.be.a('number');
    expect(info['high']).to.be.a('number');
    expect(info['low']).to.be.a('number');
    expect(info['volume']).to.be.a('number');
    expect(info['vwap']).to.be.a('number');
    expect(info['max_bid']).to.be.a('number');
    expect(info['min_ask']).to.be.a('number');
    expect(info['best_bid']).to.be.a('number');
    expect(info['best_ask']).to.be.a('number');
  });

  it('should get all ticker info', async function() {
    const client = new LiveCoin(Config.key, Config.secret);
    var info = await client.getAllTickers();
    expect(info).to.be.an('array');
    expect(info).to.have.lengthOf(493);
  });

  it('should get last trades', async function() {
    const client = new LiveCoin(Config.key, Config.secret);
    var info = await client.getLastTrades('btc', 'usd', {
      minOrHr: true, 
      type: "BUY"
    });
    expect(info).to.be.an('array');
  });

  it('should get orders for a ticker', async function() {
    const client = new LiveCoin(Config.key, Config.secret);
    var info = await client.getOrders('btc', 'usd', {
      groupByPrice: true, 
      depth: 4
    });
    expect(info).to.be.an('object');
    expect(info['asks']).to.be.an('array');
    expect(info['asks']).to.have.lengthOf(4);
    expect(info['bids']).to.be.an('array');
    expect(info['bids']).to.have.lengthOf(4);
  });

  it('should get orders for all tickers', async function() {
    const client = new LiveCoin(Config.key, Config.secret);
    var info = await client.getAllOrders({
      groupByPrice: true, 
      depth: 4
    });
    expect(info).to.be.an('object');
  });

  it('should get max bid and min ask', async function() {
    const client = new LiveCoin(Config.key, Config.secret);
    var info = await client.getBidAndAsk('btc', 'usd');
    expect(info).to.be.an('object');
    expect(info['currencyPairs']).to.be.an('array');
    expect(info['currencyPairs']).to.have.lengthOf(1);
    expect(info['currencyPairs'][0]).to.be.an('object');
    expect(info['currencyPairs'][0]['symbol']).to.equal('BTC/USD');
    expect(info['currencyPairs'][0]['maxBid']).to.be.a('string');
    expect(info['currencyPairs'][0]['minAsk']).to.be.a('string');
  });

  it('should get all max bids and min asks', async function() {
    const client = new LiveCoin(Config.key, Config.secret);
    var info = await client.getAllBidsAndAsks();
    expect(info).to.be.an('object');
    expect(info['currencyPairs']).to.be.an('array');
    expect(info['currencyPairs']).to.have.lengthOf(493);
    expect(info['currencyPairs'][0]).to.be.an('object');
    expect(info['currencyPairs'][0]['symbol']).to.equal('BNT/BTC');
    expect(info['currencyPairs'][0]['maxBid']).to.be.a('string');
    expect(info['currencyPairs'][0]['minAsk']).to.be.a('string');
  });

  it('should get minimum order restrictions', async function() {
    const client = new LiveCoin(Config.key, Config.secret);
    var info = await client.getRestrictions();
    expect(info).to.be.an('object');
    expect(info['restrictions']).to.be.an('array');
    expect(info['restrictions']).to.have.lengthOf(490);
    expect(info['restrictions'][0]).to.be.an('object');
    expect(info['restrictions'][0]['currencyPair']).to.equal('BTC/USD');
    expect(info['restrictions'][0]['minLimitQuantity']).to.be.a('number');
    expect(info['restrictions'][0]['priceScale']).to.be.a('number');
  });

  it('should get information on currencies', async function() {
    const client = new LiveCoin(Config.key, Config.secret);
    var info = await client.getCurrencies();
    expect(info).to.be.an('object');
    expect(info['info']).to.be.an('array');
    expect(info['info']).to.have.lengthOf(194);
    expect(info['info'][0]).to.be.an('object');
    expect(info['info'][0]['name']).to.equal('Bitcoin');
    expect(info['info'][0]['symbol']).to.equal('BTC');
    expect(info['info'][0]['walletStatus']).to.equal('normal');
    expect(info['info'][0]['withdrawFee']).to.equal(0.001);
    expect(info['info'][0]['difficulty']).to.be.a('number');
    expect(info['info'][0]['minDepositAmount']).to.equal(0);
    expect(info['info'][0]['minWithdrawAmount']).to.equal(' 0.002');
    expect(info['info'][0]['minOrderAmount']).to.equal(0.0001);
  });
});