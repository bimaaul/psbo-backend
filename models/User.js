const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    nama: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    nim: {
        type: String
    },
    fakultas: {
        type: String
    },
    departemen: {
        type: String
    },
    noRekening: {
        type: String
    },
    password: {
        type: String
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})

const User = mongoose.model('User', userSchema)
module.exports = User