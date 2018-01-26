'use strict';

const BaseController = require('../base');

class WidgetController extends BaseController {
  async getWidget() {
    const { service } = this;

    const data = await service.widget.getWidget(this.ctx.params.id);
    if (data !== null) {
      this.app.logger.info(`成功获取组件实例数据：[${this.ctx.params.id}][${data.name}]`);
      this.success(data);
    } else {
      this.app.logger.info(`未找到组件实例数据：${this.ctx.params.id}`);
      this.notFound();
    }
  }
}

module.exports = WidgetController;
