'use strict';

var Q = require('q');
var mongoose = require('mongoose');
var ServiceProvider = require('lumenode-foundation').ServiceProvider;

function DatabaseServiceProvider() {
  ServiceProvider.apply(this, arguments);
}
inherit(DatabaseServiceProvider, ServiceProvider);

DatabaseServiceProvider.prototype.register = function () {
  this.createConnection('pc');
};

DatabaseServiceProvider.prototype.createConnection = function (database) {
  var deferred = Q.defer();
  var url = this.getDatabaseUrl(database);

  mongoose.connect(url);

  var db = mongoose.connection;

  db.on('error', deferred.reject);
  db.once('open', function() {
    log('info', 'Connected to - ' + url);
    deferred.resolve();
  }.bind(this));

  return deferred.promise;
};

DatabaseServiceProvider.prototype.getDatabaseUrl = function(database) {
  return 'mongodb://' + config('app.databaseUrl') + '/' + database + '-' + env('APP_ENV');
};

module.exports = DatabaseServiceProvider;
