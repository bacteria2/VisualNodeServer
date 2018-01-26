'use strict';

const dcBaseController = require('./dcBaseController.js');

class cubeCategory extends dcBaseController {

    getService(){
        return this.service.cubeCategoryService;
    }

}

module.exports = cubeCategory;
