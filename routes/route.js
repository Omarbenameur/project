const express = require("express");
const { signUp, login, getUser } = require("../controllers/user.controllers");
const { signUpRules, validator } = require("../middelware/validator");
const auth = require("../middelware/auth");

router = express.Router();
router.post("/signUp", signUpRules(), validator, signUp);
router.post("/login", login);
router.get("/get", auth, getUser);

module.exports = router;
