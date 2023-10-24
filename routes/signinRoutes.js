const express = require("express");
const router = express.Router();
const fs = require("fs");

const {
    pageSignin,
    userSignin,
    userFront,
    userOut,
    pagePassRecover,
    userPass,
} = require("../controllers/signinControllers");

router.get("/signin", pageSignin);
router.post("/signin", userSignin);
router.delete("/signout", userOut);

router.get("/userFront", userFront);

router.get('/recoverpass', pagePassRecover)
router.put('/recoverpass', userPass)

module.exports = router;
