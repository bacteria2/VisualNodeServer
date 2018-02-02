'use strict';
const path = require('path');

module.exports =appInfo=>({
  mongo: {
    client: {
      host: '192.168.40.161',
      port: '27017',
      name: 'data-view',
    },
  },
  logger: {
    level: 'DEBUG',
    consoleLevel: 'DEBUG',
    dir: path.join(appInfo.baseDir, 'logs'),
  },
});
