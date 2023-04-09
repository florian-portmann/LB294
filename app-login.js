// AGPL Lizenz
// #####################################################
// programmed (by) =>	{ 🔥🔥🔥 Almir Ajradini 🔥🔥🔥 }
// #####################################################
// 17.05.2022 @ BBBaden
//

const express = require("express");
const http = require("http");
const fs = require("fs");
const cors = require("cors");
var path = require("path");
const jwt = require("jsonwebtoken");
const app = express();

const port = 8080;

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./client/")); // for parsing application/x-www-form-urlencoded

app.use(cors());

function auth(req, res) {
  try {
    const token = req.body.token;
    const jwtData = jwt.verify(token, "mySuperSecretKey");
    if (jwtData) {
      Authentication = true;
      return res.json({
        err: false,
        msg: "authorization complete",
      });
    }
  } catch (error) {
    Authentication = false;
    return res.json({
      err: true,
      msg: "authorization error",
    });
  }
}

const loginController = require("./controller/00_LoginController");

// ========================================= Zugangspunkte ====================================================

app.get("/info", (req, res) => {
  res.send({
    Author: "Florian Portmann",
    Name: "LB-294",
    Company: "Student",
  });
});

app.post("/login", loginController.login);

// ========================================= Register/Login ===================================================
// ======================================== Start Server ======================================================

app.listen(port, () => {
  console.log(`API listening @ http://localhost:${port}`);
});
