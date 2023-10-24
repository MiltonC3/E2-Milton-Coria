// Aqui renderizo la pagina de ayuda al entrar en el enlace /reservar
const { client, ObjectId } = require("../database/conexion");

const pageReservar = (req, res) => {
    const pageTitle = "Reservar - Cabañas Bello Atardecer";

    res.render("reservar", { title: pageTitle, showFooter: true });
};

// ruta GET - /reservar
module.exports = pageReservar;
