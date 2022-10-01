/* ---------------------------------- texto --------------------------------- */
const errores = {
    errorTexto : 'Formato inválido, por favor utilice solo letras',
    errorEmail : 'Correo inválido',
    passwordInvalid : 'La contraseña debe tener mínimo 8 carácteres, una letra mayúscula y un carácter especial',
    passCoincidir : 'Las contraseñas deben coincidir'
}


function error (error, nodo){
    if (!nodo.nextElementSibling.classList.contains('invalidField')) {
        const msg = `<p class="invalidField">${error}</p>`
        nodo.classList.add('error')
        nodo.insertAdjacentHTML('afterend', msg)
    }
}

function fieldValidation(nodo, btn) {
    nodo.nextElementSibling.remove()
    nodo.classList.remove('error')
    btn.removeAttribute('disabled')
}


function validarTexto(texto, btn) {

    const regUserName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;

    if (!regUserName.test(texto.value) || !texto.value.trim()) {
        error(errores.errorTexto , texto); 
        btn.setAttribute('disabled','') 
     }
     
    else if(texto.classList.contains('error')) {
           fieldValidation(texto, btn)
    }
}

function normalizarTexto(texto) {
    return texto.trim().toUpperCase();
}

/* ---------------------------------- email --------------------------------- */
function validarEmail(email, btn) {

    const regUserEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if (!regUserEmail.test(email.value)) {
    error(errores.errorEmail , email);
    btn.setAttribute('disabled','')
    }
    else if(email.classList.contains('error')) {
        fieldValidation(email, btn)
    }
}

function normalizarEmail(email) {
    let normalizado = email.trim().toUpperCase();
    return normalizado
}

/* -------------------------------- password -------------------------------- */

function validarContrasenia(contrasenia, btn) {

   const regPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/g;

    if (!regPassword.test(contrasenia.value)) {
    error(errores.passwordInvalid , contrasenia);
    btn.setAttribute('disabled','')
    }
    else if(contrasenia.classList.contains('error')) {
       fieldValidation(contrasenia, btn)
    }
}

function normalizarPassword(password) {
    let normalizado = password.trim()
    return normalizado
}


function compararContrasenias(contrasenia_1, contrasenia_2, btn) {

    if (contrasenia_1.value !== contrasenia_2.value) {
        error(errores.passCoincidir , contrasenia_2);
        btn.setAttribute('disabled','')
    }
    else if(contrasenia_2.classList.contains('error')) {
        fieldValidation(contrasenia_2, btn)
    }
}

