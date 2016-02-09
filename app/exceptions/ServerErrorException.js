'use strict';

var Exception = require('lumenode-foundation').Exception;

class ServerErrorException extends Exception {

  constructor(code, message) {
    super(code, message);

    this.name = 'ServerErrorException';
  }

}

module.exports = ServerErrorException;
