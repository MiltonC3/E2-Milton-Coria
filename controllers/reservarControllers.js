// Aqui renderizo la pagina de ayuda al entrar en el enlace /reservar

const pageReservar = (req, res) => {
    const pageTitle = "Reservar - Cabañas Bello Atardecer";

    res.render("reservar", { title: pageTitle });
};

// ruta GET - /reservar
module.exports = pageReservar;
