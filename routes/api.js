const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const app = express();
const Ticket = require('../models/ticket');
const upload = require('../middleware/upload');
const path = require('path');
const cypto = require('crypto');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');

const mongoose = require('mongoose');

//middleware
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.set('view angine', 'ejs');

const conn = mongoose.createConnection('mongodb://localhost/insentif');

let gfs;

conn.once('open', () => {
    // Init stream
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
  });

// Create storage engine
const storage = new GridFsStorage({
    url: 'mongodb://localhost/insentif',
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = buf.toString('hex') + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: 'uploads'
          };
          resolve(fileInfo);
        });
      });
    }
  });
//   const upload = multer({ storage });

//get a listof ninjas from db
router.get('/tickets',function(req,res,next){
    Ticket.find({}).then(function(tickets){
        res.send(tickets);
    })
});

//add a new ninja to the db
router.post('/tickets', function(req,res,next){
    Ticket.create(req.body).then(function(ticket){
        res.send(ticket);
    }).catch(next);
    if(req.file){
        Ticket.berkasPendukung = req.file.path;
    }
});

//update a ninja in the db
router.put('/tickets/:id',function(req,res,next){
    Ticket.findByIdAndUpdate({_id: req.params.id},req.body).then(function(ticket){
        Ticket.findOne({_id: req.params.id}).then(function(ticket){
            res.send(ticket);
        });
    });
});

//delete a ninja from the db
router.delete('/tickets/:id',function(req,res,next){
    Ticket.findByIdAndRemove({_id: req.params.id}).then(function(ticket){
        res.send(ticket);
    });
});

//test file
router.get('/',function(req,res){
    // res.sendFile('./home.html',{ root: __dirname });
    res.render('index.ejs');
});

// @route POST /upload
// @desc Upload file to DB
router.post('/upload', function(req,res,next){
    res.json({ file: req.file});
    // res.redirect('/');
});


//blank page
router.use('/',function(req,res){
    res.status(404);
    res.send('Blank Page <br> 404');
});

module.exports = router;