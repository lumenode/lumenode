'use strict';

require('should');
var request = require('request');

var Config = function Config() {

  this.Before(() => {
    this.result = null;
  });

  this.When(/^I am trying to read global configuraion$/, function () {
    this.result = config('app');
  });

  this.Then(/^I should see some config variables$/, function () {
    this.result.should.not.be.empty();
  });

  this.When(/^I am trying to set 'foo' key with 'bar' value$/, function () {
    (typeof config('foo')).should.be.equal('undefined');

    app().make('Config').set('foo', 'bar');
  });

  this.Then(/^I should see 'foo' key and 'bar' value$/, function () {
    config('foo').should.be.equal('bar');
  });

}

module.exports = Config;
