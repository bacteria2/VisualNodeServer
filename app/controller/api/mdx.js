'use strict';

const dcBaseController = require('./dcBaseController.js');

class cube extends dcBaseController {

    getService(){
        return this.service.mdxService;
    }

}

module.exports = cube;
