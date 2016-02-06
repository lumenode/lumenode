'use strict';

var ServiceProvider = require('lumenode-foundation').ServiceProvider;

class RedisServiceProvider extends ServiceProvider {

  register() {
    // app().make('Redis');

    log('info', 'Connection with redis established');
  }
  
}

module.exports = RedisServiceProvider;
