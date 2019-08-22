const mysql = require('mysql');
const con = mysql.createConnection({
    host: "localhost",
    user: "",
    password: "",
    database: "test"
});

exports.DataProcessing = (lat, lng, wtemp, temp, humidity, date, time) => {
    var fire_status;
    if (temp >= 40 && temp <= 45) {
        fire_status = 2;
    }
    else if (temp >= 50) {
        fire_status = 3;
    }
    else {
        fire_status = 1;
    }
    insert(lat, lng, wtemp, temp, humidity, date, time, fire_status);
}

function insert(lat, lng, wtemp, temp, humidity, date, time, fire_status) {
    con.connect(function (err) {
        // if (err) throw err;
        console.log("Connected!");
        var sql = `INSERT INTO fire_data_processed (lat,lng,wtemp,temp,humidity,date,time,fire_status) VALUES ('${lat}','${lng}','${wtemp}','${temp}','${humidity}','${date}','${time}','${fire_status}')`;
        con.query(sql, function (err, result) {
            // if (err) throw err;

            //DataProcessing();
        });

    });
}