// Se agrega un 'event listener' que espera a que se cargue todo el contenido del DOM.
document.addEventListener("DOMContentLoaded", function () {
  // Asignación de funciones de validación a eventos 'oninput' para validar en tiempo real.
  document.getElementById("primerNombre").oninput = validarPrimerNombre;
  document.getElementById("primerApellido").oninput = validarPrimerApellido;
  document.getElementById("numeroDocumento").oninput = validarNumeroDocumento;
  document.getElementById("direccion").oninput = validarDireccion;

  // Deshabilitar el campo 'Número de Documento' inicialmente.
  document.getElementById("numeroDocumento").disabled = true;
});

// Función que se llama cuando se intenta enviar el formulario.
function validarFormulario() {
  // Se realizan todas las validaciones y se almacena el resultado (verdadero o falso).
  let esValido =
    validarPrimerNombre() &&
    validarPrimerApellido() &&
    validarTipoDocumento() &&
    validarNumeroDocumento() &&
    validarEmail() &&
    validarDireccion();

  if (esValido) {
    // Mostrar un mensaje de éxito si todas las validaciones son correctas.
    alert("Te has logeado correctamente");
    return true; // Permitir que el formulario se envíe.
  } else {
    // Si hay errores, evitar que el formulario se envíe.
    return false;
  }
}

function validarEmail() {
  let email = document.getElementById("email").value;
  let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return mostrarError("campoEmail", regex.test(email));
}

function resetearFormulario() {
  document.querySelectorAll(".formulario__campo--error").forEach((campo) => {
    campo.classList.remove("formulario__campo--error");
  });
  // Limpieza de resumen de errores si existe
  document.getElementById("resumenErrores").innerText = "";
}

function validarPrimerNombre() {
  let nombre = document.getElementById("primerNombre").value;
  let regex =
    /^[A-Za-zñÑáéíóúÁÉÍÓÚ]{1}[a-zñáéíóú]{2,9}(?:\s[A-Za-zñÑáéíóúÁÉÍÓÚ]{1}[a-zñáéíóú]{2,9})*$/;
  return mostrarError("campoPrimerNombre", regex.test(nombre) || nombre === "");
}

// Función similar para validar el campo 'Primer Apellido'.
function validarPrimerApellido() {
  let apellido = document.getElementById("primerApellido").value;
  let regex = /^[A-Za-zñÑáéíóúÁÉÍÓÚ' ]{2,20}$/;
  return mostrarError("campoPrimerApellido", regex.test(apellido));
}

// Función para validar la selección del 'Tipo de Documento'.
function validarTipoDocumento() {
  // Verificar si alguna opción está seleccionada.
  let seleccionado = document.querySelector(
    'input[name="tipoDocumento"]:checked'
  );
  return mostrarError("campoTipoDocumento", seleccionado !== null);
}

// Función para validar el campo 'Número de Documento'.
function validarNumeroDocumento() {
  let tipoDocumento = document.querySelector(
    'input[name="tipoDocumento"]:checked'
  )?.value;
  let numero = document.getElementById("numeroDocumento").value;

  if (tipoDocumento === "DNI") {
    let regexDNI = /^(?:\d{1,3}\.){0,2}\d{1,3}$/;
    return mostrarError("campoNumeroDocumento", regexDNI.test(numero));
  } else if (tipoDocumento === "CUIL") {
    let regexCUIL = /^\d{2}-\d{8}-\d$/;
    return mostrarError("campoNumeroDocumento", regexCUIL.test(numero));
  }

  return false;
}

// Función para validar el campo 'Dirección'.
function validarDireccion() {
  let direccion = document.getElementById("direccion").value;
  let regex = /^[A-Za-zñÑáéíóúÁÉÍÓÚ0-9\s,.\-()'"°\/]{10,200}$/;
  return mostrarError(
    "campoDireccion",
    direccion === "" || regex.test(direccion)
  );
}

// Función para mostrar u ocultar mensajes de error.
function mostrarError(campoId, esValido) {
  // Obtener el elemento del campo por su ID.
  let campo = document.getElementById(campoId);
  // Si el campo no es válido, se agrega la clase para mostrar el error.
  if (!esValido) {
    campo.classList.add("formulario__campo--error");
  } else {
    // Si el campo es válido, se elimina la clase para ocultar el error.
    campo.classList.remove("formulario__campo--error");
  }
  // Devuelve el resultado de la validación.
  return esValido;
}

// Función para habilitar el campo 'Número de Documento' cuando se selecciona un tipo de documento.
function habilitarNumeroDocumento() {
  document.getElementById("numeroDocumento").disabled = false;
}
