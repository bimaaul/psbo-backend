// const { response } = require('express')
const Employee = require('../models/Employee')

//show list
const index = (req, res, next) =>{
    Employee.find()
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error=>{
        res.json({message: 'Error Occured'})
    })
}

//show single employee
const show = (req, res, next) => {
    let employeeID = req.body.employeeID
    Employee.findById(employeeID)
    .then(response=>{
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            message: 'Error Occured'
        })
    })
}

// add an employee
const store = (req, res, next) => {
    let employee = new Employee({
        namaKegiatan: req.body.namaKegiatan,
        jenisLomba: req.body.jenisLomba,
        skalaKegiatan: req.body.skalaKegiatan,
        prestasi: req.body.prestasi,
        anggotaTim: req.body.anggotaTim,
        penyelenggara: req.body.penyelenggara,
        linkWeb: req.body.linkWeb,
        linkMedsos: req.body.linkMedsos,
        jumlahTim: req.body.jumlahTim,
        jumlahUniv: req.body.jumlahUniv,
        tanggalPelaksanaan: req.body.tanggalPelaksanaan,
        status: req.body.status,
    })
    if(req.file){
        employee.sertifikat= req.file.path,
        employee.foto= req.file.path,
        employee.loa= req.file.path,
        employee.suratIzin= req.file.path
    }
    employee.save()
    .then(response => {
        res.json({
            message: 'Ticket added succesfully'
        })
    })
    .catch(error=>{
        res.json({
            message: 'Error occured'
        })
    })
}

//update an employee
const update = (req,res,next)=>{
    let employeeID = req.body.employeeID

    let updatedData = {
        namaKegiatan: req.body.namaKegiatan,
        jenisLomba: req.body.jenisLomba,
        skalaKegiatan: req.body.skalaKegiatan,
        prestasi: req.body.prestasi,
        anggotaTim: req.body.anggotaTim,
        penyelenggara: req.body.penyelenggara,
        linkWeb: req.body.linkWeb,
        linkMedsos: req.body.linkMedsos,
        jumlahTim: req.body.jumlahTim,
        jumlahUniv: req.body.jumlahUniv,
        tanggalPelaksanaan: req.body.tanggalPelaksanaan,
        status: req.body.status,
    }

    Employee.findByIdAndUpdate(employeeID, {$set: updatedData})
    .then(()=>{
        res.json({
            message: 'Ticket updated'
        })
    })
    .catch(error => {
        res.json({
            message: 'Error occured'
        })
    })
}

//delete an employee
const destroy = (req, res, next)=>{
    let employeeID = req.body.employeeID
    Employee.findByIdAndRemove(employeeID)
    .then(()=>{
        res.json({
            message: 'Ticket deleted'
        })
    })
    .catch(error =>{
        res.json({
            message: 'Error occured'
        })
    })
}

module.exports = {
    index, show, store, update, destroy
}