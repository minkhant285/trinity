const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const host = '0.0.0.0';
const port = 3000;

app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));


var userRoute = require('./routes/api/data_com');
app.use('/fire', userRoute);
app.listen(port, host, () => {
    console.log(`Node Server listening at: ${host}:${port}`);
});

app.get('/', (req, res) => {
    console.log(req.body);
    res.status(200).json('Welcome to Node!');
});