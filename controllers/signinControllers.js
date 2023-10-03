const express = require("express");
const { validationResult } = require("express-validator");
const { client } = require("../database/conexion");

const pageSignin = (req, res) => {
    const pageTitle = "Iniciar sesión - Cabañas Bello Atardecer";

    const btnNav = `<li class="header__li li-signin">
    <a href="/signin" class="header__a">Sign In</a>
</li>
<li class="header__li li-signup">
    <a href="/signup" class="header__a">Sign Up</a>
</li>`;

    res.render("signin", { title: pageTitle, btnNav: btnNav });
};

const userSignin = async (req, res) => {
    const { correo, pass } = req.body;

    const admin = {
        correo: "miltoncoria03@gmail.com",
        pass: "boca123456",
    };

    const user = {
        correo: correo,
        pass: pass,
    };

    const db = client.db("clientes");

    const login = await db
        .collection("Cuentas")
        .findOne({ correo: user.correo, pass: user.pass });

    if (login === null) {
        const error = `
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<script>
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error al ingresar los datos!',
        footer: '<a href="/signup">Registrate</a>'
    })
</script>`;

        const btnNav = `<li class="header__li li-signin">
    <a href="/signin" class="header__a">Sign In</a>
</li>
<li class="header__li li-signup">
    <a href="/signup" class="header__a">Sign Up</a>
</li>`;

        res.render("signin", { alert: error, btnNav: btnNav });
    } else if (
        login.correo &&
        login.pass === user.pass &&
        login.correo !== admin.correo &&
        login.pass !== admin.pass
    ) {
        const pageTitle = "Bienvenido Cliente - Cabañas Bello Atardecer";

        res.render("client", { title: pageTitle });
    } else if (login.correo === admin.correo && login.pass === admin.pass) {
        const pageTitle = "Bienvenido Admin - Cabañas Bello Atardecer";

        res.render("admin", { title: pageTitle });
    }
};

module.exports = { pageSignin, userSignin };
