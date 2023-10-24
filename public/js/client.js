if (window.location.pathname === "/client") {
    fetch("/client", {
        method: "GET",
    }).then((data) => {
        clientMisDatos();
    });
}
