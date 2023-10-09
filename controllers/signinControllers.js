// aqui requiero el mongo para interactuar con la base de datos
const { client } = require("../database/conexion");

// declaro la varible afuera para que de esa forma voy interactuando en distintas funciones con el login y asi pueda ir cambiando su valor dependiendo lo que necesite
let login;

let listaClientes;

let newPass;

// aqui creo el modelo del objeto será el admin y con condiciones le dare el permiso de admin o cliente en el caso que no coincida con este objeto
let admin = {
    correo: "miltoncoria03@gmail.com",
    pass: "12345678",
};

// Aqui renderizo la pagina de ayuda al entrar en el enlace /signin
const pageSignin = (req, res) => {
    const pageTitle = "Iniciar sesión - Cabañas Bello Atardecer";

    res.render("signin", { title: pageTitle });
};

// userSignin con metodo post esta recibiendo lo que se ingresa del formulario del /signin
const userSignin = async (req, res) => {
    // aqui con el destructuring recibo los datos del objeto del req.body el cual los datos tienen como propiedad el name de los inputs correspondiente
    const { correo, pass } = req.body;

    // aqui creo el modelo del objeto que usaré para el login, se que es mejor el usar mongoose y hacer los models de esa forma, pero no me dio el tiempo para realizarlo de esa forma ya que era un tema nuevo, para la tercera entrega seguro ya de seguro lo hare mejor
    const user = {
        correo: correo,
        pass: pass,
    };

    // Busco la base de datos usando client el cual pedi al principio
    const db =
        user.correo === admin.correo
            ? client.db("administradores")
            : client.db("clientes");

    // Aqui cambio el valor de la variable que declare al prinicipio por el usuario encontrado en la base de datos, entonces si lo encuentra en la db se guardara en la variable login para despues con el nuevo valor realizar distintas cosas
    // 1- Primero aqui busco la coleccion Cuentas
    // 2- Busco en la base de datos lo que coincide con el model user el cual ingrese en el login
    login = await db
        .collection("cuentas")
        .findOne({ correo: user.correo, pass: user.pass });

    listaClientes = login.correo === admin.correo ? await client.db("clientes").collection("cuentas").find({}).toArray(): undefined;

    //* await client.db("clientes").collection("cuentas").find({}).toArray();
    //* await client.db("clientes").collection("reservas").find({}).toArray();
    //* await client.db("clientes").collection("consultas").find({}).toArray();

    // La condicion tiene la funcion de:
    // 1 - if - si no encuentra al usuario ingresado en signin dara un error al usuario y renderizara de vuelta la pagina signin para que el ususario vuelva ingresar su cuenta e intentar loguearse
    // 2 - else - al encontrar el usuario redirecciona a la pagina del inicio y bueno login ya cambio de valor por el usuario encontrado en la base de datos
    if (login === null) {
        const error = `
<script>
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Los datos que ingresaste no son válidos!'
    })
</script>`;

        const pageTitle = "Iniciar sesión - Cabañas Bello Atardecer";

        res.render("signin", { title: pageTitle, alert: error });
    } else {
        res.redirect("/");
    }
};

// userFront esta tanto en el servidor como en front end, desde aqui le respondo como json la variable login que contiene el usuario encontrado
const userFront = async (req, res) => {
    if (login !== "" && login !== null) {
        res.json({ login: login, listaClientes: listaClientes});
    }
};

// userOut tiene la funcion de que el la variable login se vacie y de esa forma el usuario encontrado se elimine y cumpliria la funcion de cerrar sesion,ya que el userFront no responderia nada al frontend y asi desde el front no se cumpla las condiciones para usar la interfaz de usuario
const userOut = async (req, res) => {
    login = undefined;
};

// Aqui renderizo la pagina de recuperar contraseña al entrar en el enlace /recoverpass
const pagePassRecover = async (req, res) => {
    const pageTitle = "Recupera tu contraseña - Cabañas Bello Atardecer";

    res.render("pass", { title: pageTitle });
};

// La función  userPass  es una función asíncrona que se encarga de actualizar la contraseña de un usuario en la base de datos
const userPass = async (req, res) => {
    const { correo, pass, confirmpass } = req.body;

    const userPassNew = {
        correo: correo,
        pass: pass,
    };

    // Luego, se determina la base de datos en la que se realizará la actualización de la contraseña..
    const db =
        userPassNew.correo === admin.correo
            ? client.db("administradores")
            : client.db("clientes");

    // Después, se verifica si la contraseña y la confirmación de contraseña son iguales. Si lo son, se realiza la actualización de la contraseña en la colección "cuentas" de la base de datos correspondiente.
    if (
        userPassNew.pass === confirmpass &&
        userPassNew.correo !== admin.correo
    ) {
        newPass = await db
            .collection("cuentas")
            .updateOne(
                { correo: userPassNew.correo },
                { $set: { pass: userPassNew.pass } }
            );
    }

    // Si la actualización de la contraseña falla, se muestra un mensaje de error utilizando la librería  Swal.fire  y se renderiza la pagina recoverpass, en el caso que se modifique la cuenta del admin y no coincide con el perfil predifinado se modificara pero ya no sera admin, y si es exitosa muestra un mensaje y renderiza a la pagina de signin.
    if (newPass === null || newPass === undefined) {
        const error = `
<script>
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Los datos que ingresaste no son válidos!'
    })
</script>`;

        const pageTitle = "Recupera tu contraseña - Cabañas Bello Atardecer";

        res.render("pass", { title: pageTitle, alert: error });
    } else {
        const success = `
<script>
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Tu contraseña fue modificada correctamente",
    })
</script>`;

        const pageTitle = "Iniciar sesión - Cabañas Bello Atardecer";

        res.render("signin", { title: pageTitle, alert: success });
    }
};

module.exports = {
    pageSignin, // ruta GET - /signin
    userSignin, // ruta POST - /signin
    userFront, // ruta GET - /userFront
    userOut, // ruta GET - /signout
    pagePassRecover, // ruta GET - /recoverpass
    userPass, //ruta POST - /recoverpass
};
