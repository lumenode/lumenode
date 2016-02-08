'use strict';

require('should');
var request = require('request');

var MethodInjection = function MethodInjection() {

  this.Before(() => {
    this.response = null;
  });

  this.Given(/^I have 'Config' service$/, function () {
    app().instance('ConfigTest', {
      foo: 'bar'
    });
  });

  this.Given(/^I have a route '\/config' that uses 'Config' service$/, function () {
    app().bind('TestController', class {
      config(ConfigTest) {
        return response(ConfigTest);
      }
    });

    router().get('/configTest', 'TestController@config');
  });

  this.When(/^I navigate to the '\/config' url$/, function (callback) {
    var url = `${config('app.hostname')}:${config('app.port')}/configTest`;

    this.visit(url, callback);
  });

  this.Then(/^I should see application config$/, function () {
    var response = this.browser.response.body;
    response = JSON.parse(response);

    response.foo.should.equal('bar');
  });

}

module.exports = MethodInjection;
