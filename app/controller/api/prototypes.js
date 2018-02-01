'use strict';

const BaseController = require('../base');

class PrototypeController extends BaseController {

  async addPrototype() {
    const { service, ctx } = this;
    const response = await service.prototypes.addPrototype(ctx.request.body);
    if (response) {
      this.success(response);
    } else {
      this.error(response, '原型保存失败');
    }
  }

  async getPrototypes() {
    const { service, ctx } = this;
    const response = await service.prototypes.getPrototypes(ctx.request.body);
    if (response) {
      this.success(response);
    } else {
      this.error(response, '原型模版失败');
    }
  }

  async getPrototypeById() {
    const { service, ctx } = this;
    const response = await service.prototypes.getPrototypeById(ctx.request.body);
    if (response) {
      this.success(response);
    } else {
      this.error(response, '查询失败');
    }
  }

  async updatePrototype() {
    const { service, ctx } = this;
    const response = await service.prototypes.updatePrototype(ctx.request.body);
    if (response) {
      this.success(response);
    } else {
      this.error(response, '修改失败');
    }
  }

  async getUiMeta() {
    const { service, ctx } = this;
    const response = await service.prototypes.getUiMeta(ctx.params.id);
    if (response) {
      this.success(response);
    } else {
      this.error(response, '失败');
    }
  }

}

module.exports = PrototypeController;
