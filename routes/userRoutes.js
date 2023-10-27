const express = require("express");
const router = express.Router();

const {
    guardarDatos,
    eliminarCuenta,
    cambiarPass,
} = require("../controllers/userControllers");

router.put("/guardardatos", guardarDatos);
router.put("/cambiarpass", cambiarPass);
router.delete("/eliminarcuenta", eliminarCuenta);

module.exports = router;
