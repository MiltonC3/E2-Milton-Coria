// Tiene la funcion de cuando el usuario quiera cerrar sesion le salga un alert personalizado de confirmacion y le de la solicitud al servidor de cerrar sesion
function alertSignOut() {
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
                method: "GET",
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
}
