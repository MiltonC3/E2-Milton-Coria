// Aqui renderizo la pagina de ayuda al entrar en el enlace /
const { client, ObjectId } = require("../database/conexion");

const pageInicio = (req, res) => {
    // Aqui estoy enviando el titulo de la pagina de inicio al handellbars para que asi en cada pagina tenga un distinto titulo
    const pageTitle = "Cabañas Bello Atardecer - Ojo de Agua, Sgo del Estero";
    // Tambien estoy enviando la portada de inicio ya que asi solo el inicio tenga la portada como corresponde.
    const divPortada = `<div class="background">
    <img
      src="./assets/icon/logo.svg"
      alt="logo inicio"
      class="background__img"
    />
</div>`;
    // Aqui renderizo la pagina inicio, adicionando como objeto los constantes para que de esa forma el layout lo reciba
    res.render("index", {
        title: pageTitle,
        portada: divPortada,
        showFooter: true,
    });
};

// ruta GET - /
module.exports = pageInicio;
