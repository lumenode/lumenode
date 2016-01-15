'use strict';

require(basePath('bootstrap/autoload'));

app().alias(
  basePath('app/http/HttpKernel'),
  'app/http/HttpKernel'
);

app().alias(
  basePath('app/exceptions/ExceptionHandler'),
  'app/exceptions/ExceptionHandler'
);

module.exports = app();
