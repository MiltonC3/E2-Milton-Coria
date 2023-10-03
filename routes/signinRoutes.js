const express = require("express");
const router = express.Router();
const fs = require("fs");

const { pageSignin, userSignin } = require("../controllers/signinControllers");

router.get("/signin", pageSignin, userSignin);

router.post("/signin", userSignin);

module.exports = router;
