const express = require("express");
const router = express.Router();

const {
    pageAdminDatos,
    pageAdminClientes,
    pageAdminReservas,
    pageAdminConsultas,
    listaClientesAdmin,
    eliminarClientesAdmin,
} = require("../controllers/adminControllers");

router.get("/admin", pageAdminDatos);
router.get("/adminclientes", pageAdminClientes);
router.get("/adminreservas", pageAdminReservas);
router.get("/adminconsultas", pageAdminConsultas);

router.put("/adminlistaclientes", listaClientesAdmin);
router.delete("/admindeleteclient", eliminarClientesAdmin);

module.exports = router;
