'use strict';

var file = app().make('Filesystem');
var path = require('path');

function register(entity) {
  var title = path.basename(entity, path.extname(entity));

  app().bind(title, entity);
}

function load(entity) {
  require(entity);
}

// Load
file.getFiles(basePath('app/models')).forEach(load);

// Register
file.getFiles(basePath('app/http/controllers')).forEach(register);
file.getFiles(basePath('app/repositories')).forEach(register);
file.getFiles(basePath('app/exceptions')).forEach(register);
file.getFiles(basePath('app/factories')).forEach(register);
file.getFiles(basePath('app/services')).forEach(register);
file.getFiles(basePath('app/events')).forEach(register);
file.getFiles(basePath('app/traits')).forEach(register);
