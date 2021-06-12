const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const anggotaTimSchema = new Schema({
    namaAnggota:{
        type: String,
        // required: [true, 'Name field is required']
    },
    NIM:{
        type: String,
    },
    email:{
        type: String,
    }
});

//create ninja schema n model
const TicketSchema = new Schema({
    namaKegiatan:{
        type: String,
        required: [true, 'Name field is required']
    },
    jenisLomba:{
        type: String
    },
    skalaKegiatan:{
        type: String
    },
    prestasiYgDicapai:{
        type: String
    },
    anggotaTim:anggotaTimSchema,
    penyelenggara:{
        namaPenyelenggara:{
            type: String,
            // required: [true, 'Name field is required']
        },
        linkWebsite:{
            type: String,
        },
        linkMedsos:{
            type: String,
        }
    },
    jumlahTimPeserta:{
        type: String
    },
    jumlahUniversitas:{
        type: String
    },
    tanggalPelaksanaan:{
        type: String
    },
    berkasPendukung:{
        type: String
    },
    suratIzinAkademik:{
        type: String
    }

});

const Ticket = mongoose.model('ticket', TicketSchema);

module.exports = Ticket;