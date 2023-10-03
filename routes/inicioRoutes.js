const express = require("express");
const router = express.Router();

const pageInicio = require("../controllers/inicioControllers");

router.get("/", pageInicio);

module.exports = router;

