'use strict';

var ServiceProvider = require('lumenode-foundation').ServiceProvider;

class ServerServiceProvider extends ServiceProvider {

  register() {
    // Set some aditional express values
    var express = app().make('Router').getExpress();
    var bodyParser = require('body-parser');

    express.use(bodyParser.json({limit: '50mb'}));
    express.use(bodyParser.urlencoded({extended: true, limit: '50mb'}));
  }
  
}

module.exports = ServerServiceProvider;
