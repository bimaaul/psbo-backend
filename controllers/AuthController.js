require("dotenv").config();

const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = (req, res, next) => {
  bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
    if (err) {
      res.json({
        error: err,
      });
    }
    let user = new User({
      nama: req.body.nama,
      email: req.body.email,
      phone: req.body.phone,
      nim: req.body.nim,
      fakultas: req.body.fakultas,
      departemen: req.body.departemen,
      noRekening: req.body.noRekening,
      password: hashedPass,
    });
    user
      .save()
      .then((user) => {
        res.json({
          message: "User added!",
        });
      })
      .catch((error) => {
        res.json({
          message: "Error occured",
        });
      });
  });
};

const login = (req, res, next) => {
  var username = req.body.username;
  var password = req.body.password;

  User.findOne({ $or: [{ email: username }, { phone: username }] }).then((user) => {
    if (user) {
      bcrypt.compare(password, user.password, function (err, result) {
        if (err) {
          res.json({
            error: err,
          });
        }
        if (result) {
          let token = jwt.sign({ nama: user.nama }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "24h" });
          res.json({
            message: "logged in succesfully",
            token,
            user: {
              isAdmin: user.isAdmin,
              id: user._id,
              nama: user.nama,
              email: user.email,
              phone: user.phone,
              nim: user.nim,
              fakultas: user.fakultas,
              noRekening: user.noRekening,
            },
          });
        } else {
          res.json({
            message: "Wrong password",
          });
        }
      });
    } else {
      res.json({
        message: "No user found",
      });
    }
  });
};

module.exports = {
  register,
  login,
};
