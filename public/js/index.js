function menu(name, user) {
    const navUl = document.getElementById("nav");

    navUl.innerHTML = `
<li class="header__li">
    <a id="inicio" href="/" class="header__a">Inicio</a>
</li>
<li class="header__li">
    <a id="reservar" href="/reservar" class="header__a">Reservar</a>
</li>
<li class="header__li">
    <a id="ayuda" href="/ayuda" class="header__a">Ayuda</a>
</li>
<li class="header__li li-btnUno">
    <a id="${user}" href="/${user}" class="header__a">${name}</a>
</li>
<li class="header__li li-btnDos">
    <a href="/signout" id="signout" class="header__a">Sign Out</a>
</li>`;
}

function activeMenu(nav1, nav2, nav3, nav4, nav5) {
    const navUno = document.getElementById(nav1);
    const navDos = document.getElementById(nav2);
    const navTres = document.getElementById(nav3);
    const navCuatro = document.getElementById(nav4);
    const navCinco = document.getElementById(nav5);

    // Tu código aquí
    var rutaRelativa = window.location.pathname;

    rutaRelativa === `/` ? navUno.classList.add("header__a--active") : "";
    rutaRelativa === `/${nav2}`
        ? navDos.classList.add("header__a--active")
        : "";
    rutaRelativa === `/${nav3}`
        ? navTres.classList.add("header__a--active")
        : "";
    rutaRelativa === `/${nav4}`
        ? navCuatro.classList.add("header__a--active")
        : "";
    rutaRelativa === `/${nav5}`
        ? navCinco.classList.add("header__a--active")
        : "";
}

activeMenu("inicio", "reservar", "ayuda", "signin", "signup");

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
        if (data.login !== undefined) {
            localStorage.setItem("user", JSON.stringify(data));

            const storage = JSON.parse(localStorage.getItem("user"));

            if (
                storage.login.correo !== "" &&
                storage.login.correo !== "miltoncoria03@gmail.com"
            ) {
                menu(storage.login.nombre, "client");

                activeMenu("inicio", "reservar", "ayuda", "client", "signout");
            } else if (storage.login.correo === "miltoncoria03@gmail.com") {
                menu(storage.login.nombre, "admin");

                activeMenu("inicio", "reservar", "ayuda", "admin", "signout");
            }
        } else {
            localStorage.clear();
        }
    })
    .catch((error) => {
        console.error("Error:", error);
    });

    // ************************************************
{/* <button type="submit" formmethod="post" formaction="/ruta-del-servidor">Enviar</button> */}
    // ************************************************

// document.addEventListener("DOMContentLoaded", function () {
//     const { value: pass } = Swal.fire({
//         title: "Enter your password",
//         input: "password",
//         inputLabel: "Password",
//         inputPlaceholder: "Enter your password",
//         inputAttributes: {
//             maxlength: 10,
//             autocapitalize: "off",
//             autocorrect: "off",
//         },
//         inputValidator: (value) => {
//             if (!value) {
//                 return "You need to write something!";
//             } else if (value.length === 4) {
//                 fetch("/alert", {
//                     method: "POST",
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                     body: JSON.stringify({ pin: value }),
//                 })
//                     .then((response) => {
//                         if (!response.ok) {
//                             Swal.fire(`correcto`);
//                             return response.json();
//                         } else {
//                             throw new Error("Error al realizar la solicitud");
//                         }
//                     })
//                     // .then((data) => {
//                     //     console.log(data);
//                     // })
//                     // .catch((error) => {
//                     //     // Manejar errores
//                     //     console.error("Error:", error);
//                     // });

//                 return Swal.fire({
//                     position: "top-end",
//                     icon: "success",
//                     title: "Your work has been saved",
//                     showConfirmButton: false,
//                     timer: 1500,
//                 });
//             } else {
//                 return "You need to write something!";
//             }
//         },
//     });
// });

// Swal.fire({
//     title: "Submit your Github username",
//     input: "text",
//     inputAttributes: {
//         autocapitalize: "off",
//     },
//     showCancelButton: true,
//     confirmButtonText: "Look up",
//     showLoaderOnConfirm: true,
//     preConfirm: (input) => {
//         return fetch('/alert',{
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//               },
//             body: JSON.stringify({nombre:input})
//         })
//             .then((response) => {
//                 if (!response.ok) {

//                     return response.json();
//                 } else{
//                     throw new Error('Error al realizar la solicitud');
//                 }

//             })
//             .catch((data) => {
//                 Swal.showValidationMessage(`Request success`);
//             });
//     },
//     // allowOutsideClick: () => !Swal.isLoading(),
// }).then((result) => {
//     if (result) {
//         Swal.fire({
//             title: `${result.value.login}'s avatar`,
//             imageUrl: result.value.avatar_url,
//         });
//     }
// });
