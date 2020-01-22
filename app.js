var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');

//make connection to db
mongoose.connect('mongodb://localhost:27017/demoapi',{useNewUrlParser:true})
.then(()=>console.log('connected to db'))
.catch((error)=>console.log('connection error',error));

//inti app
var app =  express();

//fetch data from the request 
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
require('./config/passport');

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

app.use('/',require('./routes/user'));

var port = process.env.PORT || 3000;
app.listen(port,()=>console.log('server run at '+port));