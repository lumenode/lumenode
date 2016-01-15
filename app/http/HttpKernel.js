'use strict';

var Kernel = require('lumenode-foundation').Kernel;

function HttpKernel(Application, Router) {
  this.routeMiddlewares = {};

  Kernel.apply(this, arguments);
}
inherit(HttpKernel, Kernel);

HttpKernel.prototype.bootstraped = function () {
  require('./routes');
};

module.exports = HttpKernel;
