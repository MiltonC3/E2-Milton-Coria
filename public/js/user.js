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

const btnGuardarDatos = (user) => {
    const btnAdminNombre = document.getElementById(`btn-${user}-nombre`);
    const btnAdminUbicacion = document.getElementById(`btn-${user}-ubicacion`);
    const btnAdminTelefono = document.getElementById(`btn-${user}-telefono`);
    const btnAdminCorreo = document.getElementById(`btn-${user}-correo`);

    btnAdminNombre.onclick = () => {
        guardarDatosUsuario("nombre", user);
    };
    btnAdminUbicacion.onclick = () => {
        guardarDatosUsuario("ubicacion", user);
    };
    btnAdminTelefono.onclick = () => {
        guardarDatosUsuario("telefono", user);
    };
    btnAdminCorreo.onclick = () => {
        guardarDatosUsuario("correo", user);
    };

    const guardarDatosUsuario = (input, user) => {
        const paramNuevo = document.getElementById(`${input}-${user}`).value;

        const usuario =
            localStorage.getItem("userActualizado") === null
                ? JSON.parse(localStorage.getItem("user"))
                : JSON.parse(localStorage.getItem("userActualizado"));

        const paramUsuario =
            input === "nombre"
                ? usuario.login.nombre
                : input === "ubicacion"
                ? usuario.login.ubicacion
                : input === "telefono"
                ? usuario.login.telefono
                : input === "correo"
                ? usuario.login.correo
                : "";
        const id = usuario.login._id;

        if (paramNuevo !== paramUsuario) {
            localStorage.clear();

            fetch(`/guardardatos`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json", // Tipo de contenido de los datos
                },
                body: JSON.stringify({
                    tipo: input,
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

                    if (
                        usuario.login.user === "client" &&
                        data.user === "admin"
                    ) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: `Tus datos fueron actualizados correctamente, ya cuentas con privilegios de administrador`,
                            showConfirmButton: false,
                            timer: 1500,
                        });

                        setTimeout(() => {
                            window.location.href = "/admin";
                        }, 1500);
                    } else if (
                        usuario.login.user === "admin" &&
                        data.user === "client"
                    ) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: `Tus datos fueron actualizados correctamente, ya no sos administrador`,
                            showConfirmButton: false,
                            timer: 1500,
                        });

                        setTimeout(() => {
                            window.location.href = "/client";
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
};

const btnDeleteUser = (datos, user) => {
    const btnEliminarCuenta = document.getElementById(`btn-${user}-eliminar`);

    btnEliminarCuenta.onclick = () => {
        Swal.fire({
            title: "Estás seguro de eliminar la cuenta?",
            text: "",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirmar",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`/eliminarcuenta?parametro=${datos.login._id}`, {
                    method: "DELETE",
                });

                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Tu cuenta fue eliminada",
                    showConfirmButton: false,
                    timer: 1500,
                });

                setTimeout(function () {
                    fetch("/signout", {
                        method: "DELETE",
                    });

                    window.location.href = "/";
                }, 1700);
            }
        });
    };
};

const btnCambiarPass = (datos, user) => {
    const btnCambiarPass = document.getElementById(`btn-${user}-pass`);

    btnCambiarPass.onclick = async () => {
        await Swal.fire({
            title: "Ingresa tu nueva contraseña",
            html:
                '<input id="swal-input1" placeholder="Contraseña anterior..." class="swal2-input">' +
                '<input id="swal-input2" placeholder="Contraseña nueva..." class="swal2-input">',
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirmar",
            cancelButtonText: "Cancelar",
            preConfirm: () => {
                const passwords = {
                    passAnterior: document.getElementById("swal-input1").value,
                    passNueva: document.getElementById("swal-input2").value,
                };

                fetch("/cambiarpass", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        user: datos.login,
                        passwords: passwords,
                    }),
                })
                    .then((response) => {
                        return response.json(); // Obtener el cuerpo de la respuesta como JSON
                    })
                    .then(async (data) => {
                        if (data.estado === true) {
                            await localStorage.setItem(
                                "userActualizado",
                                JSON.stringify({ login: data.login })
                            );

                            localStorage.clear();

                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "Tu contaseña fue actualizada",
                                showConfirmButton: false,
                                timer: 1500,
                            });

                            setTimeout(function () {
                                window.location.reload();
                            }, 1700);
                        } else if (data.estado === false) {
                            Swal.fire({
                                position: "top-end",
                                icon: "error",
                                title: "Los datos que ingresaste son inválidos",
                                showConfirmButton: false,
                                timer: 1500,
                            });
                        }
                    });
            },
        });
    };
};
