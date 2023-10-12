if (window.location.pathname === "/admin") {
    fetch("/admin", {
        method: "GET",
    }).then((data) => {
        const sectionAdmin = document.getElementById("section-admin");

        const datos = JSON.parse(localStorage.getItem("user"));

        const lastFourDigits = datos.login.pass.slice(-4);

        const hiddenDigits = "*".repeat(lastFourDigits.length);

        const hiddenPassword = datos.login.pass.slice(0, -4) + hiddenDigits;

        sectionAdmin.innerHTML = `
<h1 class="admin__h1">Bienvenido Administrador</h1>
<div class="row d-flex justify-content-center m-4 mt-5">
    <div class="col-md-4 mb-2 mb-sm-0 text-center">
        <div class="card text-bg-dark">
            <div class="card-body">
                <h5 class="card-title">Nombre y Apellido</h5>
                <p class="card-text">${datos.login.nombre}</p>
                <button type="button" class="btn btn-warning client__btn m-1">Editar <i class="bi bi-pencil"></i></button>
                <button type="button" class="btn btn-outline-danger m-1">Eliminar cuenta <i class="bi bi-pencil"></i></button>
            </div>
        </div>
    </div>
    <div class="col-md-4 mb-2 mb-sm-0 text-center">
        <div class="card text-bg-dark">
            <div class="card-body">
                <h5 class="card-title">Fecha de Nacimiento</h5>
                <p class="card-text">${datos.login.nacimiento} | ${datos.login.edad} años</p>
                <button
                    type="button"
                    class="btn btn-warning client__btn m-1"
                >Editar <i class="bi bi-pencil"></i></button>
            </div>
        </div>
    </div>
</div>
<div class="row d-flex justify-content-center m-4">
    <div class="col-md-4 mb-2 mb-sm-0 text-center">
        <div class="card text-bg-dark">
            <div class="card-body">
                <h5 class="card-title">Nro de Teléfono</h5>
                <p class="card-text">${datos.login.telefono}</p>
                <button type="button" class="btn btn-warning client__btn m-1">Editar <i class="bi bi-pencil"></i></button>
            </div>
        </div>
    </div>
    <div class="col-md-4 mb-2 mb-sm-0 text-center">
        <div class="card text-bg-dark">
            <div class="card-body">
                <h5 class="card-title">Ubicacion</h5>
                <p class="card-text">${datos.login.ubicacion}</p>
                <button
                    type="button"
                    class="btn btn-warning client__btn m-1"
                >Editar <i class="bi bi-pencil"></i></button>
            </div>
        </div>
    </div>
</div>
<div class="row d-flex justify-content-center m-4">
    <div class="col-md-4 mb-2 mb-sm-0 text-center">
        <div class="card text-bg-dark">
            <div class="card-body">
                <h5 class="card-title">Correo</h5>
                <p class="card-text">${datos.login.correo}</p>
                <button type="button" class="btn btn-warning client__btn m-1">Editar <i class="bi bi-pencil"></i></button>
            </div>
        </div>
    </div>
    <div class="col-md-4 mb-2 mb-sm-0 text-center">
        <div class="card text-bg-dark">
            <div class="card-body">
                <h5 class="card-title">Contraseña</h5>
                <p class="card-text">${hiddenPassword}</p>
                <button
                    type="button"
                    class="btn btn-warning client__btn m-1"
                >Editar <i class="bi bi-pencil"></i></button>
            </div>
        </div>
    </div>
</div>`;
    });
}

if (window.location.pathname === "/adminclientes") {
    fetch("/adminclientes", {
        method: "GET",
    }).then((data) => {
        const sectionAdmin = document.getElementById("section-admin");
        const datos = JSON.parse(localStorage.getItem("user"));

        sectionAdmin.innerHTML = `
<table class="table container table-dark admin__table">
    <thead>
      <tr class="admin__tr">
        <th class="admin__th" scope="col">#</th>
        <th class="admin__th" scope="col">Nombre y Apellido</th>
        <th class="admin__th" scope="col">Edad</th>
        <th class="admin__th" scope="col">Nro de Teléfono</th>
        <th class="admin__th" scope="col">Ubicación</th>
        <th class="admin__th" scope="col">Correo</th>
        <th class="admin__th" scope="col"></th>
      </tr>
    </thead>
    <tbody id="tbody">
    </tbody>
</table>`;

        const arrayClientes = datos.listaClientes;
        const tbody = document.getElementById("tbody");

        for (let i = 0; i < arrayClientes.length; i++) {
            const newtr = document.createElement("tr");
            newtr.classList.add("admin__tr");
            newtr.classList.add(`admin-tr-${i}`);
            newtr.innerHTML = `
<th class="admin__td" scope="row">${i + 1}</th>
<td class="admin__td">${arrayClientes[i].nombre}</td>
<td class="admin__td">${arrayClientes[i].edad}</td>
<td class="admin__td">${arrayClientes[i].telefono}</td>
<td class="admin__td">${arrayClientes[i].ubicacion}</td>
<td class="admin__td">${arrayClientes[i].correo}</td>
<td>
    <button type="button" id="btn-client${i}" class="btn btn-outline-danger m-0 admin__btn"><i class=" bi bi-trash"></i></button>
</td>`;
            tbody.appendChild(newtr);

            document
                .getElementById(`btn-client${i}`)
                .addEventListener("click", (e) => {
                    Swal.fire({
                        title: "Estás seguro?",
                        text: "",
                        icon: "question",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Confirmar",
                        cancelButtonText: "Cancelar",
                    }).then((result) => {
                        if (result.isConfirmed) {
                            fetch("/admindeleteclient", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json", // Tipo de contenido de los datos
                                },
                                body: JSON.stringify({
                                    correo: arrayClientes[i].correo,
                                }),
                            })
                                .then((response) => response.json())
                                .then((data) => console.log(data))
                                .catch((error) => console.error(error));

                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: `La cuenta ${arrayClientes[i].correo} fue eliminada`,
                                showConfirmButton: false,
                                timer: 1500,
                            });

                            setTimeout(function () {
                                const datosSignin = JSON.parse(
                                    localStorage.getItem("user")
                                );

                                const correo = datosSignin.login.correo;

                                const pass = datosSignin.login.pass;

                                fetch("/signout", {
                                    method: "GET",
                                });

                                fetch("/signin", {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({
                                        correo: correo,
                                        pass: pass,
                                    }),
                                });

                                fetch("/userFront", {
                                    method: "GET",
                                })
                                    .then((response) => response.json())
                                    .then((data) => {
                                        if (data.login !== undefined) {
                                            localStorage.setItem(
                                                "user",
                                                JSON.stringify(data)
                                            );

                                            const storage = JSON.parse(
                                                localStorage.getItem("user")
                                            );

                                            if (
                                                storage.login.correo !== "" &&
                                                storage.login.correo !==
                                                    "miltoncoria03@gmail.com"
                                            ) {
                                                menu(
                                                    storage.login.nombre,
                                                    "client"
                                                );

                                                activeMenu(
                                                    "inicio",
                                                    "reservar",
                                                    "ayuda",
                                                    "client",
                                                    "signout"
                                                );
                                            } else if (
                                                storage.login.correo ===
                                                "miltoncoria03@gmail.com"
                                            ) {
                                                menu(
                                                    storage.login.nombre,
                                                    "admin"
                                                );

                                                activeMenu(
                                                    "inicio",
                                                    "reservar",
                                                    "ayuda",
                                                    "admin",
                                                    "signout"
                                                );
                                            }
                                        } else {
                                            localStorage.clear();
                                        }
                                    })
                                    .catch((error) => {
                                        console.error("Error:", error);
                                    });

                                location.reload();
                            }, 1700);
                        }
                    });
                });
        }
    });
}
