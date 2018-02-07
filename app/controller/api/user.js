'use strict';

const BaseController = require('../base');

class UserController extends BaseController {
  async currentUser() {
    const { service } = this;
    const user = await service.user.findUserById('lpc');
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

  async list(){
    const { service,ctx } = this;
    const response = await service.user.list(ctx.request.body);
    if (response) {
      this.success(response);
    } else {
      this.error(response, '查询失败');
    }
  }

  async save(){
    const { service,ctx } = this;
    const response = await service.user.save(ctx.request.body);
    if (response) {
      this.success(response);
    } else {
      this.error(response, '保存失败');
    }
  }

  async updateStatus(){
    const { service,ctx } = this;
    const response = await service.user.updateStatus(ctx.request.body);
    if (response) {
      this.success(response);
    } else {
      this.error(response, '更新失败');
    }
  }
}

module.exports = UserController;
