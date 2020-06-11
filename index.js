const express = require('express');
const bodyparser = require('body-parser');
const bcrypt = require('bcrypt');
var cors = require('cors')
const app = express();
const nodemailer = require("nodemailer");

app.use(cors());

app.use(bodyparser.json()) //middle ware 
app.use(bodyparser.urlencoded({ extended: true }));

app.options("/*", function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.sendStatus(200);
});

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});



app.post('/contact', function (req, res) {
    console.log(req.body);
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'ramya.info19@gmail.com',
            pass: 'RamyaInfo@19'
        }
    });

    var mailOptions = {
        from: 'ramya.info19@gmail.com',
        to: req.body.email + ",ramya.btech19@gmail.com",
        subject: 'Automatic mail recived notification',
        text: 'Hi ' + req.body.name + '  I will get back to you ASAP\n Message:' + req.body.msg
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.json(
                {
                    message: "failed"
                }
            )
        } else {
            console.log('Email sent: ' + info.response);
            res.json({
                message: "sent"
            })
        }
    });

});


app.listen(3000, function () {
    console.log("port is running")
});