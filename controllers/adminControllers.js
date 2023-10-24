// aqui requiero el mongo para interactuar con la base de datos
const { client, ObjectId } = require("../database/conexion");

const pageTitle = "Bienvenido Administrador - Cabañas Bello Atardecer";

// const sectionAdminReservas = `
// <section>
//     <div class="ftco-section container">
//         <div class="row">
//             <div class="col-md-12">
//                 <div class="content w-100">
//                     <div class="calendar-container">
//                       <div class="calendar">
//                         <div class="year-header">
//                           <span class="left-button fa fa-chevron-left" id="prev"> </span>
//                           <span class="year" id="label"></span>
//                           <span class="right-button fa fa-chevron-right" id="next"> </span>
//                         </div>
//                         <table class="months-table w-100">
//                           <tbody>
//                             <tr class="months-row">
//                               <td class="month">Ene</td>
//                               <td class="month">Feb</td>
//                               <td class="month">Mar</td>
//                               <td class="month">Abr</td>
//                               <td class="month">May</td>
//                               <td class="month">Jun</td>
//                               <td class="month">Jul</td>
//                               <td class="month">Ago</td>
//                               <td class="month">Sep</td>
//                               <td class="month">Oct</td>
//                               <td class="month">Nov</td>
//                               <td class="month">Dic</td>
//                             </tr>
//                           </tbody>
//                         </table>

//                         <table class="days-table w-100">
//                           <td class="day">Dom</td>
//                           <td class="day">Lun</td>
//                           <td class="day">Mar</td>
//                           <td class="day">Mie</td>
//                           <td class="day">Jue</td>
//                           <td class="day">Vie</td>
//                           <td class="day">Sab</td>
//                         </table>
//                         <div class="frame">
//                           <table class="dates-table w-100">
//                           <tbody class="tbody">
//                           </tbody>
//                           </table>
//                         </div>
//                         <button class="button" id="add-button">Agregar evento</button>
//                       </div>
//                     </div>
//                     <div class="events-container">
//                     </div>
//                     <div class="dialog" id="dialog">
//                         <h2 class="dialog-header"> Agregar nuevo evento </h2>
//                         <form class="form" id="form">
//                           <div class="form-container" align="center">
//                             <label class="form-label" id="valueFromMyButton" for="name">Evento:</label>
//                             <input class="input" type="text" id="name" maxlength="36">
//                             <label class="form-label" id="valueFromMyButton" for="count">Numero de personas</label>
//                             <input class="input" type="number" id="count" min="0" max="15">
//                             <input type="button" value="Cancelar" class="button" id="cancel-button">
//                             <input type="button" value="OK" class="button button-white" id="ok-button">
//                           </div>
//                         </form>
//                     </div>
//                  </div>
//             </div>
//         </div>
//     </div>
// </section>
// `;

const pageAdminDatos = (req, res) => {
    res.render("admin", {
        title: pageTitle,
        navAdminDatos: "link-admin-active",
    });
};

const pageAdminClientes = (req, res) => {
    res.render("admin", {
        title: pageTitle,
        navAdminClientes: "link-admin-active",
    });
};

const adminListaClientes = async (req, res) => {
    const listaClientes = await client
        .db("clientes")
        .collection("cuentas")
        .find({})
        .toArray();

    res.json({ listaClientes: listaClientes });
};

const pageAdminReservas = (req, res) => {
    res.render("admin", {
        title: pageTitle,
        navAdminReservas: "link-admin-active",
        // sectionUser: sectionAdminReservas,
    });
};

const pageAdminConsultas = (req, res) => {
    res.render("admin", {
        title: pageTitle,
        navAdminConsultas: "link-admin-active",
    });
};

const guardarDatosAdmin = async (req, res) => {
    const datos = req.body;

    const update =
        datos.tipo === "nombre"
            ? { $set: { nombre: datos.param } }
            : datos.tipo === "ubicacion"
            ? { $set: { ubicacion: datos.param } }
            : datos.tipo === "telefono"
            ? { $set: { telefono: datos.param } }
            : datos.tipo === "correo"
            ? { $set: { correo: datos.param } }
            : "";

    const db = await client
        .db("administradores")
        .collection("cuentas")
        .updateOne({ _id: ObjectId(datos.id) }, update);

    const usuario = await client
        .db("administradores")
        .collection("cuentas")
        .findOne({ _id: ObjectId(datos.id) });

    res.json(usuario);
};

const deleteAdminClientes = async (req, res) => {
    const datosRemove = req.query.parametro;

    const usuarioEliminado = await client
        .db("clientes")
        .collection("cuentas")
        .deleteOne({ _id: ObjectId(datosRemove) });

    const listaClientes = await client
        .db("clientes")
        .collection("cuentas")
        .find({})
        .toArray();

    res.json({ listaClientes: listaClientes });
};

// exportando como modulo pageAdmin en la ruta /admin
module.exports = {
    pageAdminDatos,
    pageAdminClientes,
    adminListaClientes,
    guardarDatosAdmin,
    deleteAdminClientes,
    pageAdminReservas,
    pageAdminConsultas,
};
