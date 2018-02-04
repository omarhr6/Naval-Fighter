var usuarioRegistrado;
var contraseñaCorrecta;

window.onload = function() {
  $("#boton-logear").click(logearUsuario);
  $("body").css("display", "none");
  $("body").fadeIn(500);
  $("#boton-volver").on('click', function() {location.href= "../index.html";});
};

// Función para logear usuario registrado en localStorage //
function logearUsuario() {
  usuarioRegistrado = false;
  contraseñaCorrecta = false;
  var arrayUsuario = [];
  var user = $("#txtNombreUsuario").val();
  var contraseña = $("#txtPassword").val();

  var datos = [user, contraseña];

  for (i = 1; i < localStorage.length; i++) {
    var idusuario = "Usuario " + i;
    arrayUsuario = JSON.parse(localStorage.getItem(idusuario));
    if (arrayUsuario[0].toString() == datos[0].toString()) {
      usuarioRegistrado = true;
    }
    if (arrayUsuario[4].toString() == datos[1].toString()) {
      contraseñaCorrecta = true;
    }
  }

  if (usuarioRegistrado == true && contraseñaCorrecta == true) {
    sessionStorage.setItem("Usuario", datos[0].toString());
    location.href = "game.html";
  }

  if (usuarioRegistrado == false) {
    $('#mensajeError').css("display", "inline-block");
    $('#mensajeError').html("Usuario Incorrecto <a href='register.html'>Ir a Registrarse</a>");
  } else if (contraseñaCorrecta == false) {
    $('#mensajeError').css("display", "inline-block");
    $('#mensajeError').html("Contraseña Incorrecta <a href='password.html'>¿Olvido contraseña?</a>");
  }
}
