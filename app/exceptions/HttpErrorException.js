'use strict';

var Exception = require('lumenode-foundation').Exception;

class HttpErrorException extends Exception {

  constructor() {
    super();

    this.name = 'HttpErrorException';
  }

}

module.exports = HttpErrorException;
