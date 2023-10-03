const express = require("express");
const router = express.Router();

const pageAyuda = require("../controllers/ayudaControllers");

router.get("/ayuda", pageAyuda);

module.exports = router;
