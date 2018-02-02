'use strict';

const Service = require('egg').Service;
const ObjectId = require('mongodb').ObjectId;

class WidgetService extends Service {
  async getWidget(widgetId) {
    return await this.app.mongo.db.collection('widgets').findOne({ _id: ObjectId(widgetId) }, { _id: 0 });
  }

  getWidgetList(queryObject = {}, skip = 0, limit = 20) {
    const collection = this.app.mongo.db.collection('widgets');
    return collection.find(queryObject, {
      sort: { updateTime: -1 },
      skip,
      limit }).project({ _id: 1,updateTime:1,description:1,name:1 }).toArray()
    ;
  }

    async getPropertyPage(pageName) {
        return await this.service.template.getTemplateByName({ name: pageName });
    }
}

module.exports = WidgetService;
