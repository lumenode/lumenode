require('should');
var fs = require('fs');

var EmulatorPageSteps = function EmulatorPageSteps() {

  this.Given(/^I started application$/, function () {});

  this.When(/^I visit 'home' page$/, function (callback) {
    var url = config('app.hostname') + ':' + config('app.port');
    
    this.visit(url, callback);
  });

  this.Then(/^I should see some inputs and buttons in order to send XML for different events$/, function () {
    this.browser.assert.element('select');
    this.browser.assert.elements('button', 2);
  });

}

module.exports = EmulatorPageSteps;
