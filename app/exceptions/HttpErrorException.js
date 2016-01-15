'use strict';

var Exception = require('lumenode-foundation').Exception;

function HttpErrorException() {
  this.name = 'HttpErrorException';
  Exception.apply(this, arguments);
}
inherit(HttpErrorException, Exception);

module.exports = HttpErrorException;
