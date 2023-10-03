const express = require("express");
const router = express.Router();

const userSignout = require("../controllers/signoutControllers");

router.post("/signout", userSignout);

module.exports = router;