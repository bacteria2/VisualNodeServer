'use strict';

const BaseController = require('../base');

class UserController extends BaseController {
  async currentUser() {
    const { service } = this;
    const user = await service.user.findUserById('100002');

    if (user) {
      this.success(user);
    } else {
      this.nonFound(null, 'id:100002 not found');
    }

  }

  async accountLogin() {
    const user = this.request.body;

    this.success(user);
  }
}

module.exports = UserController;
