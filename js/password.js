var usuarioRegistrado = false;
var nombreCorrecto = false;
var emailCorrecto = false;

window.onload = function() {
  $("#boton-recuperar").click(recuperarPass);
  $("body").css("display", "none");
  $("body").fadeIn(500);

  $("#boton-volver").on('click', function() {location.href= "login.html";});
};

function recuperarPass() {
  var arrayUsuario = [];
  var user = $("#txtNombreUsuario").val();
  var nombre = $("#txtNombre").val();
  var correo = $("#txtEmail").val();

  var datos = [user, nombre, correo];

  for (i = 1; i < localStorage.length; i++) {
    var idusuario = "Usuario " + i;
    arrayUsuario = JSON.parse(localStorage.getItem(idusuario));

    //Comprobaciones de si el usuario y sus datos son correctos //
    if (arrayUsuario[0].toString() == datos[0].toString()) {
      usuarioRegistrado = true;
    } else {
      usuarioRegistrado = false;
    }

    if (arrayUsuario[1].toString() == datos[1].toString()) {
      nombreCorrecto = true;
    } else {
      nombreCorrecto = false;
    }

    if (arrayUsuario[3].toString() == datos[2].toString()) {
      emailCorrecto = true;
    } else {
      emailCorrecto = false;
    }
  }

  if (usuarioRegistrado == true && nombreCorrecto == true && emailCorrecto == true) {
    var contraseña = arrayUsuario[4].toString();      
    document.getElementById("mensajePassword").innerHTML =
      "Usuario encontrado con exito... <br/><span>Su contraseña es: " + contraseña + "</span><br/><a href='login.html'>Ir al login</a>";
  }

  if (usuarioRegistrado == false || nombreCorrecto == false || emailCorrecto == false) {
    document.getElementById("mensajePassword").innerHTML =
      "Información incorrecta... <br/><a href='register.html'>Ir a Registrase</a>";
  }
}
