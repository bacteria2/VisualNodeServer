'use strict';
const dsRouter  = require('./router/datasourceRouter');

module.exports = app => {

  const { router, controller, config: { restApi: { prefix } } } = app;

  router.redirect('/', '/index.html', 302);
  router.get('/visual/resource', controller.resource.get);
  router.get(prefix + '/user/currentUser', controller.api.user.currentUser);

  //数据源路由
  dsRouter(app);

  router.post(prefix + '/login/account', controller.api.user.accountLogin);
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
};
