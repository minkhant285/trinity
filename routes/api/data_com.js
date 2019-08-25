const express = require('express');
const mysql = require('mysql');
const weather = require('weather-js');
const DM = require('../../AI/dataManage');

var router = express.Router();
var time = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });
var date = new Date().getDate() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getFullYear();

const con = mysql.createConnection({
    host: "192.168.1.235",
    user: "root",
    password: "HelloWorld@123",
    database: "efap"
});

var dataIn = async (req, res) => {
    var data = req.body;
    con.connect(function (err) {
        // if (err) throw err;
        console.log("Connected!");
        var sql = `INSERT INTO fire_data (lat,lng,wtemp,temp,humidity,date,time) VALUES ('${data.lat}','${data.lng}','26','${data.temp}','${data.humidity}','${date}','${time}')`;
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
            res.status(200).json({ hisitory_data: result });
        });
    });
    //res.status(200).json({ return_data });
    console.log("Called from android");
}
router.get('/get_history/:date', dataHistory);

module.exports = router;