'use strict';

require('should');
var request = require('request');

var Pages = function Pages() {

  this.Before(() => {
    this.response = null;
  });

  this.Given(/^I started application$/, function () {});

  this.When(/^I visit 'home' page$/, function (callback) {
    var url = config('app.hostname') + ':' + config('app.port');
    
    this.visit(url, callback);
  });

  this.Then(/^I should see 'Hi, there.' heading$/, function () {
    this.browser.assert.text('h1', 'Hi, there.');
  });

}

module.exports = Pages;
