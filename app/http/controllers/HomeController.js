'use strict';

class HomeController {

  /**
   * Show emulator form.
   *
   * @return {*}  Response
   */
  index() {
    var fs = require('fs');
    var handlebars = require('handlebars');

    var html = fs.readFileSync(basePath('public/views/master.html'), 'utf8');
    var template = handlebars.compile(html)();

    return response(template);
  }

}

module.exports = HomeController;
