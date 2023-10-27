const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();

const MONGOLOCAL = process.env.MONGO_URL_LOCAL;
const MONGOATLAS = process.env.MONGO_URL_ATLAS;

const client = new MongoClient(MONGOATLAS);

async function conexion() {
    try {
        await client.connect();
        console.log(`Conexión establecida a la base de datos de MongoDB Atlas`);
    } catch (error) {
        console.error("Error al conectar a MongoDB Atlas", error);
    }
}

module.exports = {
    client,
    conexion,
    ObjectId
};
