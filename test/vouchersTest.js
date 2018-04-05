'use strict';

const Config = require('./testConfig.json');
var expect = require('chai').expect;
const LiveCoin = require('../src/index');
const client = new LiveCoin(Config.key, Config.secret);

describe('#LiveCoin Vouchers', function () {

  it('should return LiveCoin client', function () {
    expect(client.makeVoucher).to.exist;
    expect(client.getVoucherAmount).to.exist;
    expect(client.redeemVoucher).to.exist;
  });

  it('should make a voucher', async function () {
    var info = await client.makeVoucher(1, 'usd', 'need a voucher');
    expect(info).to.be.an('object');
  });

  it('should get voucher amount', async function () {
    var info = await client.getVoucherAmount('LVC-USD-12345678-87654321-ABCDEFGI-ABCD1234');
    expect(info).to.be.an('object');
  });

  it('should redeem voucher', async function () {
    var info = await client.redeemVoucher('LVC-USD-12345678-87654321-ABCDEFGI-ABCD1234');
    expect(info).to.be.an('object');
  });

});