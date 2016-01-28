'use strict';

function HomeController() {

  /**
   * Show emulator form.
   *
   * @return {*}  Response
   */
  this.index = function () {
    var fs = require('fs');
    var handlebars = require('handlebars');

    var html = fs.readFileSync(basePath('public/views/master.html'), 'utf8');
    var template = handlebars.compile(html)();

    return response(template);
  };

  /**
   * Create new record in the database.
   *
   * @return {*} Response
   */
  this.new = function() {
    var res = model('Demo').create({
      title: 'Hello ' + Math.round(Math.random()*100)
    }).then(function(record) {
      return response('Created: ' + JSON.stringify(record));
    });
  };

  /**
   * Show all the records in the database.
   *
   * @return {*} Response
   */
  this.list = function() {
    model('Demo').find().exec(function(err, data) {
      return response(JSON.stringify(data));
    });
  };

}

module.exports = HomeController;
