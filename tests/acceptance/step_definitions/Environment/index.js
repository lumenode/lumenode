'use strict';

require('should');
var request = require('request');

var Environment = function Environment() {

  this.Before(() => {
    this.result = null;
  });

  this.When(/^I am trying to read environment configuraion$/, function () {
    this.result = env('foo');
  });

  this.Then(/^I should see some environment variables$/, function () {
    this.result.should.be.equal('bar');
  });

}

module.exports = Environment;
