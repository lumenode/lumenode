'use strict';

var CoreExceptionHandler = require('lumenode-foundation').ExceptionHandler;

class ExceptionHandler extends CoreExceptionHandler {

  constructor(Application) {
    super(Application);
  }

}

module.exports = ExceptionHandler;
