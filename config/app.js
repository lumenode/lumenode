'use strict';

module.exports = function () {
  return {
    app: {
      port: 3536,
      debug: isTesting(),
      logToConsole: true,
      underMaintenance: false,

      amqp: getRabbitmqUrl(),
      hostname: getHostname(),
      databaseUrl: getDatabaseUrl(),

      openbetEndpoint: getOpenbetEndpoint(),
    }
  };

  function getRabbitmqUrl() {
    var host = process.env.RABBITMQ_HOST || 'localhost';
    var protocol = process.env.RABBITMQ_PROTOCOL || 'amqp';

    return protocol + '://' + host;
  }

  function getHostname() {
    var defaultHost = 'http://127.0.0.1';

    return process.env.HOST || process.env.HOSTNAME || defaultHost;
  }

  function isTesting() {
    return process.env.NODE_ENV === 'testing';
  }

  function getOpenbetEndpoint() {
    return process.env.OB_ENDPOINT || 'http://feeds-tst2.coral.co.uk/feeds/spark/';
  }

  function getDatabaseUrl () {
    return process.env.DB_PORT_27017_TCP_ADDR || '127.0.0.1'
  }
};
