// aqui requiero el mongo para interactuar con la base de datos
const { client } = require("../database/conexion");

// Aqui renderizo la pagina de ayuda al entrar en el enlace /signup
const pageSignup = (req, res) => {
    const pageTitle = "Crea tu cuenta - Cabañas Bello Atardecer";

    res.render("signup", { title: pageTitle });
};

// userSignup con metodo post tendrá la función de crer el usuario ingresado del formulario del /signup
const userSignup = async (req, res) => {
    // aqui con el destructuring recibo los datos del objeto del req.body el cual los datos tienen como propiedad el name de los inputs correspondiente
    const { nombre, nacimiento, correo, pass } = req.body;

    // aqui creo el modelo del objeto que usaré para crear el usuario, en cada propiedad le doy como valor las constantes que destructure anteriormente
    const userNew = {
        nombre: nombre,
        nacimiento: nacimiento,
        correo: correo,
        pass: pass,
    };

    // Busco la base de datos usando client el cual pedi al principio
    const db = client.db("clientes");

    // Busco si el usuario que intento crear ya se encuentra su nombre,correo,pass en la base de datos
    const nombreExistente = await db
        .collection("Cuentas")
        .findOne({ nombre: userNew.nombre });
    const correoExistente = await db
        .collection("Cuentas")
        .findOne({ correo: userNew.correo });
    const passExistente = await db
        .collection("Cuentas")
        .findOne({ pass: userNew.pass });

    // Para que aqui mediante una condicion analizo si su valor es null es decir el correo no fue usado por otro, entonces creo el usuario en la base de datos, usando insertOne y dandole como parametro al objeto modelo de usuario que tiene como valor los datos recibidos del form
    // -Y si el nombre,correo,pass ya fue usado dara un alert como error y renderizara la pagina /signup de vuelta para que vuelva a intentar a crear el usuario
    if (
        nombreExistente === null &&
        correoExistente === null &&
        passExistente === null
    ) {
        await db.collection("Cuentas").insertOne(userNew);
        console.log("Usuario creado");

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
