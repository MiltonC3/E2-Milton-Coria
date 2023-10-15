const express = require("express");
const router = express.Router();

const { pageClient, nombreClientSave } = require("../controllers/clientControllers");

router.get("/client", pageClient);

router.post('/nombreclientsave', nombreClientSave)

module.exports = router;
