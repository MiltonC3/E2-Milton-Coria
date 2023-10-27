// aqui requiero el mongo para interactuar con la base de datos
const { client, ObjectId } = require("../database/conexion");

const pageTitle = "Bienvenido Administrador - Cabañas Bello Atardecer";

const administradores = ["miltoncoria03@gmail.com"];

// renderizado de pagina
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

const pageAdminReservas = (req, res) => {
    res.render("admin", {
        title: pageTitle,
        navAdminReservas: "link-admin-active",
    });
};

const pageAdminConsultas = (req, res) => {
    res.render("admin", {
        title: pageTitle,
        navAdminConsultas: "link-admin-active",
    });
};

// funciones
const listaClientesAdmin = async (req, res) => {
    const db = client.db("users").collection("cuentas");

    const listaClientes = await db.find({ user: "client" }).toArray();

    res.json({ listaClientes: listaClientes });
};

const eliminarClientesAdmin = async (req, res) => {
    const datos = req.query.parametro;

    const db = client.db("users").collection("cuentas");

    const removeClient = await db.deleteOne({ _id: ObjectId(datos) });

    const listaClientes = await db.find({ user: "client" }).toArray();

    res.json({ listaClientes: listaClientes });
};

// exportando como modulo pageAdmin en la ruta /admin
module.exports = {
    pageAdminDatos,
    pageAdminClientes,
    pageAdminReservas,
    pageAdminConsultas,
    listaClientesAdmin,
    eliminarClientesAdmin,
};
