const express = require("express");
const router = express.Router();

const pageReservar = require("../controllers/reservarControllers");

router.get("/reservar", pageReservar);

module.exports = router;







