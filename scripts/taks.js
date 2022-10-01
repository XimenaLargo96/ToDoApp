// SEGURIDAD: Si no se encuentra en localStorage info del usuario
// no lo deja acceder a la página, redirigiendo al login inmediatamente.



/* ------ comienzan las funcionalidades una vez que carga el documento ------ */
window.addEventListener('load', function () {

  /* ---------------- variables globales y llamado a funciones ---------------- */
  const btnCerrarSesion = document.getElementById('closeApp');
  const nombreUsuario = document.querySelector('.user-info p');
  const contenedorTareasPendientes = document.querySelector('.tareas-pendientes');
  const contenedorTareasTerminadas = document.querySelector('.tareas-terminadas');
  const formCrearTarea = document.querySelector('form.nueva-tarea');
  const inputCrearTarea = document.getElementById('nuevaTarea');
  const tareas = document.querySelectorAll('change')

  const ENDPOINTBASE = 'https://ctd-fe2-todo.herokuapp.com/v1';
  const JWT = localStorage.getItem('jwt');

  /* -------------------------------------------------------------------------- */
  /*                          FUNCIÓN 1 - Cerrar sesión                         */
  /* -------------------------------------------------------------------------- */

  document.addEventListener("click", function (e) {
    const payload = {
      description: e.target.description,
      completed: true,
    };
    if (e.target.classList.contains("incompleta")) {
      payload.completed = false;
    }
    
    botonesCambioEstado(e.target.id, payload);
    
  });

  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("borrar")) {
      botonBorrarTarea(e.target.id);
    }
  });


  btnCerrarSesion.addEventListener('click', function () {
   
    const confirmacion = confirm('¿Seguro desea cerrar sesión?');

    // si lo confirmó, cerramos la sesion
    if (confirmacion) {
      //  limpiamos el storage
      localStorage.clear();
      // lo llevamos a la pantalla de login
      location.replace('./');
    }

  });

  /* -------------------------------------------------------------------------- */
  /*                 FUNCIÓN 2 - Obtener nombre de usuario [GET]                */
  /* -------------------------------------------------------------------------- */

  function obtenerNombreUsuario() {

    const url = `${ENDPOINTBASE}/users/getMe`;
     
    const settings ={
      method: 'GET',
      headers: {
        authorization: JWT
      }
    }

    fetch(url,settings)
      .then(response => {
        return response.json()
      })
      .then(data =>{
      nombreUsuario.innerText = data.firstName
    })

  };

obtenerNombreUsuario();

  /* -------------------------------------------------------------------------- */
  /*                 FUNCIÓN 3 - Obtener listado de tareas [GET]                */
  /* -------------------------------------------------------------------------- */

function consultarTareas() {
    
    const url = `${ENDPOINTBASE}/tasks`;

    const settings ={
      method:'GET',
      headers:{
        authorization: JWT
      }
    }
    fetch(url,settings)
    .then(response =>{
      return response.json()
    })
    .then(data =>{
      renderizarTareas(data);
    })

  };
  consultarTareas();

  /* -------------------------------------------------------------------------- */
  /*                    FUNCIÓN 4 - Crear nueva tarea [POST]                    */
  /* -------------------------------------------------------------------------- */

   formCrearTarea.addEventListener('submit', function (event) {
    
    event.preventDefault();

    const payload = {
      description:inputCrearTarea.value,
      completed: false
    }

    crearTarea(payload)

    formCrearTarea.reset();

   });

   function crearTarea(tarea) {
    
    const url = `${ENDPOINTBASE}/tasks`

    const settings ={
      method:'POST',
      body: JSON.stringify(tarea),
      headers: {
        authorization: JWT,
        'Content-type': "application/json"
      }
    }
    fetch(url, settings)
    .then(response => {
      return response.json()
    })
    .then(data =>{
      consultarTareas();
    })

   }
  

  /* -------------------------------------------------------------------------- */
  /*                  FUNCIÓN 5 - Renderizar tareas en pantalla                 */
  /* -------------------------------------------------------------------------- */
 function renderizarTareas(listado) {
  contenedorTareasPendientes.innerHTML = '';
  contenedorTareasTerminadas.innerHTML = '';

  const arrayPendientes = []
  const arrayTerminadas =[]

  for (let i = 0; i < listado.length; i++) {
    if (!listado[i].completed) {
      arrayPendientes.push(listado[i])
    }
    else{
      arrayTerminadas.push(listado[i])
    }
  }
  arrayPendientes.forEach(element => {
    contenedorTareasPendientes.innerHTML +=`
    <li class="tarea" data-aos="fade-down">
        <button class="change" id="${element.id}"><i class="fa-regular fa-circle"></i></button>
        <div class="descripcion">
          <p class="nombre">${element.description}</p>
          <p class="timestamp">${element.createdAt}</p>
        </div>
      </li>
    `
  });
  arrayTerminadas.forEach(element => {
    contenedorTareasTerminadas.innerHTML +=`
    <li class="tarea" data-aos="fade-up">
        <div class="hecha">
          <i class="fa-regular fa-circle-check"></i>
        </div>
        <div class="descripcion">
          <p class="nombre">${element.description}</p>
          <div class="cambios-estados">
            <button class="change incompleta" id="${element.id}" ><i class="fa-solid fa-rotate-left"></i></button>
            <button class="borrar" id="${element.id}"><i class="fa-regular fa-trash-can"></i></button>
          </div>
        </div>
      </li>
      `
  });
 
  };
  /* -------------------------------------------------------------------------- */
  /*                  FUNCIÓN 6 - Cambiar estado de tarea [PUT]                 */
  /* -------------------------------------------------------------------------- */

  function botonesCambioEstado(id, cambio) {
    
   const url = `${ENDPOINTBASE}/tasks/${id}`
    
    const settings ={
      method: 'PUT',
      body:JSON.stringify(cambio),
      headers: {
        authorization: JWT,
        'Content-type': "application/json"
      }
    }
    fetch(url, settings)
    .then(response => {
      return response.json()
    })
    .then(data =>{
       consultarTareas();
    })
  }

  /* -------------------------------------------------------------------------- */
  /*                     FUNCIÓN 7 - Eliminar tarea [DELETE]                    */
  /* -------------------------------------------------------------------------- */
  function botonBorrarTarea(id) {
   

    const url = `${ENDPOINTBASE}/tasks/${id}`
    
    const settings ={
      method: 'DELETE',
      headers: {
        authorization: JWT
      }
    }
    fetch(url, settings)
    .then(response => {
      return response.json()
    })
    .then(data =>{
       consultarTareas();
    })

  };

});