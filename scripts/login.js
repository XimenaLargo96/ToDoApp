/* --------------- COMPROBACION, antes de la carga del DOM 👇 --------------- */

// evaluar si hay un token para mandarlo directo a sus tareas
const jwt = localStorage.getItem('jwt');

if (jwt) {
    // usamos el replace para no guardar en el historial la url anterior
    location.replace('/mis-tareas.html');
}
/* ------------------------------------ ☝ ----------------------------------- */

window.addEventListener('load', function () {
    /* ---------------------- obtenemos variables globales ---------------------- */
   const form = document.querySelector('form');
   const fieldEmail = document.getElementById('inputEmail');
   const fieldPassword = document.getElementById('inputPassword');

   const URLBASE = "https://ctd-fe2-todo.herokuapp.com/v1"

    /* -------------------------------------------------------------------------- */
    /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
    /* -------------------------------------------------------------------------- */
    form.addEventListener('submit', function (event) {
       event.preventDefault();

        const payload ={
            email: fieldEmail.value,
            password: fieldPassword.value
        }

        realizarLogin(payload)

        form.reset();

    });


    /* -------------------------------------------------------------------------- */
    /*                     FUNCIÓN 2: Realizar el login [POST]                    */
    /* -------------------------------------------------------------------------- */
    function realizarLogin(user) {
       
        const settings = {
            method : 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const url = `${URLBASE}/users/login`

        fetch(url,settings)
        .then(response =>{
            return response.json();
        })
        .then(data => {
            console.log(data.jwt);
            localStorage.setItem('jwt', data.jwt);

            location.replace('./mis-tareas.html')
        })
        .catch((err) => {
            console.log(err);
          });
    };

});