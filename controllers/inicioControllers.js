const pageInicio = (req, res) => {

    const pageTitle = "Cabañas Bello Atardecer - Ojo de Agua, Sgo del Estero";
    const divPortada = `<div class="background">
    <img
      src="./assets/icon/logo.svg"
      alt="logo inicio"
      class="background__img"
    />
</div>`;

    const btnNav = `
<li class="header__li">
    <a href="/" class="header__a header__a--active">Inicio</a>
</li>
<li class="header__li">
    <a href="/reservar" class="header__a">Reservar</a>
</li>
<li class="header__li">
    <a href="/ayuda" class="header__a">Ayuda</a>
</li>
<li class="header__li li-signin">
    <a href="/signin" class="header__a">Sign In</a>
</li>
<li class="header__li li-signup">
    <a href="/signup" class="header__a">Sign Up</a>
</li>`;

    res.render("index", { title: pageTitle, portada: divPortada, btnNav: btnNav });
};

module.exports = pageInicio;
