var express = require('express');
var app = express(); //Global express app variable
var bodyParser = require('body-parser');
var path = require('path');
var nodemailer = require('nodemailer');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());




app.use(express.static(path.join(__dirname + '/temp1')));
app.set('view engine', 'ejs'); //Sets variables for express app
app.set('views', path.join(__dirname + '/temp1'));

app.use(function (req, res, next) {
    console.log(`${req.method} request for '${req.url}' - ${JSON.stringify}`);
    next();
});

app.get('/', function (req, res) {
    res.render('index');
});

app.post('/contact.html', function (req, res) {
    console.log(req.body);
    // create reusable transport method (opens pool of SMTP connections)
    var smtpTransport = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "nodeapp16@gmail.com",
            pass: "testtest123"
        }
    });

    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: req.body.email, // sender address
        to: "nodeapp16@gmail.com", // list of receivers
        subject: "You have been contacted by " + req.body.name, // Subject line
        text: "You have been contacted by " + req.body.name + 
        "Their additional message is as follows." + req.body.comments, // html body
        replyTo: req.body.email
    }

    // send mail with defined transport object
    smtpTransport.sendMail(mailOptions, function (error, response) {
        if (error) {
            console.log(error);
        } else {
            res.end();
            console.log("Message sent: " + response.response);
        }

        // if you don't want to use this transport object anymore, uncomment following line
        //smtpTransport.close(); // shut down the connection pool, no more messages
    });
});

var server = app.listen(3000, function () {
    console.log('Running');
});

//nodeapp16@gmail.com
//testtest123