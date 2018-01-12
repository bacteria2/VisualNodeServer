'use strict';

const Controller = require('egg').Controller;

class Project extends Controller {
  async notice() {
    this.ctx.body = 'hi, egg';
  }
}

module.exports = Project;
