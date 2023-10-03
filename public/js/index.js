fetch("/userFront", {
  method: "GET",
})
  .then((response) => {
      if (response.ok) {
          return response.json();
      } else {
          throw new Error("Error al realizar la solicitud");
      }
  })
  .then((data) => {
      console.log("Datos recibidos:", data);
      localStorage.setItem("user", JSON.stringify(data));
  })
  .catch((error) => {
      console.error("Error:", error);
  });
 