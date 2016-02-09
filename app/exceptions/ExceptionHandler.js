'use strict';

var CoreExceptionHandler = require('lumenode-foundation').ExceptionHandler;

class ExceptionHandler extends CoreExceptionHandler {

  constructor(Application, Logger) {
    super(Application, Logger);
  }

}

module.exports = ExceptionHandler;
