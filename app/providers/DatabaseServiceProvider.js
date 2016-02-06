'use strict';

var Q = require('q');
var mongoose = require('mongoose');
var ServiceProvider = require('lumenode-foundation').ServiceProvider;

class DatabaseServiceProvider {

  register() {
    this.createConnection('lumenode');
  }

  createConnection(database) {
    var deferred = Q.defer();
    var url = this.getDatabaseUrl(database);

    mongoose.connect(url);

    var db = mongoose.connection;

    db.on('error', deferred.reject);
    db.once('open', () => {
      log('info', 'Connected to ' + url);
      deferred.resolve();
    });

    return deferred.promise;
  }

  getDatabaseUrl(database) {
    return 'mongodb://' + config('app.databaseUrl') + '/' + database + '-' + env('APP_ENV');
  }

}

module.exports = DatabaseServiceProvider;
