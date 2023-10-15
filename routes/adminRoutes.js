const express = require("express");
const router = express.Router();

const {
    pageAdmin,
    pageAdminClientes,
    deleteAdminClientes,
    pageAdminReservas,
    pageAdminConsultas,
} = require("../controllers/adminControllers");

router.get("/admin", pageAdmin);
router.get("/adminclientes", pageAdminClientes);
router.get("/adminreservas", pageAdminReservas);
router.get("/adminconsultas", pageAdminConsultas);

router.post("/admindeleteclient", deleteAdminClientes);

module.exports = router;
