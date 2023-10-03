const express = require("express");
const { validationResult } = require("express-validator");
const { client } = require("../database/conexion");
const { login } = require("./signinControllers");

const pageSignup = (req, res) => {
    const pageTitle = "Crea tu cuenta - Cabañas Bello Atardecer";

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
    <a href="/signin" class="header__a">Sign In</a>
</li>
<li class="header__li li-signup">
    <a href="/signup" class="header__a header__a--active">Sign Up</a>
</li>`;

    res.render("signup", { title: pageTitle, btnNav: btnNav });
};

const userSignup = async (req, res) => {
    const { nombre, nacimiento, correo, pass } = req.body;

    const userNew = {
        nombre: nombre,
        nacimiento: nacimiento,
        correo: correo,
        pass: pass,
    };

    const db = client.db("clientes");

    if (
        (await db.collection("Cuentas").findOne({ correo: userNew.correo })) ===
        null
    ) {
        await db.collection("Cuentas").insertOne(userNew);
        console.log("Datos insertado");

        const success = `<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<script>
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Creaste un nuevo usuario',
        showConfirmButton: false,
        timer: 1500
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

        res.render("signin", { alert: success, btnNav: btnNav });
    } else {
        const error = `
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<script>
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error al registrar los datos!',
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
    <a href="/signin" class="header__a">Sign In</a>
</li>
<li class="header__li li-signup">
    <a href="/signup" class="header__a header__a--active">Sign Up</a>
</li>`;

        res.render("signup", { alert: error, btnNav: btnNav });
    }
};

module.exports = { pageSignup, userSignup };
