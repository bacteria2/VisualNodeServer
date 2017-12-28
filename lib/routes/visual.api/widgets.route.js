import express from 'express';
import { success } from "../../common";

let router = express.Router();

/**POST insert new widget*/
router.get('/insert', function (req, res, next) {
  let widget = req.body;
  req.app.locals.mongoDispatch({
    type: 'widgets.insertOneWidget',
    payload: widget
  }).then(resp => {
    res.json(success({ insertNum: resp.insertedCount }), "数据插入成功");
  });
});

/* GET widgetById listing. */
router.get('/:id', function (req, res, next) {
  req.app.locals.mongoDispatch({
    type: 'widgets.getWidgetById',
    payload: req.params.id
  });
  res.send('respond with a resource');
});

export default router;