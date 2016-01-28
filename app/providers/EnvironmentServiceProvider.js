'use strict';

var Q = require('q');
var mongoose = require('mongoose');
var ServiceProvider = require('lumenode-foundation').ServiceProvider;

function EnvironmentServiceProvider() {
  ServiceProvider.apply(this, arguments);
}
inherit(EnvironmentServiceProvider, ServiceProvider);

EnvironmentServiceProvider.prototype.register = function () {
  log('info', 'App running in - ' + env('APP_ENV').toUpperCase());
};

module.exports = EnvironmentServiceProvider;
