'use strict';

module.exports = function () {
  return {
    app: {
      'providers': [
        basePath('node_modules/lumenode-foundation/providers/HttpServiceProvider'),
        basePath('node_modules/lumenode-foundation/providers/LoggerServiceProvider'),
        basePath('app/providers/EnvironmentServiceProvider'),
        basePath('app/providers/DatabaseServiceProvider'),
        basePath('app/providers/ServerServiceProvider'),
        basePath('app/providers/RedisServiceProvider'),
      ]
    }
  }
};
