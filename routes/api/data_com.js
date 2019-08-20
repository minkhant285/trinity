const express = require('express');
const data_predict = require('../../AI/fire_ml');
var router = express.Router();

var dataIn = async (req, res) => {
    var data = req.body;
    var predict = data_predict.predict();
    res.status(200).json({ "data": predict });
}
router.post('/data_in', dataIn);

var dataGet = async (req, res) => {
    res.status(200).json({ data: [{ lat: "21.99277", lng: "96.09539", temp: "45" }, { lat: "21.77777", lng: "96.55555", temp: "55" }] });
}
router.get('/test', dataGet);

var train = async (req, res) => {
    var train_data = data_predict.train();
    res.status(200).json(train_data);
}
router.get('/train', train);

router.get('/data_get', dataGet);

module.exports = router;