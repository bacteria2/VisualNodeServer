'use strict';

const Service = require('egg').Service;
const ObjectId = require('mongodb').ObjectId;

class WidgetService extends Service {
  async getWidget(widgetId) {
    return await this.app.mongo.db.collection('widgets').findOne({ _id: ObjectId(widgetId) }, { _id: 0 });
  }
}

module.exports = WidgetService;
