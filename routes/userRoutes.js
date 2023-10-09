const express = require("express");
const router = express.Router();

const {
    pageClient,
    pageAdmin,
    pageAdminClientes,
    deleteAdminClientes,
    pageAdminReservas,
    pageAdminConsultas,
} = require("../controllers/userControllers");

router.get("/client", pageClient);
router.get("/admin", pageAdmin);
router.get("/adminclientes", pageAdminClientes);
router.get("/adminreservas", pageAdminReservas);
router.get("/adminconsultas", pageAdminConsultas);

router.post("/admindeleteclient", deleteAdminClientes);

module.exports = router;
