const mongoose = require('mongoose')
const Schema = mongoose.Schema

const employeeSchema = new Schema({
    namaKegiatan: {
        type: String,
        required: [true, 'Nama kegiatan tidak boleh kosong!']
    },
    jenisLomba: {
        type: String
    },
    skalaKegiatan: {
        type: String
    },
    prestasi: {
        type: String
    },
    anggotaTim: {
        type: String
    },
    penyelenggara: {
        type: String
    },
    linkWeb: {
        type: String
    },
    linkMedsos: {
        type: String
    },
    jumlahTim: {
        type: String
    },
    jumlahUniv: {
        type: String
    },
    tanggalPelaksanaan: {
        type: String
    },
    sertifikat: {
        type: String
    },
    foto: {
        type: String
    },
    loa: {
        type: String
    },
    suratIzin: {
        type: String
    },
    status: {
        type: String,
        default: 'Pending'
    }
}, {timestamps: true})

const Employee = mongoose.model('Employee', employeeSchema)
module.exports = Employee

