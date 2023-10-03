const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const hbs = require("hbs");
require("dotenv").config();
const fs = require("fs");
// rutas
const ayudaRoutes = require("./routes/ayudaRoutes");
const inicioRoutes = require("./routes/inicioRoutes");
const reservarRoutes = require("./routes/reservarRoutes");
const signinRoutes = require("./routes/signinRoutes");
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
    signupRoutes
);

module.exports = {
    app,
    PORT,
};
