'use strict';

var Q = require('q');
var fs = require('fs');
var _ = require('lodash');
var path = require('path');
var Observer = require('node-pubsub');
var lumenode = require('lumenode-foundation');

global.app = function () {
  return lumenode.getInstance(__dirname);
};

/**
 * Get env variable.
 *
 * @param  {String} key          Key
 * @param  {*}      defaultValue Default value if result is undefined
 * @return {*}
 */
global.env = function (key, defaultValue) {
  return _.get(process.env, key, defaultValue);
};

/**
 * Get instance of router.
 *
 * @return {Object} Application's router
 */
global.router = function () {
  return app().make('Router');
};

/**
 * Get config value.
 *
 * @param  {String|Array} path   Path or query
 * @param  {*} defaultValue      Default value if result is undefined
 * @return {*}
 */
global.config = function (path, defaultValue) {
  return app().make('Config').get(path, defaultValue);
};

/**
 * Apply trait to the class.
 * Basically, it is the same as 'mixin'.
 *
 * @param  {Function} target Class to be applied with properties
 * @param  {Function} source Class to be taked properties from
 * @return {void}
 */
global.trait = function (target, source) {
  if (typeof source === 'string') {
    source = app().make(source);
  }

  _.assign(target, source);
};

/**
 * Get application's model (mongoose).
 *
 * @param  {String} modelName Model name
 * @return {Object}           Mongoose instance
 */
global.model = function (modelName) {
  var mongoose = require('mongoose');

  return mongoose.model(modelName);
};

/**
 * Log message to the console
 *
 * @param  {String} file  Path to the file
 * @param  {String} msg   Message to be logged
 * @param  {String} level Type of log (info, warning, error..)
 * @return {void}
 */
global.log = function (logger, message) {
  app().make('Logger').log(logger, message);
};

/**
 * Report will collect data to a different file
 * withing logs/reports directory
 *
 * @param  {String} logger  Name of the report/logger
 * @param  {String} action  Title/action of the loged message
 * @param  {String} message Message to log
 * @return {void}
 */
global.report = function (logger, action, message) {
  // Will look like: "Events tree \n [message]"
  message = action + '\n' + message;

  app().make('Logger').report(logger, message);
};

/**
 * Generate path based on the root directory.
 *
 * @param  {String} path Path to generate
 * @return {String}      Resulted path
 */
global.basePath = function (path) {
  return __dirname + '/' + path;
};

/**
 * Execute application's listener.
 * We can pass both string or event object.
 * If we passed a string -> listener will be resolved out of ioc.
 *
 * @param  {String|Object} listener Listener to execute
 * @return {void}
 */
global.executeListener = function (listener) {
  // If we pass simple string -> try to resolve it from IoC container
  if (typeof listener === 'string') {
    listener = app().make(listener);
  }

  // Here we will publish listener with listener name
  // and with all the argumets passed to this (fireEvent) function
  Observer.publish(listener.name, _.toArray(arguments).slice(1));
};

/**
 * Throw application's exception.
 * As a first argument we can pass both string or error object.
 *
 * @param  {String|Object} exception Exception to throw
 * @param  {Number} code             Error code
 * @param  {String} message          Message to show
 * @return {void}
 */
global.exception = function (exception, code, message) {
  if (typeof exception === 'string') {
    var exceptionInstance = require(basePath('app/exceptions/' + exception));
    exception = new exceptionInstance(code, message);
  };

  throw exception;
};

/**
 * Sends response to the client.
 * This fn is the same as express.response.send.
 *
 * @return {*}
 */
global.response = function () {
  var res = app().make('Response');

  return res.send.apply(res, arguments);
};

/**
 * Wait untill every promise is resolved.
 *
 * @param  {Array} a  List of promises
 * @return {Objcet}   Promise
 */
global.wait = function (a) {
  return Q.all(a);
};

/**
 * Get list of files recursively.
 *
 * @param  {String} dir    Path to source directory
 * @return {Array}         List of files
 */
global.getFiles = function (dir, files_) {
  files_ = files_ || [];
  var files = fs.readdirSync(dir);
  for (var i in files) {
    var name = dir + '/' + files[i];
    if (fs.statSync(name).isDirectory()) {
      getFiles(name, files_);
    } else if (name.match(/\.js(?:on)?$/i)) {
      // for OS compatibility. On windows all '/' and '\' will convert to '\'.
      name = path.normalize(name);
      files_.push(name);
    }
  }
  return files_;
};

/**
 * Gets the property value at path of object.
 * If the resolved value is undefined the defaultValue is used in its place.
 *
 * @param  {Object} object          The object to query
 * @param  {String|Array} query     The path of the property to get
 * @param  {Mixed} defaultValue     The value returned if the resolved value is undefined OR falsy.
 * @return {Mixed}                  Result of the operation
 */
global.getValue = function (object, query, defaultValue) {
  var value = _.get(object, query, defaultValue);

  return _.isEmpty(value) ? defaultValue : value;
};
