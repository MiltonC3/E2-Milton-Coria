const express = require("express");
const router = express.Router();

const { pageClient, pageAdmin } = require("../controllers/userControllers");

router.get("/client", pageClient);

router.get("/admin", pageAdmin);

module.exports = router;
