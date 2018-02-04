var sessionUsuario;
var todosUsuarios = [];
var infoUsuario = [];
var idUsuario;

window.onload = function () {
    $("body").css("display", "none");
    $("body").fadeIn(500);
    recogerInfoStorage();

    $("#boton-volver").on('click', function () {
        location.href = "game.html";
    });
};

function recogerInfoStorage() {
    sessionUsuario = sessionStorage.getItem("Usuario");

    for (var i = 1; i < localStorage.length; i++) {
        var datosUsuario = localStorage.getItem('Usuario ' + i);
        datosUsuario = JSON.parse(datosUsuario);
        todosUsuarios.push(datosUsuario);

        if (todosUsuarios[i - 1][0] == sessionStorage.Usuario) {
            var usuario = localStorage.getItem('Usuario ' + i);
            idUsuario = 'Usuario ' + i;
            usuario = JSON.parse(usuario);
            infoUsuario.push(usuario);
        }
    }

    var $contenedor = $('h4');
    $($contenedor[0]).append(infoUsuario[0][0]);
    $($contenedor[1]).append(infoUsuario[0][1]);
    $($contenedor[2]).append(infoUsuario[0][2]);
    $($contenedor[3]).append(infoUsuario[0][3]);
    $($contenedor[4]).append(infoUsuario[0][5]);
}