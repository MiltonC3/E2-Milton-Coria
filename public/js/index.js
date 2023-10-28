menu("signin", "signup", "signin", "signup", "Iniciar sesión", "Crear cuenta");
activeMenu("signin", "signup");

// Y despues con el fetch interactuo con el servidor recibiendo cosas
fetch("/userFront", {
    method: "GET",
})
    .then((response) => response.json())
    .then((data) => {
        if (data.login) {
            // Aqui mediante el modulo userFront que como res tenia login, entonces aqui lo recibo y lo guardo en el local storage para que persistan los datos
            if (localStorage.getItem("userActualizado") === null) {
                localStorage.setItem("user", JSON.stringify(data));
            }

            // Al local storage lo guardo en una constante y asi condicionar en ella
            const storage =
                localStorage.getItem("userActualizado") === null
                    ? JSON.parse(localStorage.getItem("user"))
                    : JSON.parse(localStorage.getItem("userActualizado"));

            // Analiza si el usuario ingresado es un cliente cambiara el menu y el enlace que llevara a la pagina cliente, en el caso que sea admin llevara a la pagina amdin desde el cliente
            if (storage.login.user) {
                menu(
                    storage.login.user,
                    "signout",
                    storage.login.user,
                    "",
                    storage.login.nombre,
                    "Cerrar sesión"
                );

                storage.login.user === "admin"
                    ? activeMenu("admin", "signout")
                    : activeMenu("client", "signout");

                btnCerrarSesion();
            }
        } else {
            // si no se encuentra ningun usuario en la data que recibo de la db, vacio el local storage, para que asi tambien cuando le de en signout borre el local storage y cumpla la funcion de cerrar sesion
            localStorage.clear();
        }
    })
    .catch((error) => {
        console.error("Error:", error);
    });
