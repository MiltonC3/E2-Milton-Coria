// aqui requiero el mongo para interactuar con la base de datos
const { client } = require("../database/conexion");

const { differenceInYears } = require('date-fns');

let admin = {
    correo: "miltoncoria03@gmail.com",
    pass: "12345678",
};

// Aqui renderizo la pagina de ayuda al entrar en el enlace /signup
const pageSignup = (req, res) => {
    const pageTitle = "Crea tu cuenta - Cabañas Bello Atardecer";

    res.render("signup", { title: pageTitle });
};

// userSignup con metodo post tendrá la función de crer el usuario ingresado del formulario del /signup
const userSignup = async (req, res) => {
    // aqui con el destructuring recibo los datos del objeto del req.body el cual los datos tienen como propiedad el name de los inputs correspondiente
    const { nombre, nacimiento, telefono, ubicacion, correo, pass } = req.body;

    const edad = differenceInYears((new Date()), (new Date(nacimiento)));

    // aqui creo el modelo del objeto que usaré para crear el usuario, en cada propiedad le doy como valor las constantes que destructure anteriormente
    const userNew = {
        nombre: nombre,
        nacimiento: nacimiento,
        edad: edad,
        telefono: telefono,
        ubicacion: ubicacion,
        correo: correo,
        pass: pass,
    };

    // Busco la base de datos usando client el cual pedi al principio
    const db =
        userNew.correo === admin.correo
            ? client.db("administradores")
            : client.db("clientes");

    // Busco si el usuario que intento crear ya se encuentra en la base de datos
    const correoExistente = await db
        .collection("cuentas")
        .findOne({ correo: userNew.correo });
    const passExistente = await db
        .collection("cuentas")
        .findOne({ pass: userNew.pass });

    // El código anterior verifica si ya existe una cuenta con los datos ingresados por el usuario. Si no existe una cuenta, se inserta en la base de datos y se redirige al usuario a la página de inicio de sesión. Si ya existe una cuenta con los mismos datos, se muestra un mensaje de error utilizando la biblioteca SweetAlert y se vuelve a cargar la página de registro con el mensaje de error.
    if (
        correoExistente === null &&
        passExistente === null
    ) {
        await db.collection("cuentas").insertOne(userNew);

        res.redirect("/signin");
    } else {
        const error = `
<script>
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ya tienes una cuenta con las datos ingresados!',
        footer: '<a href="/signin">Ingresa aqui</a>'
    })
</script>`;

        res.render("signup", { alert: error });
    }
};

module.exports = {
    pageSignup, // ruta GET - /signup
    userSignup, // ruta POST - /signup
};
