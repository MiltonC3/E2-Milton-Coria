if (window.location.pathname === "/admin") {
    fetch("/admin", {
        method: "GET",
    }).then((data) => {
        adminSectionDatos();
    });
}

if (window.location.pathname === "/adminclientes") {
    fetch("/adminlistaclientes", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json", // Tipo de contenido de los datos
        },
    })
        .then((response) => response.json())
        .then((data) => {
            adminSectionClientes(data);
        })
        .catch((error) => console.error(error));
}

if (window.location.pathname === "/adminreservas") {
    fetch("/adminreservas", {
        method: "GET",
    })
        .then((data) => {
            adminSectionReservas();
        })
        .catch((error) => console.error(error));
}

if (window.location.pathname === "/adminconsultas") {
    fetch("/adminconsultas", {
        method: "GET",
    })
        .then((data) => {
            adminSectionConsultas();
        })
        .catch((error) => console.error(error));
}
