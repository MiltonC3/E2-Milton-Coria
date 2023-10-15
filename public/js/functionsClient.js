function guardarNombreClient() {
    let nombreIngresado = document.getElementById("nombre-client").value;
    let usuario = localStorage.getItem("userActualizado") === null ? JSON.parse(localStorage.getItem("user")) : JSON.parse(localStorage.getItem("userActualizado"));

    let usuarioCorreo = usuario.login.correo;
    let usuarioNombre = usuario.login.nombre;

    if (nombreIngresado !== usuarioNombre) {
        localStorage.clear();

        fetch("/nombreclientsave", {
            method: "POST",
            headers: {
                "Content-Type": "application/json", // Tipo de contenido de los datos
            },
            body: JSON.stringify({
                nombre: nombreIngresado,
                correo: usuarioCorreo,
            }),
        })
            .then((response) => response.json())
            .then(async (data) => {
                await localStorage.setItem(
                    "userActualizado",
                    JSON.stringify({ login: data })
                );

                window.location.reload();
            })
            .catch((error) => console.error(error));
    } else {
        console.log("Es el mismo nombre");
    }
}
