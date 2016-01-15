'use strict';

var Observer = require('node-pubsub');

function Listener() {}

/**
 * Handle listener logic
 *
 * @param  {String} message Message from RabbitMQ
 * @return {void}
 */
Listener.prototype.handle = function () {
  throw new Error('You should override ::handle() method!');
};

/**
 * Subscribe to specific listener.
 *
 * How it works:
 *      Execute handler with arguments
 *      -> [context, 1, 2, 3.. etc];
 *      -> Array.prototype.slice.call(arguments)
 *      <- [1, 2, 3.. etc]
 *
 *      So, basically, we will do smth like:
 *      this.handle(1, 2, 3.. etc) + context
 *
 * @return {void}
 */
Listener.prototype.subscribe = function () {
  Observer.subscribe(this.name, function () {
    var args = Array.prototype.slice.call(arguments);
    var done = (args.length > 1) ? args.pop() : function() {};
    var timeout = setTimeout(function () { done({}); }, 60000);

    args.push(function (data) {
      clearTimeout(timeout);
      done(data);
    });

    try {
      this.handle.apply(this, args);
    } catch (e) {
      done(e);
      executeListener('CaughtError', e.message);
    }
  }.bind(this));
};

module.exports = Listener;
