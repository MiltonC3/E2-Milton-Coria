const express = require("express");
const router = express.Router();
const fs = require("fs");

const {
    pageSignin,
    userSignin,
    userFront,
    userOut,
} = require("../controllers/signinControllers");

router.get("/signin", pageSignin);

router.post("/signin", userSignin);

router.get("/userFront", userFront);

router.get("/signout", userOut);

module.exports = router;
