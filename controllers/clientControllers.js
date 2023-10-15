// aqui requiero el mongo para interactuar con la base de datos
const { client } = require("../database/conexion");

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

const nombreClientSave = async (req, res) => {
    const datos = req.body;

    const db = await client
        .db("clientes")
        .collection("cuentas")
        .updateOne(
            { correo: datos.correo },
            { $set: { nombre: datos.nombre } }
        );

    const usuario = await client
        .db("clientes")
        .collection("cuentas")
        .findOne({ correo: datos.correo });

    res.json(usuario);
};

// exportando como modulo pageClient para que la ruta /client lo reciba en el archivo clientRoutes
module.exports = { pageClient, nombreClientSave };
