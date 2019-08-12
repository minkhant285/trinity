const express = require('express');
const data_predict = require('../../AI/predict');
var router = express.Router();

var dataIn = async (req, res) => {
    var data = req.body;
    var predict = data_predict.predict(data);
    res.status(200).json({ "fire_data": predict });
}
router.post('/data_in', dataIn);

var dataGet = async (req, res) => {
    res.status(200).json({ data: "many data" });
}
router.get('/data_get', dataGet);

module.exports = router;