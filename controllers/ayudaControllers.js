const pageAyuda = (req, res) => {
    const pageTitle = "Ayuda - Cabañas Bello Atardecer";

    const btnNav = `
<li class="header__li">
    <a href="/" class="header__a">Inicio</a>
</li>
<li class="header__li">
    <a href="/reservar" class="header__a">Reservar</a>
</li>
<li class="header__li">
    <a href="/ayuda" class="header__a header__a--active">Ayuda</a>
</li>
<li class="header__li li-signin">
    <a href="/signin" class="header__a">Sign In</a>
</li>
<li class="header__li li-signup">
    <a href="/signup" class="header__a">Sign Up</a>
</li>`;

    res.render("ayuda", { title: pageTitle, btnNav: btnNav });
};

module.exports = pageAyuda;
