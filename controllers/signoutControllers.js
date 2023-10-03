const express = require("express");
const { validationResult } = require("express-validator");
const { client } = require("../database/conexion");

const userSignout = async (req, res) => {
    console.log("cerro sesion");
};

module.exports = userSignout;
