const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const exp = require("constants");
const cors = require("cors");
require("dotenv").config();

const EmployeeRoute = require("./routes/employee");
const AuthRoute = require("./routes/auth");

mongoose.connect(`mongodb+srv://admin-bima:${process.env.DB_KEY}@cluster0.3ypch.mongodb.net/lomba`, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on("error", (err) => {
  console.log(err);
});

db.once("open", () => {
  console.log("Database Connection Established");
});

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));

let PORT = process.env.PORT;
if (PORT == null || PORT == "") PORT = 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use("/api/employee", EmployeeRoute);
app.use("/api", AuthRoute);
