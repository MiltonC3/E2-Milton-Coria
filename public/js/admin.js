if (window.location.pathname === "/admin") {
    fetch("/admin", {
        method: "GET",
    }).then((data) => {
        const sectionAdmin = document.getElementById("section-admin");

        const datos =
            localStorage.getItem("userActualizado") === null
                ? JSON.parse(localStorage.getItem("user"))
                : JSON.parse(localStorage.getItem("userActualizado"));

        const lastFourDigits = datos.login.pass.slice(-4);

        const hiddenDigits = "*".repeat(lastFourDigits.length);

        const hiddenPassword = datos.login.pass.slice(0, -4) + hiddenDigits;

        sectionAdmin.innerHTML = `
<h1 class="admin__h1">Bienvenido Administrador</h1>
<div class="row d-flex justify-content-center m-4 mt-5">
    <div class="col-md-4 mb-2 mb-sm-0 text-center">
        <div class="card user__card text-bg-dark">
            <div class="card-body">
                <h5 class="card-title">Nombre y Apellido</h5>
                <form action="/nombreadmin" method="post" class="user__form">
                    <input type="text" name="nombre" value="${datos.login.nombre}" id="nombre-admin" class="user__datos--input" required minlength="10"/>
                    <button type="submit" class="btn btn-warning m-1">Guardar <i class="bi bi-pencil"></i></button>
                </form>
                <button type="button" class="btn btn-outline-danger m-1">Eliminar cuenta <i class="bi bi-pencil"></i></button>
            </div>
        </div>
    </div>
    <div class="col-md-4 mb-2 mb-sm-0 text-center">
        <div class="card user__card text-bg-dark">
            <div class="card-body">
                <h5 class="card-title">Nro de Teléfono</h5>
                <form action="/telefonoadmin" method="post" class="user__form">
                    <input type="tel" name="telefono" value="${datos.login.telefono}" id="telefono-admin" class="user__datos--input" required minlength="9" maxlength="12"/>
                    <button type="submit" class="btn btn-warning m-1">Guardar <i class="bi bi-pencil"></i></button>
                </form>
            </div>
        </div>
    </div>
</div>
<div class="row d-flex justify-content-center m-4">
    <div class="col-md-4 mb-2 mb-sm-0 text-center">
        <div class="card user__card text-bg-dark">
            <div class="card-body">
                <h5 class="card-title">Ubicacion</h5>
                <form action="/ubicacionadmin" method="post" class="user__form">
                    <input type="text" name="ubicacion" value="${datos.login.ubicacion}" id="ubicacion-admin" class="user__datos--input" required/>
                    <button type="submit" class="btn btn-warning m-1">Guardar <i class="bi bi-pencil"></i></button>
                </form>
            </div>
        </div>
    </div>
    <div class="col-md-4 mb-2 mb-sm-0 text-center">
        <div class="card user__card text-bg-dark">
            <div class="card-body">
                <h5 class="card-title">Correo electrónico</h5>
                <form action="/correoadmin" method="post" class="user__form">
                    <input type="email" name="correo" value="${datos.login.correo}" id="correo-admin" class="user__datos--input" required/>
                    <button type="submit" class="btn btn-warning m-1">Guardar <i class="bi bi-pencil"></i></button>
                </form>
                <button type="button" class="btn btn-outline-info m-1">Cambiar contraseña <i class="bi bi-pencil"></i></button>
            </div>
        </div>
    </div>
</div>
`;
    });
}

if (window.location.pathname === "/adminclientes") {
    fetch("/adminclientes", {
        method: "GET",
    }).then((data) => {
        const sectionAdmin = document.getElementById("section-admin");
        const datos =
            localStorage.getItem("userActualizado") === null
                ? JSON.parse(localStorage.getItem("user"))
                : JSON.parse(localStorage.getItem("userActualizado"));

        sectionAdmin.innerHTML = `
<table class="table container table-dark admin__table">
    <thead>
      <tr class="admin__tr">
        <th class="admin__th" scope="col">#</th>
        <th class="admin__th" scope="col">Nombre y Apellido</th>
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

        if (arrayClientes.length > 0) {
            for (let i = 0; i < arrayClientes.length; i++) {
                const newtr = document.createElement("tr");
                newtr.classList.add("admin__tr");
                newtr.classList.add(`admin-tr-${i}`);
                newtr.innerHTML = `
    <th class="admin__td" scope="row">${i + 1}</th>
    <td class="admin__td">${arrayClientes[i].nombre}</td>
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
                                localStorage.clear();

                                fetch("/admindeleteclient", {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json", // Tipo de contenido de los datos
                                    },
                                    body: JSON.stringify({
                                        admin: datos.login.correo,
                                        removeClients: arrayClientes[i].correo,
                                    }),
                                })
                                    .then((response) => response.json())
                                    .then(async (data) => {
                                        await localStorage.setItem(
                                            "userActualizado",
                                            JSON.stringify({
                                                login: data.login,
                                                listaClientes:
                                                    data.listaClientes,
                                            })
                                        );
                                        window.location.reload();
                                    })
                                    .catch((error) => console.error(error));
                            }
                        });
                    });
            }
        } else {
            const newtr = document.createElement("tr");
            newtr.classList.add("admin__tr");
            newtr.innerHTML = `
    <td class="admin__td" colspan="6">No hay clientes</td>
    `;
            tbody.appendChild(newtr);
        }
    });
}
