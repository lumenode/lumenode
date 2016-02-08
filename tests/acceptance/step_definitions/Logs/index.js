'use strict';

require('should');
var fs = require('fs');
var request = require('request');

var Logs = function Logs() {

  this.Before(function() {
    this.randomNumber = Math.random();
  });

  this.Given(/^I do not have any logs$/, function () {
    infoLogHas(`Testing message ${this.randomNumber}`).should.not.be.ok();
  });

  this.When(/^I log some 'message'$/, function (callback) {
    log('info', `Testing message ${this.randomNumber}`);

    setTimeout(() => callback(), 1000);
  });

  this.Then(/^I should see that 'message' in the log file$/, function () {
    infoLogHas(`Testing message ${this.randomNumber}`).should.be.ok();
  });

  function infoLogHas(str) {
    var infoLog = fs.readFileSync(basePath(`storage/logs/info.log`), 'utf8');

    return ~infoLog.indexOf(str);
  }

}

module.exports = Logs;
