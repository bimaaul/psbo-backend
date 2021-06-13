const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');

//setup express app
const app = express();

mongoose.connect('mongodb://localhost/insentif', { useCreateIndex: true });
mongoose.Promise = global.Promise;

app.use(express.static('index.ejs'));
app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());



app.use('/api', require('./routes/api'));

app.use(function(err,req,res,next){
    // console.log(err);
    res.status(422).send({error: err.message});
});

//listen for requests
app.listen(process.env.port||4000,function(){
    console.log('now listening for requests');
});
