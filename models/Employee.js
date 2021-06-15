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
    anggotaTim1: {
        type: String
    },
    nim1: {
        type: String
    },
    phone1: {
        type: String
    },
    anggotaTim2: {
        type: String
    },
    nim2: {
        type: String
    },
    phone2: {
        type: String
    },
    anggotaTim3: {
        type: String
    },
    nim3: {
        type: String
    },
    phone3: {
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
    berkasPendukung: {
        type: String
    },
    // foto: {
    //     type: String
    // },
    // loa: {
    //     type: String
    // },
    // suratIzin: {
    //     type: String
    // },
    status: {
        type: String,
        default: 'Pending'
    }
}, {timestamps: true})

const Employee = mongoose.model('Employee', employeeSchema)
module.exports = Employee

