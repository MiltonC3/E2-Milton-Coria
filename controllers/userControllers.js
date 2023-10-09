// aqui requiero el mongo para interactuar con la base de datos
const { client } = require("../database/conexion");

function navAdmin(class1, class2, class3, class4) {
    return `
<nav aria-label="Page navigation example">
  <ul class="pagination m-5 justify-content-center text-dark">
      <li class="page-item user__navigation">
          <a class="page-link ${class1} p-2" href="/admin">Mis datos</a>
      </li>
      <li class="page-item user__navigation">
          <a class="page-link ${class2} p-2" href="/adminclientes">Clientes</a>
      </li>
      <li class="page-item user__navigation">
          <a class="page-link ${class3} p-2" href="/adminreservas">Reservas</a>
      </li>
      <li class="page-item user__navigation">
          <a class="page-link ${class4} p-2" href="/adminconsultas">Consultas</a>
      </li>
  </ul>
</nav>`;
}

// Aqui renderizo la pagina de ayuda al entrar en el enlace /cleint
const pageClient = async (req, res) => {
    const pageTitle = "Bienvenido Cliente - Cabañas Bello Atardecer";

    // const db = await client.db("clientes").collection("cuentas").find({}).toArray();

    //* await client.db("clientes").collection("cuentas").find({}).toArray();
    //* await client.db("clientes").collection("reservas").find({}).toArray();
    //* await client.db("clientes").collection("consultas").find({}).toArray();

    res.render("client", {
        title: pageTitle,
    });
};

// Aqui renderizo la pagina de ayuda al entrar en el enlace /cleint
const pageAdmin = (req, res) => {
    const pageTitle = "Bienvenido Administrador - Cabañas Bello Atardecer";

    const menuAdmin = navAdmin(
        "text-light bg-secondary",
        "text-dark",
        "text-dark",
        "text-dark"
    );

    res.render("admin", {
        title: pageTitle,
        nav: menuAdmin,
    });
};

const pageAdminClientes = (req, res) => {
    const pageTitle = "Bienvenido Administrador - Cabañas Bello Atardecer";

    const menuAdmin = navAdmin(
        "text-dark",
        "text-light bg-secondary",
        "text-dark",
        "text-dark"
    );

    res.render("admin", {
        title: pageTitle,
        nav: menuAdmin,
    });
};

const pageAdminReservas = (req, res) => {
    const pageTitle = "Bienvenido Administrador - Cabañas Bello Atardecer";

    const menuAdmin = navAdmin(
        "text-dark",
        "text-dark",
        "text-light bg-secondary",
        "text-dark"
    );

    const sectionAdmin = `
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
</section>`;

    res.render("admin", {
        title: pageTitle,
        nav: menuAdmin,
        sectionUser: sectionAdmin,
    });
};

const pageAdminConsultas = (req, res) => {
    const pageTitle = "Bienvenido Administrador - Cabañas Bello Atardecer";

    const menuAdmin = navAdmin(
        "text-dark",
        "text-dark",
        "text-dark",
        "text-light bg-secondary"
    );

    const sectionAdmin = `
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
</section>`;

    res.render("admin", {
        title: pageTitle,
        nav: menuAdmin,
        sectionUser: sectionAdmin,
    });
};

const deleteAdminClientes = async (req, res) => {
  const correoAEliminar = req.body

  await client.db("clientes").collection("cuentas").deleteOne(correoAEliminar);
}

// exportando como modulo pageClient para que la ruta /client lo reciba en el archivo userRoutes y pageAdmin en la ruta /admin
module.exports = {
    pageClient,
    pageAdmin,
    pageAdminClientes,
    deleteAdminClientes,
    pageAdminReservas,
    pageAdminConsultas,
};
