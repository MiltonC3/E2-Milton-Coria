const { client, ObjectId } = require("../database/conexion");

const administradores = ["miltoncoria03@gmail.com"];

const guardarDatos = async (req, res) => {
    const datos = req.body;

    const typeUser = (arrayAdmin, paramcorreo) => {
        let userAdmin;
        for (let i = 0; i < arrayAdmin.length; i++) {
            if (paramcorreo === arrayAdmin[i]) {
                userAdmin = true;
            }
        }

        let tipoUsuario = userAdmin === true ? "admin" : "client";

        return tipoUsuario;
    };

    const userUpdate =
        datos.tipo === "nombre"
            ? { $set: { nombre: datos.param } }
            : datos.tipo === "ubicacion"
            ? { $set: { ubicacion: datos.param } }
            : datos.tipo === "telefono"
            ? { $set: { telefono: datos.param } }
            : datos.tipo === "correo"
            ? {
                  $set: {
                      correo: datos.param,
                      user: typeUser(administradores, datos.param),
                  },
              }
            : "";

    const db = client.db("users").collection("cuentas");

    const update = await db.updateOne({ _id: ObjectId(datos.id) }, userUpdate);

    const userResponse = await db.findOne({ _id: ObjectId(datos.id) });

    res.json(userResponse);
};

const eliminarCuenta = async (req, res) => {
    const idCuenta = req.query.parametro;

    const db = client.db("users").collection("cuentas");

    const deleteCuenta = await db.deleteOne({ _id: ObjectId(idCuenta) });
};

const cambiarPass = async (req, res) => {
    const user = req.body.user;
    const passwords = req.body.passwords;

    const db = client.db("users").collection("cuentas");

    if (
        passwords.passAnterior === user.pass &&
        passwords.passAnterior !== passwords.passNueva
    ) {
        const newPass = { $set: { pass: passwords.passNueva } };

        const updatePass = await db.updateOne(
            { _id: ObjectId(user._id) },
            newPass
        );

        const userResponse = await db.findOne({ _id: ObjectId(user._id) });

        res.json({
            login: userResponse,
            estado: true,
        });
    } else {
        res.json({
            estado: false,
        });
    }
};

module.exports = {
    guardarDatos,
    eliminarCuenta,
    cambiarPass,
};
