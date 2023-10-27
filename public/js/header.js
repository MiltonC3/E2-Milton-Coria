const menu = (name, user) => {
    const navUl = document.getElementById("nav");

    // aqui renderizo el nav con los parametros que indique la funcion para la interfaz de usuario
    navUl.innerHTML = `
<li class="header__li">
    <a id="inicio" href="/" class="header__a">Inicio</a>
</li>
<li class="header__li">
    <a id="reservar" href="/reservar" class="header__a">Reservar</a>
</li>
<li class="header__li">
    <a id="ayuda" href="/ayuda" class="header__a">Ayuda</a>
</li>
<li class="header__li li-btnUno">
    <a id="${user}" href="/${user}" class="header__a">${name}</a>
</li>
<li class="header__li li-btnDos">
    <button id="signout" onclick="alertSignOut()" class="header__a--btn">Cerrar sesión</button>
</li>`;
};

// esta funcion tiene como tarea distinguir en cada pagina con un color distinto del texto en el nav para que sea mas interactivo
const activeMenu = (nav4, nav5) => {
    const navUno = document.getElementById("inicio");
    const navDos = document.getElementById("reservar");
    const navTres = document.getElementById("ayuda");
    const navCuatro = document.getElementById(nav4);
    const navCinco = document.getElementById(nav5);

    var rutaRelativa = window.location.pathname;

    rutaRelativa === "/" ? navUno.classList.add("header__a--active") : "";
    rutaRelativa === "/reservar"
        ? navDos.classList.add("header__a--active")
        : "";
    rutaRelativa === "/ayuda" ? navTres.classList.add("header__a--active") : "";
    rutaRelativa === `/${nav4}`
        ? navCuatro.classList.add("header__a--active")
        : "";
    rutaRelativa === `/${nav5}`
        ? navCinco.classList.add("header__a--active")
        : "";
};