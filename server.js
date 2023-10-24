const { app, PORT } = require("./app.js");
require("./database/conexion.js").conexion();

const server = app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}/`);
});

server.on("error", (err) => {
    console.log(`Server error: ${err}`);
});
