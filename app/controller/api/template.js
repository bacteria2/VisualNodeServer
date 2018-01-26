'use strict';

const BaseController = require('../base');

class TemplateController extends BaseController {

  async addTemplate() {
    const { service, ctx } = this;
    const response = await service.template.addTemplate(ctx.request.body);

    if (response) {
      this.success(response);
    } else {
      this.error(response, '模版保存失败');
    }
  }

  async getTemplates() {
    const { service, ctx } = this;
    const response = await service.template.getTemplates(ctx.request.body);
    if (response) {
      this.success(response);
    } else {
      this.error(response, '查询模版失败');
    }
  }

  async getTemplateByName() {
    const { service, ctx } = this;
    const response = await service.template.getTemplateByName(ctx.request.body);
    if (response) {
      this.success(response);
    } else {
      this.error(response, '查询失败');
    }
  }

  async updateTemplate() {
    const { service, ctx } = this;
    const response = await service.template.updateTemplate(ctx.request.body);
    if (response) {
      this.success(response);
    } else {
      this.error(response, '修改失败');
    }
  }

}

module.exports = TemplateController;
