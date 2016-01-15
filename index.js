'use strict';

require('./helpers');

var app = require(basePath('bootstrap/app'));

var kernel = app.make('app/http/HttpKernel');
kernel.init();

log('info', 'hekkkkkko')