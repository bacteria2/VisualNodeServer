'use strict';
const dcBaseService = require('./dcBaseService');

class cubeService extends dcBaseService {

    getTablename(){
        return 'YDP_VISUAL_MDX';
    }

}

module.exports = cubeService;
