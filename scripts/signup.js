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
   const fieldName = document.getElementById('inputNombre');
   const fieldLastName = document.getElementById('inputApellido');
   const fieldEmail = document.getElementById('inputEmail');
   const fieldPassword = document.getElementById('inputPassword');
   const fieldRepeatPassword = document.getElementById('inputPasswordRepetida')
   const btnenviar = document.querySelector('button')

    const inputs = document.querySelectorAll('input')

    const URLBASE = "https://ctd-fe2-todo.herokuapp.com/v1"

    /* -------------------------------------------------------------------------- */
    /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
    /* -------------------------------------------------------------------------- */
    
    inputs.forEach((input) => input.addEventListener('blur', (e) => validationForm(e)))


    form.addEventListener('submit', function (event) {
        
        event.preventDefault();
        
        const payload={
            firstName:normalizarTexto(fieldName.value),
            lastName: normalizarTexto(fieldLastName.value),
            email: normalizarEmail(fieldEmail.value) ,
            password: normalizarPassword(fieldPassword.value)
        }
        realizarRegister(payload)
        form.reset();         

    })

//  Validamos que cada campo cumpla las validaciones correspondientes 

    function validationForm (e) {
        switch (e.target) {
            case fieldName:
                validarTexto(fieldName, btnenviar);
                break;
            case fieldLastName:
                validarTexto(fieldLastName, btnenviar);
                break;
            case fieldEmail:
                validarEmail(fieldEmail, btnenviar);
                break;
            case fieldPassword:
                validarContrasenia(fieldPassword, btnenviar);
                break;
            case fieldRepeatPassword:
                compararContrasenias(fieldPassword , fieldRepeatPassword, btnenviar)
                break;
            default:
                break;
        }
    }
    /* -------------------------------------------------------------------------- */
    /*                    FUNCIÓN 2: Realizar el signup [POST]                    */
    /* -------------------------------------------------------------------------- */
    function realizarRegister(user) {
        
        const settings={
            method: 'POST',
            body: JSON.stringify(user),
            headers:{
                'Content-type':'application/json'
            }
        }
        const url = `${URLBASE}/users`

        fetch(url,settings)
        .then(response =>{
            return response.json()
        })
        .then(data =>{
            console.log(data);
            if (data.jwt) {
                //guardo en LocalStorage el objeto con el token
                localStorage.setItem('jwt', data.jwt);

                //redireccionamos a la página
                location.replace('./mis-tareas.html');
            }
            
        }).catch(err => {
            console.log("Promesa rechazada:" + err);
            
        })
    };


});