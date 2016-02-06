'use strict';

var ServiceProvider = require('lumenode-foundation').ServiceProvider;

class EnvironmentServiceProvider extends ServiceProvider {

  register() {
    log('info', 'App running in - ' + env('APP_ENV').toUpperCase());
  }
  
}

module.exports = EnvironmentServiceProvider;
