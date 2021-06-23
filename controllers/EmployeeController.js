// const { response } = require('express')
const Employee = require("../models/Employee");

//show list
const index = (req, res, next) => {
  Employee.find()
    .then((response) => {
      res.json({
        response,
      });
    })
    .catch((error) => {
      res.json({ message: "Error Occured" });
    });
};

//show single employee
const show = (req, res, next) => {
  let employeeID = req.body.employeeID;
  Employee.findById(employeeID)
    .then((response) => {
      res.json({
        response,
      });
    })
    .catch((error) => {
      res.json({
        message: "Error Occured",
      });
    });
};

//show pengajuan user
const getPengajuanUser = (req, res, next) => {
  let userId = req.params.userId;
  Employee.find()
    .then((response) => {
      const data = response.filter((item) => item.userId === userId);
      res.json({
        data,
      });
    })
    .catch((error) => {
      res.json({
        message: "Error Occured",
      });
    });
};

// add an employee
const store = (req, res, next) => {
  let employee = new Employee({
    userId: req.body.userId,
    namaKegiatan: req.body.namaKegiatan,
    jenisLomba: req.body.jenisLomba,
    skalaKegiatan: req.body.skalaKegiatan,
    prestasi: req.body.prestasi,
    anggotaTim1: req.body.anggotaTim1,
    nim1: req.body.nim1,
    phone1: req.body.phone1,
    anggotaTim2: req.body.anggotaTim2,
    nim2: req.body.nim2,
    phone2: req.body.phone2,
    anggotaTim3: req.body.anggotaTim3,
    nim3: req.body.nim3,
    phone3: req.body.phone3,
    penyelenggara: req.body.penyelenggara,
    linkWeb: req.body.linkWeb,
    linkMedsos: req.body.linkMedsos,
    jumlahTim: req.body.jumlahTim,
    jumlahUniv: req.body.jumlahUniv,
    tanggalPelaksanaan: req.body.tanggalPelaksanaan,
    status: req.body.status,
  });
  if (req.file) {
    employee.berkasPendukung = req.file.path;
    // employee.foto= req.file.path,
    // employee.loa= req.file.path,
    // employee.suratIzin= req.file.path
  }
  employee
    .save()
    .then((response) => {
      res.json({
        message: "Ticket added succesfully",
      });
    })
    .catch((error) => {
      res.json({
        message: "Error occured",
      });
    });
};

//update an employee
const update = (req, res, next) => {
  let employeeID = req.body.employeeID;

  let updatedData = {
    status: req.body.status,
  };

  Employee.findByIdAndUpdate(employeeID, { $set: updatedData })
    .then(() => {
      res.json({
        message: "Ticket updated",
      });
    })
    .catch((error) => {
      res.json({
        message: "Error occured",
      });
    });
};

//delete an employee
const destroy = (req, res, next) => {
  let employeeID = req.body.employeeID;
  Employee.findByIdAndRemove(employeeID)
    .then(() => {
      res.json({
        message: "Ticket deleted",
      });
    })
    .catch((error) => {
      res.json({
        message: "Error occured",
      });
    });
};

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
  getPengajuanUser,
};
