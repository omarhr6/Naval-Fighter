window.onload = function () {
    $("body").css("display", "none");
    $("body").fadeIn(500);
    $("#boton-volver").on('click', function() {location.href= "game.html";});
};