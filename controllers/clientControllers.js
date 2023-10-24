// aqui requiero el mongo para interactuar con la base de datos
const { client, ObjectId } = require("../database/conexion");

// Aqui renderizo la pagina de ayuda al entrar en el enlace /cleint
const pageClient = async (req, res) => {
    const pageTitle = "Bienvenido Cliente - Cabañas Bello Atardecer";

    // const db = await client.db("clientes").collection("cuentas").find({}).toArray();

    //* await client.db("clientes").collection("cuentas").find({}).toArray();
    //* await client.db("clientes").collection("reservas").find({}).toArray();
    //* await client.db("clientes").collection("consultas").find({}).toArray();

    res.render("client", {
        title: pageTitle,
        showFooter: true,
    });
};

const guardarDatosClient = async (req, res) => {
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
        .db("clientes")
        .collection("cuentas")
        .updateOne({ _id: ObjectId(datos.id) }, update);

    const usuario = await client
        .db("clientes")
        .collection("cuentas")
        .findOne({ _id: ObjectId(datos.id) });

    res.json(usuario);
};

// exportando como modulo pageClient para que la ruta /client lo reciba en el archivo clientRoutes
module.exports = { pageClient, guardarDatosClient };
