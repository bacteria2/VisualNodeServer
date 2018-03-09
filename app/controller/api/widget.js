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
    const { service, ctx: { params } } = this;
    const i = params.index;
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

  async addWidget(){
      const { service } = this;
      try{
          //合并原型，产生新的实例
          const widget = await  service.widget.newWidgetByPrototype(this.body);
          //保存新的实例
          const result = await  service.widget.insert(widget);

          this.success(result,'添加实例成功');
      }catch (e){
          this.error(null,e.message);
          this.logger.error(e);
      }
  }

  async copyWidget(){

      const { service, ctx: { params } } = this;

      try {
          const result = await service.widget.copyWidget(params.widgetId,params.newName);
          return  this.success(result);
      }catch (e){
          this.error(null,e.message);
          this.app.logger.info(`复制实例失败：` + e.message());
      }
  }

  async deployInstance(){
      const { service, ctx: { params,request } } = this;
      try{
          await service.widget.deployWidgetToDb(request.body,params.type);
          this.success('deploy success')
      }catch (error){
          this.app.logger.error("deploy error %s",error);
          this.error(null,'deploy failed')
      }
  }

}

module.exports = WidgetController;
