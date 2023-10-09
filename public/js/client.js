if (window.location.pathname === "/client") {
    fetch("/client", {
        method: "GET",
    }).then((data) => {
        const sectionClient = document.getElementById("section-client");

        const datos = JSON.parse(localStorage.getItem("user"));

        sectionClient.innerHTML = `
<section>
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
                    <h5 class="card-title">Ubicación</h5>
                    <p class="card-text">${datos.login.ubicacion}</p>
                    <button
                        type="button"
                        class="btn btn-warning client__btn m-1"
                    >Editar <i class="bi bi-pencil"></i></button>
                </div>
            </div>
        </div>
    </div>
    <hr class="container"/>
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
                    <h5 class="card-title">Correo</h5>
                    <p class="card-text">${datos.login.correo}</p>
                    <button
                        type="button"
                        class="btn btn-warning client__btn m-1"
                    >Editar correo <i class="bi bi-pencil"></i></button>
                    <button
                        type="button"
                        class="btn btn-outline-info client__btn m-1"
                    >Cambiar contraseña <i class="bi bi-pencil"></i></button>
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
</section>`;
    });
}
