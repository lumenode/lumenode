'use strict';

var Kernel = require('lumenode-foundation').Kernel;

class HttpKernel extends Kernel {

  constructor(Application, Router) {
    super(Application, Router);

    this.routeMiddlewares = {};
  }

  bootstraped() {
    require('./routes');
  }

}

module.exports = HttpKernel;
