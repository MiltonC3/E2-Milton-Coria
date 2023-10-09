function menu(name, user) {
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
}

// esta funcion tiene como tarea distinguir en cada pagina con un color distinto del texto en el nav para que sea mas interactivo
function activeMenu(nav1, nav2, nav3, nav4, nav5) {
    const navUno = document.getElementById(nav1);
    const navDos = document.getElementById(nav2);
    const navTres = document.getElementById(nav3);
    const navCuatro = document.getElementById(nav4);
    const navCinco = document.getElementById(nav5);

    var rutaRelativa = window.location.pathname;

    rutaRelativa === `/` ? navUno.classList.add("header__a--active") : "";
    rutaRelativa === `/${nav2}`
        ? navDos.classList.add("header__a--active")
        : "";
    rutaRelativa === `/${nav3}`
        ? navTres.classList.add("header__a--active")
        : "";
    rutaRelativa === `/${nav4}`
        ? navCuatro.classList.add("header__a--active")
        : "";
    rutaRelativa === `/${nav5}`
        ? navCinco.classList.add("header__a--active")
        : "";
}

// aqui llamo la funcion para que en cada pagina se realize lo pedido de distinguir en el nav en la ruta que me encuentro
activeMenu("inicio", "reservar", "ayuda", "signin", "signup");

// Y despues con el fetch interactuo con el servidor recibiendo cosas
fetch("/userFront", {
    method: "GET",
})
    .then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Error al realizar la solicitud");
        }
    })
    .then((data) => {
        if (data.login !== undefined) {
            // Aqui mediante el modulo userFront que como res tenia login, entonces aqui lo recibo y lo guardo en el local storage para que persistan los datos
            localStorage.setItem("user", JSON.stringify(data));

            // Al local storage lo guardo en una constante y asi condicionar en ella
            const storage = JSON.parse(localStorage.getItem("user"));

            // Analiza si el usuario ingresado es un cliente cambiara el menu y el enlace que llevara a la pagina cliente, en el caso que sea admin llevara a la pagina amdin desde el cliente
            if (
                storage.login.correo !== "" &&
                storage.login.correo !== "miltoncoria03@gmail.com"
            ) {
                menu(storage.login.nombre, "client");

                activeMenu("inicio", "reservar", "ayuda", "client", "signout");
            } else if (storage.login.correo === "miltoncoria03@gmail.com") {
                menu(storage.login.nombre, "admin");

                activeMenu("inicio", "reservar", "ayuda", "admin", "signout");
            }
        } else {
            // si no se encuentra ningun usuario en la data que recibo de la db, vacio el local storage, para que asi tambien cuando le de en signout borre el local storage y cumpla la funcion de cerrar sesion
            localStorage.clear();
        }
    })
    .catch((error) => {
        console.error("Error:", error);
    });
