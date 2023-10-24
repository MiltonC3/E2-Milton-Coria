const express = require("express");
const router = express.Router();

const {
    pageAdminDatos,
    pageAdminClientes,
    adminListaClientes,
    guardarDatosAdmin,
    deleteAdminClientes,
    pageAdminReservas,
    pageAdminConsultas,
} = require("../controllers/adminControllers");

router.get("/admin", pageAdminDatos);
router.get("/adminclientes", pageAdminClientes);
router.put("/adminlistaclientes", adminListaClientes);
router.get("/adminreservas", pageAdminReservas);
router.get("/adminconsultas", pageAdminConsultas);

router.put('/adminguardardatos', guardarDatosAdmin)

router.delete("/admindeleteclient", deleteAdminClientes);

module.exports = router;
