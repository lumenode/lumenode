'use strict';

module.exports = function () {
  return {
    app: {
      'providers': [
        basePath('node_modules/lumenode-foundation/providers/HttpServiceProvider'),
        basePath('node_modules/lumenode-foundation/providers/LoggerServiceProvider'),
        basePath('app/providers/DatabaseServiceProvider')
      ]
    }
  }
};
