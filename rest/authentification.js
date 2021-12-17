
const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const authentification_controller = require("../service/authentification_controller");

//account maken
router.post("/register",authentification_controller.register)
//aanmelden
router.post("/signin", authentification_controller.login)

module.exports = router;