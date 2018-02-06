'use strict';

module.exports = app => {
    const { router, controller, config: { restApi: { prefix } } } = app;

    //基础增删改查接口
    const controllerKey = ['database','cube','cubeCategory','mdx'];
    controllerKey.forEach(e=>{
        let myController = controller.api[e];
        let myPrefix = prefix + '/' + e ;
        router.get(myPrefix +'/list', myController.list);
        router.get(myPrefix +'/getById/:id', myController.getById);
        router.get(myPrefix +'/deleteById/:id', myController.deleteById);
        router.post(myPrefix +'/insert', myController.insert);
        router.post(myPrefix +'/update', myController.update);
    });

    const databaseController = controller.api.database;
    //查询数据源分类
    router.get(prefix + '/database/typeList', databaseController.typeList);

    const cubeController = controller.api.cube;
    //根据CUBEID 查询 数据源
    router.get(prefix + '/cube/getDBbyCubeId/:id', cubeController.getDBbyCubeId);
    router.get(prefix + '/cube/queryByCategoryId/:id', cubeController.queryByCategoryId);

};
