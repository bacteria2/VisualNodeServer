'use strict';
const dsRouter  = require('./router/datasourceRouter');

module.exports = app => {

  const { router, controller, config: { restApi: { prefix } } } = app;

  router.redirect('/', '/index.html', 302);
  router.get('/visual/resource', controller.resource.get);
  router.get(prefix + '/user/currentUser', controller.api.user.currentUser);
  router.post(prefix + '/user/list', controller.api.user.list);
  router.post(prefix + '/user/save', controller.api.user.save);
  router.post(prefix + '/user/updateStatus', controller.api.user.updateStatus);

  // 登录校验
  router.post(prefix+'/login/submit', app.passport.authenticate('local',{successRedirect :prefix+'/login/status'}));
  // 获取当前登陆用户信息
  router.get(prefix+'/login/status', controller.api.user.userLoginStatus);
  //退出登陆
  router.get(prefix+'/login/logout',controller.api.user.userLogout);
  //数据源路由
  dsRouter(app);

  //authorization
  router.get(prefix + '/authorization/list',controller.api.authorization.getAuthList);

  //router.post(prefix + '/login/account', controller.api.user.accountLogin);
  // Start widget
  router.get(prefix + '/widget/instance/:id', controller.api.widget.get);
  router.get(prefix + '/widget/list', controller.api.widget.getWidgetList);
  router.get(prefix + '/widget/propertyPages/:name/:index', controller.api.widget.getPropertyPage);
  // End widget
  // Start template
  router.post(prefix + '/template/add', controller.api.template.addTemplate);
  router.post(prefix + '/template/getAll', controller.api.template.getTemplates);
  router.post(prefix + '/template/getTemplateByName', controller.api.template.getTemplateByName);
  router.post(prefix + '/template/update', controller.api.template.updateTemplate);
  // End template
  // Start prototype
  router.post(prefix + '/prototype/add', controller.api.prototypes.addPrototype);
  router.post(prefix + '/prototype/getAll', controller.api.prototypes.getPrototypes);
  router.post(prefix + '/prototype/getPrototypeById', controller.api.prototypes.getPrototypeById);
  router.post(prefix + '/prototype/update', controller.api.prototypes.updatePrototype);
  router.get(prefix + '/prototype/meta/:id', controller.api.prototypes.getUiMeta);
  // End prototype

  // Start projectized
  router.get(prefix + '/projectized/list', controller.api.projectized.list);
  router.post(prefix + '/projectized/member/save/:id', controller.api.projectized.saveProjectMember);
  router.post(prefix + '/projectized/project/save', controller.api.projectized.saveProject)
  // End projectized
};
