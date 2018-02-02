'use strict';

const BaseController = require('../base');

class WidgetController extends BaseController {
  async get() {
    const { service, ctx } = this;

    const data = await service.widget.getWidget(ctx.params.id);
    if (data !== null) {
      this.app.logger.info(`成功获取组件实例数据：[${this.ctx.params.id}][${data.name}]`);
      this.success(data);
    } else {
      this.app.logger.info(`未找到组件实例数据：${this.ctx.params.id}`);
      this.notFound();
    }
  }

  async getPropertyPage() {
    const { service, ctx: { params } } = this;;
    const i = params.index
    const page = await service.widget.getPropertyPage(params.name);
    if (page) {
      const defineStr = JSON.stringify(page.define).replace(/\${i}/g, i);
      this.success(JSON.parse(defineStr));
    } else {
      this.notFound();
    }
  }

  async getWidgetList(){
      const { service, ctx: { params } } = this;
      return  this.success(await service.widget.getWidgetList());
  }
}

module.exports = WidgetController;
