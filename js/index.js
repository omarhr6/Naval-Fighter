window.onload = function () {
    $("body").css("display", "none");
    $("body").fadeIn(500);
    asignarEventos();
};

function asignarEventos() {
    $('#boton-login').on('click', function() {
        location.href = ('portfolio/login.html');
    })

    $('#boton-register').on('click', function() {
        location.href = ('portfolio/register.html');
    })
}