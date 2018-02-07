'use strict';
const dcBaseService = require('./dcBaseService');

class cubeService extends dcBaseService {

    getTablename(){
        return 'YDP_VISUAL_CUBE_SCHEMA';
    }

}

module.exports = cubeService;
