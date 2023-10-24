const express = require("express");
const router = express.Router();

const { pageClient, guardarDatosClient } = require("../controllers/clientControllers");

router.get("/client", pageClient);

router.put('/clientguardardatos', guardarDatosClient)

module.exports = router;
