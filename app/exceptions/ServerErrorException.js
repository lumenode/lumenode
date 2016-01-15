'use strict';

var Exception = require('lumenode-foundation').Exception;

function ServerErrorException(message) {
  this.name = 'ServerErrorException';

  Exception.apply(this, arguments);
}
inherit(ServerErrorException, Exception);

module.exports = ServerErrorException;
