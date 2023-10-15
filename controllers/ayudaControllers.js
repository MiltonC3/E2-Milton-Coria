// Aqui renderizo la pagina de ayuda al entrar en el enlace /ayuda

const pageAyuda = (req, res) => {
    const pageTitle = "Ayuda - Cabañas Bello Atardecer";

    res.render("ayuda", { title: pageTitle, showFooter: true });
};

// ruta GET - /ayuda
module.exports = pageAyuda;
