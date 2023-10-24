// Tiene la funcion de cuando el usuario quiera cerrar sesion le salga un alert personalizado de confirmacion y le de la solicitud al servidor de cerrar sesion
const alertSignOut = () => {
    Swal.fire({
        title: "Estás cerrando sesión?",
        text: "",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Confirmar",
        cancelButtonText: "Cancelar",
    }).then((result) => {
        if (result.isConfirmed) {
            fetch("/signout", {
                method: "DELETE",
            });

            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Tus datos fueron guardados correctamente",
                showConfirmButton: false,
                timer: 1500,
            });

            setTimeout(function () {
                window.location.href = "/";
            }, 1700);
        }
    });
};

const inputMisDatos = (paramUser) => {
    const btnAdminNombre = document.getElementById(`btn-${paramUser}-nombre`);
    const btnAdminUbicacion = document.getElementById(
        `btn-${paramUser}-ubicacion`
    );
    const btnAdminTelefono = document.getElementById(
        `btn-${paramUser}-telefono`
    );
    const btnAdminCorreo = document.getElementById(`btn-${paramUser}-correo`);

    btnAdminNombre.onclick = () => {
        guardarMisDatos("nombre", paramUser);
    };
    btnAdminUbicacion.onclick = () => {
        guardarMisDatos("ubicacion", paramUser);
    };
    btnAdminTelefono.onclick = () => {
        guardarMisDatos("telefono", paramUser);
    };
    btnAdminCorreo.onclick = () => {
        guardarMisDatos("correo", paramUser);
    };
};
const guardarMisDatos = (paramInput, paramTypeUser) => {
    const paramNuevo = document.getElementById(
        `${paramInput}-${paramTypeUser}`
    ).value;

    const usuario =
        localStorage.getItem("userActualizado") === null
            ? JSON.parse(localStorage.getItem("user"))
            : JSON.parse(localStorage.getItem("userActualizado"));

    const paramUsuario =
        paramInput === "nombre"
            ? usuario.login.nombre
            : paramInput === "ubicacion"
            ? usuario.login.ubicacion
            : paramInput === "telefono"
            ? usuario.login.telefono
            : paramInput === "correo"
            ? usuario.login.correo
            : "";
    const id = usuario.login._id;

    if (paramNuevo !== paramUsuario) {
        localStorage.clear();

        fetch(`/${paramTypeUser}guardardatos`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json", // Tipo de contenido de los datos
            },
            body: JSON.stringify({
                tipo: paramInput,
                param: paramNuevo,
                id: id,
            }),
        })
            .then((response) => response.json())
            .then(async (data) => {
                await localStorage.setItem(
                    "userActualizado",
                    JSON.stringify({ login: data })
                );
            })
            .then((result) => {
                if (paramInput === "correo" && paramTypeUser === "admin") {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `Tu correo fue cambiado, por lo tanto ya no sos administrador`,
                        showConfirmButton: false,
                        timer: 1500,
                    });

                    setTimeout(() => {
                        window.location.href = "/";
                    }, 1500);
                } else {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `Tus datos fueron actualizados correctamente`,
                        showConfirmButton: false,
                        timer: 1500,
                    });

                    setTimeout(() => {
                        window.location.reload();
                    }, 1500);
                }
            })
            .catch((error) => console.error(error));
    } else {
    }
};
