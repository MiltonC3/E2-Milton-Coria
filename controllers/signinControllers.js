// const express = require("express");
// const { validationResult } = require("express-validator");
const { client } = require("../database/conexion");

let login;

const pageSignin = (req, res) => {
    const pageTitle = "Iniciar sesión - Cabañas Bello Atardecer";

    const btnNav = `
<li class="header__li">
    <a href="/" class="header__a">Inicio</a>
</li>
<li class="header__li">
    <a href="/reservar" class="header__a">Reservar</a>
</li>
<li class="header__li">
    <a href="/ayuda" class="header__a">Ayuda</a>
</li>
<li class="header__li li-signin">
    <a href="/signin" class="header__a header__a--active">Sign In</a>
</li>
<li class="header__li li-signup">
    <a href="/signup" class="header__a">Sign Up</a>
</li>`;

    res.render("signin", { title: pageTitle, btnNav: btnNav });
};

const userSignin = async (req, res) => {
    client.connect();

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

    login = await db
        .collection("Cuentas")
        .findOne({ correo: user.correo, pass: user.pass });

    if (login === null) {
        const error = `
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<script>
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ingresa el correo y contraseña correctamente!',
        footer: '<a href="/signup">Registrate</a>'
    })
</script>`;

        const btnNav = `
<li class="header__li">
    <a href="/" class="header__a">Inicio</a>
</li>
<li class="header__li">
    <a href="/reservar" class="header__a">Reservar</a>
</li>
<li class="header__li">
    <a href="/ayuda" class="header__a">Ayuda</a>
</li>
<li class="header__li li-signin">
    <a href="/signin" class="header__a header__a--active">Sign In</a>
</li>
<li class="header__li li-signup">
    <a href="/signup" class="header__a">Sign Up</a>
</li>`;

        res.render("signin", { alert: error, btnNav: btnNav });
    } else {
        console.log("usuario encontrado");
    }
    // else if (
    //         login.correo &&
    //         login.pass === user.pass &&
    //         login.correo !== admin.correo &&
    //         login.pass !== admin.pass
    //     ) {
    //         const pageTitle = "Bienvenido Cliente - Cabañas Bello Atardecer";

    //         const btnNav = `
    // <li class="header__li">
    //     <a href="/" class="header__a">Inicio</a>
    // </li>
    // <li class="header__li">
    //     <a href="/reservar" class="header__a">Reservar</a>
    // </li>
    //    <li class="header__li">
    //     <a href="/ayuda" class="header__a">Ayuda</a>
    // </li>
    // <li class="header__li li-signin">
    //     <a href="/signin" class="header__a header__a--active">Sign In</a>
    // </li>
    // <li class="header__li li-signup">
    //     <a href="/signup" class="header__a">Sign Up</a>
    // </li>`;

    //         const success = `<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    // <script>
    //     Swal.fire({
    //         position: 'top-end',
    //         icon: 'success',
    //         title: 'Iniciaste sesión con ${login.nombre}',
    //         showConfirmButton: false,
    //         timer: 1500
    //     })
    // </script>`;

    //         res.render("client", { alert: success, btnNav: btnNav });
    //     } else if (login.correo === admin.correo && login.pass === admin.pass) {
    //         const pageTitle = "Bienvenido Admin - Cabañas Bello Atardecer";

    //         const btnNav = `
    // <li class="header__li">
    //     <a href="/" class="header__a">Inicio</a>
    // </li>
    // <li class="header__li">
    //     <a href="/reservar" class="header__a">Reservar</a>
    // </li>
    // <li class="header__li">
    //     <a href="/ayuda" class="header__a">Ayuda</a>
    // </li>
    // <li class="header__li li-signin">
    //     <a href="/signin" class="header__a header__a--active">Sign In</a>
    // </li>
    // <li class="header__li li-signup">
    //     <a href="/signup" class="header__a">Sign Up</a>
    // </li>`;

    //         const success = `<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    // <script>
    //     Swal.fire({
    //            position: 'top-end',
    //         icon: 'success',
    //         title: 'Iniciaste sesión con ${login.nombre}: Administrador',
    //         showConfirmButton: false,
    //         timer: 1500
    //     })
    // </script>`;

    //         res.render("admin", {
    //             title: pageTitle,
    //             btnNav: btnNav,
    //             alert: success,
    //         });
    //     }
};

const userFront = async (req, res) => {
    if (login !== "" && login !== null) {
        res.json(login);
    }
};

module.exports = { pageSignin, userSignin, userFront };
