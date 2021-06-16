const Admin = require('../models/Admin')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const register = (req, res, next) =>{
    bcrypt.hash(req.body.password, 10, function(err, hashedPass){
        if(err){
            res.json({
                error: err
            })
        }
        let admin = new Admin({
            nama: req.body.nama,
            email: req.body.email,
            password: hashedPass
        })
        admin.save()
        .then(admin=>{
            res.json({
                message: 'Admin added!'
            })
        })
        .catch(error=>{
            res.json({
                message: 'Error occured'
            })
        })
    })
}

const login = (req, res, next) =>{
    var username = req.body.username
    var password = req.body.password
    

    User.findOne({$or: [{email:username}, {phone:username}]})
    .then(user=>{
        if(user){
            bcrypt.compare(password, user.password, function(err, result){
                if(err){
                    res.json({
                        error: err
                    })
                }
                if(result){
                    let token = jwt.sign({nama: user.nama}, 'wcUm00m', {expiresIn: '1h'})
                    res.json({
                        message: 'logged in succesfully',
                        token,
                        user
                    })
                }else{
                    res.json({
                        message: 'Wrong password'
                    })
                }
            })
        }else{
            res.json({
                message: 'No user found'
            })
        }
    })
}

module.exports = {
    register, login
}