var numeroUsuario = 0;
var usuarioRegistrado;
var emailReg = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;

window.onload = function () {
  $("#boton-enviar").click(comprobarCampos);
  $("body").css("display", "none");
  $("body").fadeIn(500);
  $("#boton-volver").on('click', function () {
    location.href = "../index.html";
  });
};

// Funcion para comprobar los campos //
function comprobarCampos() {
  if ($('#txtNombreUsuario').val() == "") {
    $('#mensajeError').css("display", "inline-block");
    $('#mensajeError').html("El campo usuario no puede estar vacío");
  } else if ($('#txtNombre').val() == "") {
    $('#mensajeError').css("display", "inline-block");
    $('#mensajeError').html("El campo nombre no puede estar vacío");
  } else if ($('#txtApellido').val() == "") {
    $('#mensajeError').css("display", "inline-block");
    $('#mensajeError').html("El campo apellido no puede estar vacío");
  } else if (!emailReg.test($('#txtEmail').val())) {
    $('#mensajeError').css("display", "inline-block");
    $('#mensajeError').html("El correo introducido es incorrecto");
  } else if ($('#txtPassword').val() == "") {
    $('#mensajeError').css("display", "inline-block");
    $('#mensajeError').html("El campo contraseña no puede estar vacío ");
  } else if ($('#txtRetryPassword').val() != $('#txtPassword').val()) {
    $('#mensajeError').css("display", "inline-block");
    $('#mensajeError').html("Las contraseñas no coinciden");
  } else {
    insertarStorage();
  }
}

// Función para insertar usuario nuevo en el local Storage //
function insertarStorage() {
  usuarioRegistrado = false;
  var arrayUsuario = [];
  var user = $("#txtNombreUsuario").val();
  var nombre = $("#txtNombre").val();
  var apellido = $("#txtApellido").val();
  var correo = $("#txtEmail").val();
  var contraseña = $("#txtPassword").val();
  var enemigosMatados = 0;

  var datos = [user, nombre, apellido, correo, contraseña, enemigosMatados];

  numeroUsuario = localStorage.getItem("idUsuario");
  if (numeroUsuario == null) {
    numeroUsuario = 0;
  }
  numeroUsuario++;

  for (i = 1; i <= localStorage.length - 1; i++) {
    var idusuario = "Usuario " + i;
    arrayUsuario = JSON.parse(localStorage.getItem(idusuario));
    if (arrayUsuario[0].toString() == datos[0].toString()) {
      $('#mensajeError').css("display", "inline-block");
      $('#mensajeError').html("Usuario ya registro");
      usuarioRegistrado = true;
    }
    if (arrayUsuario[3].toString() == datos[3].toString()) {
      $('#mensajeError').css("display", "inline-block");
      $('#mensajeError').html("Correo Electronico ya registrado");
      usuarioRegistrado = true;
    }
  }

  if (usuarioRegistrado == false) {
    localStorage.setItem("Usuario " + numeroUsuario, JSON.stringify(datos));
    localStorage.setItem("idUsuario", numeroUsuario);
    location.href = "login.html";
  }
}