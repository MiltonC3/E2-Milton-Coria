const express = require("express");
const router = express.Router();
const fs = require("fs");

const { pageSignin, userSignin, userFront } = require("../controllers/signinControllers");

router.get("/signin", pageSignin, userSignin);

router.post("/signin", userSignin);

router.get("/userFront", userFront);

module.exports = router;
