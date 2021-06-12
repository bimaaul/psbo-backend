const express = require('express');
const router = express.Router();
const app = express();
const Ticket = require('../models/ticket');

//get a listof ninjas from db
router.get('/tickets',function(req,res,next){
    Ticket.find({}).then(function(tickets){
        res.send(tickets);
    })
});

//add a new ninja to the db
router.post('/tickets',function(req,res,next){
    Ticket.create(req.body).then(function(ticket){
        res.send(ticket);
    }).catch(next);
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

//home
router.get('/',function(req,res){
    res.sendFile('./home.html',{ root: __dirname });
});

//intensif
router.get('/pengajuan-insentif',function(req,res){
    res.send('intensif insensifni');
});

//blank page
router.use('/',function(req,res){
    res.status(404);
    res.send('Blank Page <br> 404');
});

module.exports = router;