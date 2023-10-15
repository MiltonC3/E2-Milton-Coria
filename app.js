// requires
const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
require("dotenv").config();
// rutas
const ayudaRoutes = require("./routes/ayudaRoutes");
const inicioRoutes = require("./routes/inicioRoutes");
const reservarRoutes = require("./routes/reservarRoutes");
const signinRoutes = require("./routes/signinRoutes");
const adminRoutes = require("./routes/adminRoutes");
const clientRoutes = require("./routes/clientRoutes");
const signupRoutes = require("./routes/signupRoutes");

const PORT = process.env.PORT;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./public")));

app.set("view engine", "hbs");

app.set("views", path.join(__dirname, "./views"));

hbs.registerPartials(path.join(__dirname, "./views/partials"));

app.use(
    "/",
    ayudaRoutes,
    inicioRoutes,
    reservarRoutes,
    signinRoutes,
    adminRoutes,
    clientRoutes,
    signupRoutes
);

module.exports = {
    app,
    PORT,
};
