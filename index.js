const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//setup express app
const app = express();

mongoose.connect('mongodb://localhost/insentif');
mongoose.Promise = global.Promise;

app.use(express.static('public'));

app.use(bodyParser.json());

app.use('/api', require('./routes/api'));

app.use(function(err,req,res,next){
    // console.log(err);
    res.status(422).send({error: err.message});
});

//listen for requests
app.listen(process.env.port||4000,function(){
    console.log('now listening for requests');
});
