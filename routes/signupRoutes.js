const express = require("express");
const router = express.Router();

const { pageSignup, userSignup } = require("../controllers/signupControllers");

router.get("/signup", pageSignup);

router.post("/signup", userSignup);

module.exports = router;
