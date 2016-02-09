'use strict';

require('should');
var fs = require('fs');
var request = require('request');

var Exception = function Exception() {

  this.Before(() => {
    this.randomNumber = Math.random();
  });

  this.Given(/^I have route that throws 'ServerErrorException'$/, function () {
    var randomNumber = this.randomNumber;

    app().bind('ExceptionController', class {
      index() {
        return exception('ServerErrorException', 500, `Message custom ${randomNumber}`);
      }
    });

    router().get('/exceptionRoute', 'ExceptionController@index');
  });

  this.When(/^I visit this route$/, function (callback) {
    var url = `${config('app.hostname')}:${config('app.port')}/exceptionRoute`;

    this.visit(url, callback);
  });

  this.Then(/^I see error in response$/, function () {
    var message = this.browser.response.body;

    message.should.be.equal(`Message: Message custom ${this.randomNumber}. Code: 500`);
  });

  this.Then(/^I should see error logged$/, function () {
    var message = this.browser.response.body;

    var file = fs.readFileSync(basePath('storage/logs/error.log'), 'utf8');
    var exists = ~file.indexOf(message);
    exists.should.be.ok();
  });

}

module.exports = Exception;
