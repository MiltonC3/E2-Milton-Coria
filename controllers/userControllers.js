// Aqui renderizo la pagina de ayuda al entrar en el enlace /cleint
const pageClient = (req, res) => {
    const pageTitle = "Bienvenido Cliente - Cabañas Bello Atardecer";

    res.render("client", { title: pageTitle });
};

// Aqui renderizo la pagina de ayuda al entrar en el enlace /cleint
const pageAdmin = (req, res) => {
    const pageTitle = "Bienvenido Administrador - Cabañas Bello Atardecer";

    res.render("admin", { title: pageTitle });
};

// exportando como modulo pageClient para que la ruta /client lo reciba en el archivo userRoutes y pageAdmin en la ruta /admin
module.exports = { pageClient, pageAdmin };