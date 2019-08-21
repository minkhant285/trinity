const express = require('express');
const data_predict = require('../../AI/fire_ml');
const ml = require('../../AI/ml');
var router = express.Router();

var dataIn = async (req, res) => {
    var data = req.body;
    var predict = data_predict.predict();
    res.status(200).json({ "data": predict });
}
router.post('/data_in', dataIn);

var dataGet = async (req, res) => {
    res.status(200).json({
        data: [{ lat: "21.99277", lng: "96.09539", temp: "45", fire_status: "warning", date: "19/8/2019" },
        { lat: "21.77777", lng: "96.55555", temp: "55", fire_status: "danger", date: "20/8/2019" }]
    });
}
router.get('/data_get', dataGet);

var train = async (req, res) => {
    //var train_data = data_predict.train();
    var result = ml.networkTrain();
    res.status(200).json(result);
}
router.get('/train', train);

var predict = async (req, res) => {
    var result = ml.prediction(req.body);
    res.status(200).json(result);
}
router.post('/predict', predict);


module.exports = router;