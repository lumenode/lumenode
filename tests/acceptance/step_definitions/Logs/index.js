'use strict';

require('should');
var fs = require('fs');
var request = require('request');

var Logs = function Logs() {

  this.Before(function () {
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

  // Reports
  this.Given(/^I do not have 'testing' report$/, function (callback) {
    var files = fs.readdirSync(basePath('storage/reports'));

    if (~files.indexOf('testing.log')) {
      fs.unlinkSync(basePath('storage/reports/testing.log'));
    }

    setTimeout(() => callback(), 1000);
  });

  this.When(/^I report 'test' message$/, function (callback) {
    report('testing', 'foo', this.randomNumber);

    setTimeout(() => callback(), 1000);
  });

  this.Then(/^I should see that 'test' message in the report file$/, function () {
    var report = fs.readFileSync(basePath(`storage/reports/testing.log`), 'utf8');

    var regexp1 = new RegExp('foo');
    var regexp2 = new RegExp(this.randomNumber);

    regexp1.test(report).should.be.ok();
    regexp2.test(report).should.be.ok();
  });

  function infoLogHas(str) {
    var infoLog = fs.readFileSync(basePath(`storage/logs/info.log`), 'utf8');

    return ~infoLog.indexOf(str);
  }

}

module.exports = Logs;
