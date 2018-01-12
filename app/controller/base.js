'use strict';

const Controller = require('egg').Controller;

class BaseController extends Controller {

  get user() {
    return this.ctx.session.user;
  }

  get mongodb() {
    return this.app.mongo.db;
  }

  success(data) {
    this.ctx.body = {
      msg: '',
      success: true,
      code: 200,
      data,
    };
  }

  error(data, msg = 'there is an error occured in server') {
    this.ctx.body = {
      msg,
      success: false,
      code: 500,
      data,
    };
  }

  notFound(data, msg = 'request not found') {
    this.ctx.body = {
      msg,
      success: false,
      code: 404,
      data,
    };
  }
}

module.exports = BaseController;
