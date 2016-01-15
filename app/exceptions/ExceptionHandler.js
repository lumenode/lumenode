'use strict';

var CoreExceptionHandler = require('lumenode-foundation').ExceptionHandler;

function ExceptionHandler(Application) {
  CoreExceptionHandler.apply(this, arguments);
}
inherit(ExceptionHandler, CoreExceptionHandler);

module.exports = ExceptionHandler;
