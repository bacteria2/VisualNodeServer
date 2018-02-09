'use strict';

const BaseController = require('../base');

class AuthorizationController extends BaseController {

    async getAuthList() {
        const { service } = this;
        const response = await service.authorization.getAuthList();
        response? this.success(response):this.error(null, 'auth list error')
    }

}

module.exports = AuthorizationController;
