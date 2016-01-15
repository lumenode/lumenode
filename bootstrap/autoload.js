'use strict';

var path = require('path');

function register(entity) {
  var title = path.basename(entity, path.extname(entity));

  app().bind(title, entity);
}

function load(entity) {
  require(entity);
}

// Load
getFiles(basePath('app/models')).forEach(load);

// Register
getFiles(basePath('app/services')).forEach(register);
getFiles(basePath('app/factories')).forEach(register);
getFiles(basePath('app/repositories')).forEach(register);
getFiles(basePath('app/http/controllers')).forEach(register);
getFiles(basePath('app/traits')).forEach(register);
getFiles(basePath('app/mappers')).forEach(register);
