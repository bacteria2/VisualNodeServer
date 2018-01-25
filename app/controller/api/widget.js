'use strict';

const BaseController = require('../base');

class WidgetController extends BaseController {
  async getWidget() {
    const { service } = this;

    const data = await service.widget.getWidget(this.ctx.params.id);
    if (data !== null) {
      this.success(data);
    } else {
      this.notFound();
    }
  }
}

module.exports = WidgetController;
