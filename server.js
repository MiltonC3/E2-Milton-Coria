const { app, PORT } = require("./app.js");
require("./database/conexion").conexion();

const server = app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

server.on("error", (err) => {
    console.log(`Server error: ${err}`);
});
