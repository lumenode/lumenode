'use strict';

var Exception = require('lumenode-foundation').Exception;

class ServerErrorException extends Exception {

  constructor() {
    super();

    this.name = 'ServerErrorException';
  }

}

module.exports = ServerErrorException;
