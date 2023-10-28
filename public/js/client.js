const clientSection = (datos) => {
    const sectionClient = document.getElementById(`section-client`);

    sectionClient.innerHTML = `
    <section>
        <div class="row d-flex justify-content-center m-4 mt-5">
            <div class="col-md-4 mb-2 mb-sm-0 text-center">
                <div class="card user__card text-bg-dark">
                    <div class="card-body">
                        <h5 class="card-title">Nombre y Apellido</h5>
                        <input type="text" name="nombre" value="${datos.login.nombre}" id="nombre-client" class="user__datos--input" required minlength="10"/>
                        <button type="button" id="btn-client-nombre" class="btn btn-warning m-1">Guardar <i class="bi bi-pencil"></i></button>
                        <button type="button" id="btn-client-eliminar" class="btn btn-outline-danger m-1">Eliminar cuenta <i class="bi bi-pencil"></i></button>
                    </div>
                </div>
            </div>
            <div class="col-md-4 mb-2 mb-sm-0 text-center">
                <div class="card user__card text-bg-dark">
                    <div class="card-body">
                        <h5 class="card-title">Ubicación</h5>
                        <input type="text" name="ubicacion" value="${datos.login.ubicacion}" id="ubicacion-client" class="user__datos--input" required/>
                        <button type="button" id="btn-client-ubicacion" class="btn btn-warning m-1">Guardar <i class="bi bi-pencil"></i></button>
                    </div>
                </div>
            </div>
        </div>
        <hr class="container"/>
        <div class="row d-flex justify-content-center m-4">
            <div class="col-md-4 mb-2 mb-sm-0 text-center">
                <div class="card user__card text-bg-dark">
                    <div class="card-body">
                        <h5 class="card-title">Nro de Teléfono</h5>
                        <input type="tel" name="telefono" value="${datos.login.telefono}" id="telefono-client" class="user__datos--input" required minlength="9" maxlength="12"/>
                        <button type="button" id="btn-client-telefono" class="btn btn-warning m-1">Guardar <i class="bi bi-pencil"></i></button>
                    </div>
                </div>
            </div>
            <div class="col-md-4 mb-2 mb-sm-0 text-center">
                <div class="card user__card text-bg-dark">
                    <div class="card-body">
                        <h5 class="card-title">Correo electrónico</h5>
                        <input type="email" name="correo" value="${datos.login.correo}" id="correo-client" class="user__datos--input" required/>
                        <button type="button" id="btn-client-correo" class="btn btn-warning m-1">Guardar <i class="bi bi-pencil"></i></button>
                        <button type="button" id="btn-client-pass" class="btn btn-outline-info client__btn m-1">Cambiar contraseña <i class="bi bi-pencil"></i></button>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section>
        <h1 class="text-center mb-3">Reservas</h1>
        <div class="card container">
            <div class="card-header">
               Cabaña Reservada - 10 de Agosto / 20 de Agosto
            </div>
            <div class="card-body">
                <blockquote class="blockquote mb-0">
                    <p>A well-known quote, contained in a blockquote element.</p>
                    <footer class="blockquote-footer">Hace 2 días</footer>
                </blockquote>
            </div>
        </div>
        <footer aria-label="...">
            <ul class="pagination pagination-sm d-flex justify-content-center m-4">
                <li class="page-item" aria-current="page">
                    <span class="page-link p-2 pe-3 ps-3 bg-pagination-client text-light">Actuales</span>
                </li>
                <li class="page-item">
                    <span class="page-link p-2 pe-3 ps-3 text-dark">Vencidas</span>
                </li>
            </ul>
        </footer>
    </section>
    
    <section>
        <h2 class="text-center mb-3 text-white-50">Consultas</h2>
        <div class="card container bg-secondary text-light mb-2">
            <div class="card-header">
                #1
            </div>
            <div class="card-body">
                <blockquote class="blockquote mb-0">
                    <p>A well-known quote, contained in a blockquote element.</p>
                    <footer class="blockquote-footer text-white-50">Hace 5 días</footer>
                </blockquote>
            </div>
        </div>
        <footer aria-label="...">
            <ul class="pagination pagination-sm d-flex justify-content-center m-4">
                <li class="page-item" aria-current="page">
                    <span class="page-link p-2 pe-3 ps-3 bg-secondary text-light">1</span>
                </li>
                <li class="page-item">
                    <span class="page-link p-2 pe-3 ps-3 text-dark">2</span>
                </li>
                <li class="page-item">
                    <span class="page-link p-2 pe-3 ps-3 text-dark">3</span>
                </li>
            </ul>
        </footer>
    </section>
    `;

    btnGuardarDatos("client");
};

if (window.location.pathname === "/client") {
    fetch("/client", {
        method: "GET",
    }).then((data) => {
        const datos =
            localStorage.getItem("userActualizado") === null
                ? JSON.parse(localStorage.getItem("user"))
                : JSON.parse(localStorage.getItem("userActualizado"));

        clientSection(datos);

        btnEliminarCuenta(datos, "client");

        btnCambiarPass(datos, "client");
    });
}
