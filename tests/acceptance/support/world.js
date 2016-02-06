'use strict';

var zombie = require('zombie');
require(__dirname + '/../../../index');

function World() {
  this.browser = new zombie();

  this.visit = function (url, callback) {
    this.browser.visit(url, callback);
  };
}

module.exports = function () {
  this.World = World;
};
