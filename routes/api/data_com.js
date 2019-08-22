const express = require('express');
const mysql = require('mysql');
const weather = require('weather-js');
const DM = require('../../AI/dataManage');

var router = express.Router();
var time = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });
var date = new Date().getDate() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getFullYear();
// var return_data = [
//     { lat: "21.99277", lng: "96.09539", temp: "40", fire_status: 2, date: "19/8/2019" },
//     { lat: "21.77777", lng: "96.55555", temp: "55", fire_status: 3, date: "20/8/2019" },
//     { lat: "21.77777", lng: "96.55555", temp: "28", fire_status: 1, date: "20/8/2019" },
//     { lat: "21.77777", lng: "96.55555", temp: "60", fire_status: 3, date: "20/8/2019" },
//     { lat: "21.77777", lng: "96.55555", temp: "39", fire_status: 1, date: "20/8/2019" },
//     { lat: "21.77777", lng: "96.55555", temp: "42", fire_status: 2, date: "20/8/2019" },
//     { lat: "21.77777", lng: "96.55555", temp: "75", fire_status: 3, date: "20/8/2019" },
//     { lat: "21.77777", lng: "96.55555", temp: "26", fire_status: 1, date: "20/8/2019" },
//     { lat: "21.77777", lng: "96.55555", temp: "85", fire_status: 3, date: "20/8/2019" },
//     { lat: "21.77777", lng: "96.55555", temp: "32", fire_status: 1, date: "20/8/2019" },
//     { lat: "21.77777", lng: "96.55555", temp: "35", fire_status: 1, date: "20/8/2019" },
// ];

const con = mysql.createConnection({
    host: "localhost",
    user: "",
    password: "",
    database: "efap"
});


// weather.find({ search: 'Mandalay, MM', degreeType: 'C' }, function (err, result) {
//     if (err) console.log(err);
//     //var result = JSON.stringify(result, null, 1);
//     //console.log(result[0].current.temperature);
//     setTimeout(() => { getWeatherData(result[0].current.temperature), 1000 });
// });

//console.log("Wdata ->" + wData);



var dataIn = async (req, res) => {
    var data = req.body;
    con.connect(function (err) {
        // if (err) throw err;
        console.log("Connected!");
        var sql = `INSERT INTO fire_data (lat,lng,wtemp,temp,humidity,date,time) VALUES ('${data.lat}','${data.lng}','32','${data.temp}','${data.humidity}','${date}','${time}')`;
        con.query(sql, function (err, result) {
            // if (err) throw err;
            res.status(201).send({ data });
            DM.DataProcessing(data.lat, data.lng, '32', data.temp, data.humidity, date, time);
        });

    });

}
router.post('/data_in', dataIn);

var dataGet = async (req, res) => {
    con.connect(function (err) {
        //if (err) throw err;
        con.query("SELECT * FROM fire_data_processed WHERE date LIKE '" + date + "'", function (err, result, fields) {
            // if (err) throw err;
            res.status(200).json({ return_data: result });
        });
    });
    //res.status(200).json({ return_data });
    console.log("Called from android");
}
router.get('/data_get', dataGet);

var dataHistory = async (req, res) => {
    var req_date = req.params.date;
    con.connect(function (err) {

        //if (err) throw err;
        con.query("SELECT * FROM fire_data_processed WHERE date LIKE '" + req_date + "'", function (err, result, fields) {
            // if (err) throw err;
            res.status(200).json({ return_data: result });
        });
    });
    //res.status(200).json({ return_data });
    console.log("Called from android");
}
router.get('/get_history/:date', dataHistory);

// var train = async (req, res) => {
//     //var train_data = data_predict.train();
//     var result = ml.networkTrain();
//     res.status(200).json(result);
// }
// router.get('/train', train);

// var predict = async (req, res) => {
//     var result = ml.prediction(req.body);
//     res.status(200).json(result);
// }
// router.post('/predict', predict);

module.exports = router;