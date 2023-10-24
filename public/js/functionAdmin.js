const adminSectionDatos = () => {
    const sectionAdmin = document.getElementById(`section-admin`);

    const datos =
        localStorage.getItem("userActualizado") === null
            ? JSON.parse(localStorage.getItem("user"))
            : JSON.parse(localStorage.getItem("userActualizado"));

    sectionAdmin.innerHTML = `
    <h1 class="admin__h1">Bienvenido Administrador</h1>
    <div class="row d-flex justify-content-center m-4 mt-5">
    <div class="col-md-4 mb-2 mb-sm-0 text-center">
        <div class="card user__card text-bg-dark">
            <div class="card-body">
                <h5 class="card-title">Nombre y Apellido</h5>
                <input type="text" name="nombre" value="${datos.login.nombre}" id="nombre-admin" class="user__datos--input" required minlength="10"/>
                <button type="button" id="btn-admin-nombre" class="btn btn-warning m-1">Guardar <i class="bi bi-pencil"></i></button>
                <button type="button" class="btn btn-outline-danger m-1">Eliminar cuenta <i class="bi bi-pencil"></i></button>
            </div>
        </div>
    </div>
    <div class="col-md-4 mb-2 mb-sm-0 text-center">
        <div class="card user__card text-bg-dark">
            <div class="card-body">
                <h5 class="card-title">Nro de Teléfono</h5>
                <input type="tel" name="telefono" value="${datos.login.telefono}" id="telefono-admin" class="user__datos--input" required minlength="9" maxlength="12"/>
                <button type="button" id="btn-admin-telefono" class="btn btn-warning m-1">Guardar <i class="bi bi-pencil"></i></button>
            </div>
        </div>
    </div>
    </div>
    <div class="row d-flex justify-content-center m-4">
    <div class="col-md-4 mb-2 mb-sm-0 text-center">
        <div class="card user__card text-bg-dark">
            <div class="card-body">
                <h5 class="card-title">Ubicacion</h5>
                <input type="text" name="ubicacion" value="${datos.login.ubicacion}" id="ubicacion-admin" class="user__datos--input" required/>
                <button type="button" id="btn-admin-ubicacion" class="btn btn-warning m-1">Guardar <i class="bi bi-pencil"></i></button>
            </div>
        </div>
    </div>
    <div class="col-md-4 mb-2 mb-sm-0 text-center">
        <div class="card user__card text-bg-dark">
            <div class="card-body">
                <h5 class="card-title">Correo electrónico</h5>
                <input type="email" name="correo" value="${datos.login.correo}" id="correo-admin" class="user__datos--input" required/>
                <button type="button" id="btn-admin-correo" class="btn btn-warning m-1">Guardar <i class="bi bi-pencil"></i></button>
                <button type="button" class="btn btn-outline-info admin__btn m-1">Cambiar contraseña <i class="bi bi-pencil"></i></button>
            </div>
        </div>
    </div>
    </div>
    `;

    inputMisDatos("admin");
};

const adminSectionClientes = (datos) => {
    const sectionAdmin = document.getElementById("section-admin");

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

                            const url = "/admindeleteclient";

                            fetch(`${url}?parametro=${arrayClientes[i]._id}`, {
                                method: "DELETE",
                            })
                                .then((response) => {
                                    if (!response.ok) {
                                        throw new Error(
                                            "Error en la solicitud DELETE"
                                        );
                                    }
                                    return response.json();
                                })
                                .then(async (data) => {
                                    adminTablaClientes(data);

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
};

const adminSectionReservas = () => {
    const sectionAdmin = document.getElementById("section-admin");

    calendar()

    sectionAdmin.innerHTML = `
<section>
    <div class="ftco-section container">
        <div class="row">
            <div class="col-md-12">
                <div class="content w-100">
                    <div class="calendar-container">
                      <div class="calendar"> 
                        <div class="year-header"> 
                          <span class="left-button fa fa-chevron-left" id="prev"> </span> 
                          <span class="year" id="label"></span> 
                          <span class="right-button fa fa-chevron-right" id="next"> </span>
                        </div> 
                        <table class="months-table w-100"> 
                          <tbody>
                            <tr class="months-row">
                              <td class="month">Ene</td> 
                              <td class="month">Feb</td> 
                              <td class="month">Mar</td> 
                              <td class="month">Abr</td> 
                              <td class="month">May</td> 
                              <td class="month">Jun</td> 
                              <td class="month">Jul</td>
                              <td class="month">Ago</td> 
                              <td class="month">Sep</td> 
                              <td class="month">Oct</td>          
                              <td class="month">Nov</td>
                              <td class="month">Dic</td>
                            </tr>
                          </tbody>
                        </table> 

                        <table class="days-table w-100"> 
                          <td class="day">Dom</td> 
                          <td class="day">Lun</td> 
                          <td class="day">Mar</td> 
                          <td class="day">Mie</td> 
                          <td class="day">Jue</td> 
                          <td class="day">Vie</td> 
                          <td class="day">Sab</td>
                        </table> 
                        <div class="frame"> 
                          <table class="dates-table w-100"> 
                          <tbody class="tbody">             
                          </tbody> 
                          </table>
                        </div> 
                        <button class="button" id="add-button">Agregar evento</button>
                      </div>
                    </div>
                    <div class="events-container">
                    </div>
                    <div class="dialog" id="dialog">
                        <h2 class="dialog-header"> Agregar nuevo evento </h2>
                        <form class="form" id="form">
                          <div class="form-container" align="center">
                            <label class="form-label" id="valueFromMyButton" for="name">Evento:</label>
                            <input class="input" type="text" id="name" maxlength="36">
                            <label class="form-label" id="valueFromMyButton" for="count">Numero de personas</label>
                            <input class="input" type="number" id="count" min="0" max="15">
                            <input type="button" value="Cancelar" class="button" id="cancel-button">
                            <input type="button" value="OK" class="button button-white" id="ok-button">
                          </div>
                        </form>
                    </div>
                 </div>
            </div>
        </div>
    </div>
</section>
    `;
};

const adminSectionConsultas = () => {
    const sectionAdmin = document.getElementById("section-admin");

    sectionAdmin.innerHTML = `
    <section>
    <div class="accordion container ftco-section" id="accordionPanelsStayOpenExample">
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
            #1
          </button>
        </h2>
        <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show">
          <div class="accordion-body">
            <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
            #2
          </button>
        </h2>
        <div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse">
          <div class="accordion-body">
            <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
            #3
          </button>
        </h2>
        <div id="panelsStayOpen-collapseThree" class="accordion-collapse collapse">
          <div class="accordion-body">
            <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
          </div>
        </div>
      </div>
    </div>
</section>
`;
};
