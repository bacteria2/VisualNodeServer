var express = require('express');
var router = express.Router();
[12614135.26, 2647243.60];
const featureList = [{ type: "dangerous", longitude: "112.9653", latitude: "23.6734", id: 0 }, { type: "dangerous", longitude: "113.7653", latitude: "23.774", id: 0 }, { type: "dangerous", longitude: "112.6653", latitude: "23.8734", id: 0 }, { type: "protect", longitude: "113.1653", latitude: "23.9734", id: 1 }, { type: "protect", longitude: "113.2653", latitude: "23.6734", id: 1 }, { type: "team", longitude: "113.3653", latitude: "23.5734", id: 2 }, { type: "team", longitude: "113.46536", latitude: "23.4734", id: 2 }, { type: "team", longitude: "113.56536", latitude: "23.3734", id: 2 }, { type: "hospital", longitude: "113.06536", latitude: "23.2734", id: 4 }, { type: "hospital", longitude: "113.16536", latitude: "23.1734", id: 4 }, { type: "hospital", longitude: "113.26536", latitude: "23.7734", id: 4 }, { type: "hospital", longitude: "113.36536", latitude: "23.8734", id: 4 }, { type: "goods", longitude: "113.46536", latitude: "23.97340", id: 3 }, { type: "goods", longitude: "113.56536", latitude: "23.6734", id: 3 }, { type: "shelter", longitude: "113.66536", latitude: "23.7734", id: 5 }, { type: "shelter", longitude: "113.36536", latitude: "23.5734", id: 5 }, { type: "shelter", longitude: "113.26536", latitude: "23.1734", id: 5 }];

const featureInfo = [{
  title: "光明桥化学物品储藏处",
  alertLevel: 50,
  alertType: "易爆炸物品储藏",
  name: "工矿业炸药",
  administration: "区环保局",
  phone: 9837121211221,
  contacts: "洋伞",
  type: "dangerous"
}, { title: "XX警戒保护区", type: "protect", name: "野生动物园", contacts: "杨树增", phone: 7712312332 }, { title: "运动广场", people: 220, phone: 777221212, name: "清远小学111111111111111112121312321", type: "team" }, { title: "大号防护服", phone: 121277221212, name: "霹雳啪啦消防栓", administration: "应急处", account: 120, type: "goods" }, {
  title: "笔架路医疗救助站",
  address: "广东省清远市清新区笔架路22号华东状元小区12栋一单元2203号",
  phone: 112312317221212,
  name: "霹雳啪啦消防栓",
  type: "hospital"
}, { title: "露天避难所", type: "shelter", name: "笔架山XXX公园", available: 550, contacts: "杨xx", phone: "7711123312" }];

router.get('/feature/list', function (req, res, next) {
  res.json(featureList);
});

router.get('/feature/:id', function (req, res, next) {
  if (req.params.id) res.json(featureInfo[req.params.id]);else res.json({ msg: "error id is not in range", code: 400 });
});

module.exports = router;