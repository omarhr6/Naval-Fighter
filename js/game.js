var game;
var background;
var player;
var cursors;
var disparos;
var balasAliadas;
var balaEnemiga;
var balaEnemiga2;
var balaEnemiga3;
var balaEnemiga4;
var balaEnemiga5;
var balaEnemiga6;
var balaEnemiga7;
var cadencia = 0;
var enemigos;
var botondisparos;
var explosions;
var barra;
var vidas;
var posicion;
var contador = 12;
var avion;
var left;
var right;
var timer;
var timer2;
var timer3;
var timerNivel;
var contenedor;
var sonidoDisparo;
var sonidoExplosion;
var sonidoFondo;
var islotes;
var islote;
var objetoVida;
var objetosVida;
var contadorDuracion = 0;

var enemigo;

var contadorNivel = 0;

var jsonLevel1;
var jsonLevel2;
var jsonLevel3;
var jsonActivo;
var aleatorio;

var contadorDeGrupos = -1;
var contadorBoss = 0;

var firingTimer = 0;
var livingEnemies = [];

var stateText;
var stateText2;
var stateText3;

window.onload = function () {
  $("body").css("display", "none");
  $("body").fadeIn(500);
  contenedor = document.getElementById("contenedor-juego");
  asignarEventos();

  var contenedorUsuario = document.getElementById("mensaje-usuario");
  contenedorUsuario.textContent = sessionStorage.getItem("Usuario");
  contenedorUsuario.innerHTML += " <a href='profile.html'>Página Usuario</a>";
  contenedorUsuario.innerHTML += " <a href='login.html'>Cerrar Seción</a>";
};

function asignarEventos() {
  var $botones = $('button');

  $($botones[0]).on('click', function () {
    jsonActivo = 'level1';
    iniciarJuego();
  })

  $($botones[1]).on('click', function () {
    jsonActivo = 'level2';
    iniciarJuego();
  })

  $($botones[2]).on('click', function () {
    jsonActivo = 'level3';
    iniciarJuego();
  })

  $($botones[3]).on('click', function () {
    location.href = "instructions.html";
  })
}

function iniciarJuego() {
  $('#contenedor-introduccion').css('display', 'none');

  game = new Phaser.Game(800, 800, Phaser.CANVAS, contenedor, {
    preload: preload,
    create: create,
    update: update
  });
}

function preload() {
  game.load.image('disparos', '../img/Disparo/2922_image_00291.png');
  game.load.image('disparosEnemigos', '../img/Disparo/2922_image_00291-enemigos.png');
  game.load.image('avionEnemigo1', '../img/Aviones/Aviones Enemigas/2922_image_00162.png');
  game.load.image('avionEnemigo2', '../img/Aviones/Aviones Enemigas/2922_image_00153.png');
  game.load.image('avionEnemigo3', '../img/Aviones/Aviones Enemigas/2922_image_00183.png');
  game.load.image('avionEnemigo4', '../img/Aviones/Aviones Enemigas/2922_image_00229.png');
  game.load.spritesheet('player', '../img/Aviones/Aviones Amigas/Avión 1/2922_image_00325-sprite.png', 51, 47);
  game.load.image('barravida', '../img/Vida/2922_image_00610.png');
  game.load.image('vida', '../img/Vida/2922_image_00619.png');
  game.load.spritesheet('kaboom', '../img/Explosión/2922_image_00091.png', 64, 64, 23);
  game.load.image('background', '../img/Mar/2922_image_00563.jpg');
  game.load.audio('sonidoDisparo', '../sound/2922_sound_00274.mp3');
  game.load.audio('sonidoExplosion', '../sound/battle003.mp3');
  game.load.audio('sonidoFondo', '../sound/guerra-de-las-galaxias-starwras-musica-.mp3');
  game.load.audio('sonidoVida', '../sound/mario-coin.mp3');
  game.load.image('islote1', '../img/Islas/2922_image_00200.png');
  game.load.image('islote2', '../img/Islas/2922_image_00213.png');
  game.load.image('islote3', '../img/Islas/2922_image_00219.png');
  game.load.image('islote4', '../img/Islas/2922_image_00303.png');
  game.load.image('objetoVida', '../img/Objetos/2922_image_00294.png');

  game.load.json('level1', '../json/level1.json');
  game.load.json('level2', '../json/level2.json');
  game.load.json('level3', '../json/level3.json');
  game.load.json('islotes', '../json/islotes.json');
}

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);

  // Cargar JSON con los niveles //
  jsonLevel = game.cache.getJSON(jsonActivo);
  jsonIslotes = game.cache.getJSON('islotes');

  background = game.add.tileSprite(0, 0, 800, 800, "background");

  // Islotes //
  islotes = game.add.group();
  timer2 = game.time.create(false);
  timer2.loop(2000, crearIslotes, this);
  timer2.start();

  // Disparos aliados //
  balasAliadas = game.add.group();
  balasAliadas.enableBody = true;
  balasAliadas.physicsBodyType = Phaser.Physics.ARCADE;
  balasAliadas.createMultiple(30, "disparos");
  balasAliadas.setAll("anchor.x", 0.5);
  balasAliadas.setAll("anchor.y", 0.7);
  balasAliadas.setAll("outOfBoundsKill", true);
  balasAliadas.setAll("checkWorldBounds", true);

  // Avión del jugador //
  avion = game.add.sprite(400, 700, "player");
  avion.frame = 2;
  avion.anchor.set(0.5);
  left = avion.animations.add("left", [0], 50, true);
  right = avion.animations.add("right", [4], 50, true);
  game.physics.arcade.enable(avion);

  // Disparios enemigos //
  balasEnemigas = game.add.group();
  balasEnemigas.enableBody = true;
  balasEnemigas.physicsBodyType = Phaser.Physics.ARCADE;
  balasEnemigas.createMultiple(30, "disparosEnemigos");
  balasEnemigas.setAll("anchor.x", -4.2);
  balasEnemigas.setAll("anchor.y", 0);
  balasEnemigas.setAll("outOfBoundsKill", true);
  balasEnemigas.setAll("checkWorldBounds", true);

  // Disparos adicionales para los aviones de categoría 2 //
  balasEnemigas2 = game.add.group();
  balasEnemigas2.enableBody = true;
  balasEnemigas2.physicsBodyType = Phaser.Physics.ARCADE;
  balasEnemigas2.createMultiple(30, "disparosEnemigos");
  balasEnemigas2.setAll("anchor.x", -4.2);
  balasEnemigas2.setAll("anchor.y", 0);
  balasEnemigas2.setAll("outOfBoundsKill", true);
  balasEnemigas2.setAll("checkWorldBounds", true);

  // Disparos adicionales para los aviones de categoría 3 //
  balasEnemigas3 = game.add.group();
  balasEnemigas3.enableBody = true;
  balasEnemigas3.physicsBodyType = Phaser.Physics.ARCADE;
  balasEnemigas3.createMultiple(30, "disparosEnemigos");
  balasEnemigas3.setAll("anchor.x", -4.2);
  balasEnemigas3.setAll("anchor.y", 0);
  balasEnemigas3.setAll("outOfBoundsKill", true);
  balasEnemigas3.setAll("checkWorldBounds", true);

  balasEnemigas4 = game.add.group();
  balasEnemigas4.enableBody = true;
  balasEnemigas4.physicsBodyType = Phaser.Physics.ARCADE;
  balasEnemigas4.createMultiple(30, "disparosEnemigos");
  balasEnemigas4.setAll("anchor.x", -4.2);
  balasEnemigas4.setAll("anchor.y", 0);
  balasEnemigas4.setAll("outOfBoundsKill", true);
  balasEnemigas4.setAll("checkWorldBounds", true);

  balasEnemigas5 = game.add.group();
  balasEnemigas5.enableBody = true;
  balasEnemigas5.physicsBodyType = Phaser.Physics.ARCADE;
  balasEnemigas5.createMultiple(30, "disparosEnemigos");
  balasEnemigas5.setAll("anchor.x", -4.2);
  balasEnemigas5.setAll("anchor.y", 0);
  balasEnemigas5.setAll("outOfBoundsKill", true);
  balasEnemigas5.setAll("checkWorldBounds", true);

  balasEnemigas6 = game.add.group();
  balasEnemigas6.enableBody = true;
  balasEnemigas6.physicsBodyType = Phaser.Physics.ARCADE;
  balasEnemigas6.createMultiple(30, "disparosEnemigos");
  balasEnemigas6.setAll("anchor.x", -4.2);
  balasEnemigas6.setAll("anchor.y", 0);
  balasEnemigas6.setAll("outOfBoundsKill", true);
  balasEnemigas6.setAll("checkWorldBounds", true);

  balasEnemigas7 = game.add.group();
  balasEnemigas7.enableBody = true;
  balasEnemigas7.physicsBodyType = Phaser.Physics.ARCADE;
  balasEnemigas7.createMultiple(30, "disparosEnemigos");
  balasEnemigas7.setAll("anchor.x", -4.2);
  balasEnemigas7.setAll("anchor.y", 0);
  balasEnemigas7.setAll("outOfBoundsKill", true);
  balasEnemigas7.setAll("checkWorldBounds", true);

  // Avión Enemigo //
  enemigos = game.add.group();
  enemigos.enableBody = true;
  enemigos.physicsBodyType = Phaser.Physics.ARCADE;

  crearAvionesEnemigos();

  // Explosiones //
  explosions = game.add.group();
  explosions.createMultiple(30, "kaboom");
  explosions.forEach(setupInvader, this);

  // Barra de vida //
  barra = this.add.sprite(79, 785, "barravida");
  barra.anchor.set(0.5);

  // Vidas //
  vidas = game.add.group();
  crearVidas();

  // Temporizador //
  timer = game.time.create(false);
  timer.loop(jsonLevel.generator, crearAvionesEnemigos, this);
  timer.start();

  // Botones para jugar //
  cursors = game.input.keyboard.createCursorKeys();
  botondisparos = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

  // Sonidos //
  sonidoDisparo = game.add.audio('sonidoDisparo');
  sonidoExplosion = game.add.audio('sonidoExplosion');
  sonidoFondo = game.add.audio('sonidoFondo');
  sonidoFondo.loopFull(0.5);

  sonidoVida = game.add.audio('sonidoVida');

  // Objeto Vidas //
  objetosVida = game.add.group();
  objetosVida.enableBody = true;
  objetosVida.physicsBodyType = Phaser.Physics.ARCADE;
  timer3 = game.time.create(false);
  timer3.loop(10000, crearObjetosVida, this);
  timer3.start();

  // Timer duracion juego //
  timerNivel = game.time.create(false);
  timerNivel.loop(1000, duracionNivel, this);
  timerNivel.start();

  // Texto Final Juego
  stateText = game.add.text(game.world.centerX, game.world.centerY, ' ', {
    font: '84px Arial',
    fill: '#fff'
  });
  stateText.anchor.setTo(0.5, 0.5);
  stateText.visible = false;

  stateText2 = game.add.text(game.world.centerX, game.world.centerY, ' ', {
    font: '54px Arial',
    fill: '#fff'
  });
  stateText2.anchor.setTo(0.5, 0.5);
  stateText2.visible = false;

  stateText3 = game.add.text(game.world.centerX, game.world.centerY, ' ', {
    font: '54px Arial',
    fill: '#fff'
  });
  stateText3.anchor.setTo(0.5, 0.5);
  stateText3.visible = false;
}

function duracionNivel() {
  if (jsonLevel.duration != contadorDuracion) {
    contadorDuracion = contadorDuracion + 1;
  }
  console.log(contadorDuracion);
}

// Función para crear objetos vidas //
function crearObjetosVida() {
  aleatorio = Math.round(Math.random() * (750 - 150) + 150);

  objetoVida = game.add.sprite(aleatorio, -100, 'objetoVida');
  objetosVida.add(objetoVida);
}

// Función para crear islotes //
function crearIslotes() {
  aleatorio = Math.round(Math.random() * 16);

  for (var i = 0; i < jsonIslotes.islotes.length; i++) {
    if (jsonIslotes.islotes[i].time == aleatorio) {
      islote = game.add.sprite(jsonIslotes.islotes[i].x, jsonIslotes.islotes[i].y, jsonIslotes.islotes[i].islote);
      islotes.add(islote);
    }
  }
}

// Función para crear vidas //
function crearVidas() {
  posicion = 0;

  if (contador > 12) {
    contador = 12;
  }
  for (var i = 0; i < contador; i++) {
    var vida = vidas.create(33 + posicion, 785, "vida");
    vida.anchor.set(0.5);
    posicion = posicion + 10;
  }
}

// Función para crear los aviones enemigos //
function crearAvionesEnemigos() {
  // Todo este algoritmo es para poner los aviones en formación de 3 //
  aleatorio = Math.round(Math.random() * 4);

  // Creamos los aviones enemigos aleatoriamente //
  if (jsonLevel.contador != contadorNivel) {
    contadorNivel++;
    if (aleatorio < 3) {
      for (var i = 0; i < jsonLevel.enemies.length; i++) {
        if (jsonLevel.enemies[i].time == aleatorio) {
          enemigo = game.add.sprite(jsonLevel.enemies[i].x, jsonLevel.enemies[i].y, jsonLevel.enemies[i].avion);
          enemigo.health = jsonLevel.enemies[i].health;
          enemigos.add(enemigo);
          enemigo.anchor.setTo(0.5, 0.5);
        }
      }
    } else {
      for (var i = 0; i < jsonLevel.enemies.length; i++) {
        if (jsonLevel.enemies[i].time == aleatorio) {
          enemigo = game.add.sprite(jsonLevel.enemies[i].x, jsonLevel.enemies[i].y, jsonLevel.enemies[i].avion);
          enemigo.rotation = jsonLevel.enemies[i].rotation;
          enemigo.health = jsonLevel.enemies[i].health;
          enemigos.add(enemigo);
          enemigo.anchor.setTo(0.5, 0.5);
        }
      }
    }
  } else if (jsonLevel.contador == 15) {
    if (jsonLevel.contadorBoss != contadorBoss) {
      contadorBoss = contadorBoss + 3;
      for (var i = 15; i < 18; i++) {
        if (jsonLevel.enemies[i].time == 5) {
          enemigo = game.add.sprite(jsonLevel.enemies[i].x, jsonLevel.enemies[i].y, jsonLevel.enemies[i].avion);
          enemigo.rotation = jsonLevel.enemies[i].rotation;
          enemigo.health = jsonLevel.enemies[i].health;
          enemigos.add(enemigo);
          enemigo.anchor.setTo(0.5, 0.5);
        }
      }
    }
  } else if (jsonLevel.contador == 20) {
    if (jsonLevel.contadorBoss != contadorBoss) {
      contadorBoss = contadorBoss + 2;
      aleatorio = Math.round(Math.random() * (7 - 6) + 6);

      for (var i = 15; i < 20; i++) {
        if (jsonLevel.enemies[i].time == aleatorio) {
          enemigo = game.add.sprite(jsonLevel.enemies[i].x, jsonLevel.enemies[i].y, jsonLevel.enemies[i].avion);
          enemigo.rotation = jsonLevel.enemies[i].rotation;
          enemigo.health = jsonLevel.enemies[i].health;
          enemigos.add(enemigo);
          enemigo.anchor.setTo(0.5, 0.5);
        } else if (jsonLevel.enemies[i].time == aleatorio) {
          enemigo = game.add.sprite(jsonLevel.enemies[i].x, jsonLevel.enemies[i].y, jsonLevel.enemies[i].avion);
          enemigo.rotation = jsonLevel.enemies[i].rotation;
          enemigo.health = jsonLevel.enemies[i].health;
          enemigos.add(enemigo);
          enemigo.anchor.setTo(0.5, 0.5);
        }
      }
    }
  }
}

function update() {
  background.tilePosition.y += 3;

  if (avion.alive && contadorDuracion != jsonLevel.duration) {
    // Movimiento de los aviones enemigos
    for (var i = 0; i < enemigos.children.length; i++) {
      if (enemigos.children[i].rotation == 0.70) {
        enemigos.children[i].x -= 1
      } else if (enemigos.children[i].rotation == -0.70) {
        enemigos.children[i].x += 1;
      }

      if (enemigos.children[i].key == "avionEnemigo3" && enemigos.children[i].position.y == 200) {
        enemigos.children[i].y = 200;
      } else {
        enemigos.children[i].y += 1;
      }

      if (enemigos.children[i].y > 850) {
        enemigos.children[i].kill();
      }
    }

    // Movimiento de los islotes //
    for (var i = 0; i < islotes.children.length; i++) {
      islotes.children[i].y += 3;
    }

    // Movimiento de los objetos vida //
    for (var i = 0; i < objetosVida.children.length; i++) {
      objetosVida.children[i].y += 1;
    }

    // Avion para arriba o para abajo //
    if (cursors.up.isDown) {
      if (avion.y < 250) {
        avion.body.y += 0;
      } else {
        avion.body.y += -8;
      }
    } else if (cursors.down.isDown) {
      if (avion.y > 735) {
        avion.body.y += 0;
      } else {
        avion.body.y += 8;
      }
    }

    // Avion para la derecha o para la izquierda //
    if (cursors.left.isDown) {
      if (avion.x < 35) {
        avion.body.velocity.x = 0;
      } else {
        avion.body.velocity.x = -400;
        avion.play("left");
      }
    } else if (cursors.right.isDown) {
      if (avion.x > 760) {
        avion.body.velocity.x = 0;
      } else {
        avion.body.velocity.x = 400;
        avion.play("right");
      }
    } else if (cursors.left.isUp) {
      avion.body.velocity.x = 0;
      avion.frame = 2;
    } else if (cursors.right.IsUp) {
      avion.body.velocity.x = 0;
      avion.frame = 2;
    }

    // Cuando pulsamos el boton de disparar llamamos a la funcion //
    if (botondisparos.isDown) {
      disparosAliado();
    }

    // Cuando comienza el juego empiezan los disparos enemigos //
    if (game.time.now > firingTimer) {
      disparosEnemigos();
    }

    game.physics.arcade.overlap(balasAliadas, enemigos, colisionEnemigos, null, this);
    game.physics.arcade.overlap(balasEnemigas, avion, colisionPlayer, null, this);
    game.physics.arcade.overlap(balasEnemigas2, avion, colisionPlayer, null, this);
    game.physics.arcade.overlap(balasEnemigas3, avion, colisionPlayer, null, this);
    game.physics.arcade.overlap(balasEnemigas4, avion, colisionPlayer, null, this);
    game.physics.arcade.overlap(balasEnemigas5, avion, colisionPlayer, null, this);
    game.physics.arcade.overlap(balasEnemigas6, avion, colisionPlayer, null, this);
    game.physics.arcade.overlap(balasEnemigas7, avion, colisionPlayer, null, this);
    game.physics.arcade.overlap(enemigos, avion, colisionEntreAviones, null, this);
    game.physics.arcade.overlap(objetosVida, avion, colisionVida, null, this);
  } else if (contadorDuracion == jsonLevel.duration) {
    stateText.text = " YOU WIN \n\n ";
    stateText.visible = true;
    stateText2.text = " \n Has sobrevivido ";
    stateText2.visible = true;
    stateText3.text = " \n\n\n\n Click to restart";
    stateText3.visible = true;
    game.input.onTap.addOnce(reiniciarJuego, this);
  } else {
    stateText.text = " GAME OVER \n\n ";
    stateText.visible = true;
    stateText2.text = " \n ¡¡¡Has muerto!!! ";
    stateText2.visible = true;
    stateText3.text = " \n\n\n\n Click to restart";
    stateText3.visible = true;
    game.input.onTap.addOnce(reiniciarJuego, this);
  }
}

function reiniciarJuego() {
  location.reload();
}

function setupInvader(enemigo) {
  enemigo.anchor.x = 0.2;
  enemigo.anchor.y = 0.2;
  enemigo.animations.add("kaboom");
}

// Recorrido de la bala aliada //
function disparosAliado() {
  if (game.time.now > cadencia) {
    disparo = balasAliadas.getFirstExists(false);

    if (disparo) {
      disparo.reset(avion.x, avion.y + 8);
      disparo.body.velocity.y = -400;
      cadencia = game.time.now + 300;
      sonidoDisparo.play();
    }
  }
}

// Función para los disparios enemigos //
function disparosEnemigos() {
  balaEnemiga = balasEnemigas.getFirstExists(false);
  balaEnemiga2 = balasEnemigas2.getFirstExists(false);
  balaEnemiga3 = balasEnemigas3.getFirstExists(false);
  balaEnemiga4 = balasEnemigas4.getFirstExists(false);
  balaEnemiga5 = balasEnemigas5.getFirstExists(false);
  balaEnemiga6 = balasEnemigas6.getFirstExists(false);
  balaEnemiga7 = balasEnemigas7.getFirstExists(false);

  livingEnemies.length = 0;

  enemigos.forEachAlive(function (enemigo) {
    livingEnemies.push(enemigo);
  });

  if (balaEnemiga && balaEnemiga2 && balaEnemiga3 && balaEnemiga4 && balaEnemiga5 && balaEnemiga6 && balaEnemiga7 && livingEnemies.length > 0) {
    var random = game.rnd.integerInRange(0, livingEnemies.length - 1);

    var shooter = livingEnemies[random];

    if (shooter.key == "avionEnemigo1") {
      if (shooter.rotation == 0) {
        balaEnemiga.reset(shooter.body.x, shooter.body.y);
        game.physics.arcade.moveToObject(balaEnemiga, avion, 0);
        balaEnemiga.body.velocity.y = 250;
        firingTimer = game.time.now + 700;
        balaEnemiga.rotation = 0;
      } else if (shooter.rotation == 0.7) {
        balaEnemiga.reset(shooter.body.x, shooter.body.y);
        game.physics.arcade.moveToObject(balaEnemiga, avion, 0);
        balaEnemiga.body.velocity.x -= 200;
        balaEnemiga.body.velocity.y = 250;
        balaEnemiga.rotation = 0.70;
        firingTimer = game.time.now + 700;
        balaEnemiga.anchor.x = -5.5;
      }
    } else if (shooter.key == "avionEnemigo2") {
      if (shooter.rotation == 0) {
        balaEnemiga.reset(shooter.body.x + 15, shooter.body.y + 10);
        balaEnemiga2.reset(shooter.body.x - 8, shooter.body.y + 10);
        game.physics.arcade.moveToObject(balaEnemiga, avion, 0);
        game.physics.arcade.moveToObject(balaEnemiga2, avion, 0);
        balaEnemiga.body.velocity.y = 250;
        balaEnemiga2.body.velocity.y = 250;
        firingTimer = game.time.now + 700;
        balaEnemiga.rotation = 0;
        balaEnemiga2.rotation = 0;
      } else if (shooter.rotation == 0.7) {
        balaEnemiga.reset(shooter.body.x + 15, shooter.body.y + 10);
        balaEnemiga2.reset(shooter.body.x - 8, shooter.body.y + 10);
        game.physics.arcade.moveToObject(balaEnemiga, avion, 0);
        game.physics.arcade.moveToObject(balaEnemiga2, avion, 0);
        balaEnemiga.body.velocity.x -= 200;
        balaEnemiga.body.velocity.y = 250;
        balaEnemiga2.body.velocity.x -= 200;
        balaEnemiga2.body.velocity.y = 250;
        firingTimer = game.time.now + 700;
        balaEnemiga.rotation = 0.70;
        balaEnemiga2.rotation = 0.70;
      }
    } else if (shooter.key == "avionEnemigo3") {
      balaEnemiga.reset(shooter.body.x + 8, shooter.body.y + 20);
      balaEnemiga2.reset(shooter.body.x + 27, shooter.body.y + 20);
      balaEnemiga3.reset(shooter.body.x + 47, shooter.body.y + 20);
      game.physics.arcade.moveToObject(balaEnemiga, avion, 0);
      game.physics.arcade.moveToObject(balaEnemiga2, avion, 0);
      game.physics.arcade.moveToObject(balaEnemiga3, avion, 0);
      balaEnemiga.body.velocity.y = 250;
      balaEnemiga2.body.velocity.y = 250;
      balaEnemiga3.body.velocity.y = 250;
      firingTimer = game.time.now + 420;
      balaEnemiga.rotation = 0;
      balaEnemiga2.rotation = 0;
      balaEnemiga3.rotation = 0;
    } else if (shooter.key == "avionEnemigo4") {
      balaEnemiga.reset(shooter.body.x + 7, shooter.body.y + 60);
      balaEnemiga2.reset(shooter.body.x + 28, shooter.body.y + 60);
      balaEnemiga3.reset(shooter.body.x + 49, shooter.body.y + 60);
      balaEnemiga4.reset(shooter.body.x + 63, shooter.body.y + 60);
      balaEnemiga5.reset(shooter.body.x + 79, shooter.body.y + 60);
      balaEnemiga6.reset(shooter.body.x + 100, shooter.body.y + 60);
      balaEnemiga7.reset(shooter.body.x + 121, shooter.body.y + 60);
      game.physics.arcade.moveToObject(balaEnemiga, avion, 0);
      game.physics.arcade.moveToObject(balaEnemiga2, avion, 0);
      game.physics.arcade.moveToObject(balaEnemiga3, avion, 0);
      game.physics.arcade.moveToObject(balaEnemiga4, avion, 0);
      game.physics.arcade.moveToObject(balaEnemiga5, avion, 0);
      game.physics.arcade.moveToObject(balaEnemiga6, avion, 0);
      game.physics.arcade.moveToObject(balaEnemiga7, avion, 0);
      balaEnemiga.body.velocity.y = 250;
      balaEnemiga2.body.velocity.y = 250;
      balaEnemiga3.body.velocity.y = 250;
      balaEnemiga4.body.velocity.y = 250;
      balaEnemiga5.body.velocity.y = 250;
      balaEnemiga6.body.velocity.y = 250;
      balaEnemiga7.body.velocity.y = 250;
      firingTimer = game.time.now + 420;
      balaEnemiga.rotation = 0;
      balaEnemiga2.rotation = 0;
      balaEnemiga3.rotation = 0;
      balaEnemiga4.rotation = 0;
      balaEnemiga5.rotation = 0;
      balaEnemiga6.rotation = 0;
      balaEnemiga7.rotation = 0;
    }
  }
}

// Colisión en los aviones enemigos //
function colisionEnemigos(balasAliadas, enemigo) {
  var todosUsuarios = [];
  var puntuacion = 0;
  var infoUsuario = [];
  var idUsuario;

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
  puntuacion = infoUsuario[0][5];
  puntuacion = puntuacion + 1;

  infoUsuario[0][5] = puntuacion;
  infoUsuario = JSON.stringify(infoUsuario[0]);

  localStorage.setItem(idUsuario, infoUsuario);

  balasAliadas.kill();

  var explosion = explosions.getFirstExists(false);


  if (enemigo.key == "avionEnemigo1" || enemigo.key == "avionEnemigo2") {
    enemigo.health--;
    if (enemigo.health <= 0) {
      enemigo.kill();
      explosion.reset(enemigo.body.x, enemigo.body.y);
      explosion.play("kaboom", 30, false, true);
      sonidoExplosion.play();
    }
  } else if (enemigo.key == "avionEnemigo3") {
    enemigo.health--;
    if (enemigo.health <= 0) {
      enemigo.kill();
      explosion.reset(enemigo.body.x + 30, enemigo.body.y + 20);
      explosion.play("kaboom", 30, false, true);
      sonidoExplosion.play();
    }
  } else if (enemigo.key == "avionEnemigo4") {
    enemigo.health--;
    if (enemigo.health <= 0) {
      enemigo.kill();
      explosion.reset(enemigo.body.x + 60, enemigo.body.y + 60);
      explosion.play("kaboom", 30, false, true);
      sonidoExplosion.play();
    }
  }
}

// Funcion para controlar la colision de las balas enemigas con el jugador //
function colisionPlayer(player, balasEnemigas) {
  balasEnemigas.kill();

  if (contador == 1) {
    var explosion = explosions.getFirstExists(false);
    explosion.reset(player.body.x, player.body.y);
    explosion.play("kaboom", 30, false, true);
    avion.kill();
  }

  restarVidas(1);
}

// Función para controlar la colisión entre aviones //
function colisionEntreAviones(player, enemigo) {
  enemigo.kill();
  var explosion = explosions.getFirstExists(false);

  if (enemigo.key == "avionEnemigo1" || enemigo.key == "avionEnemigo2") {
    explosion.reset(enemigo.body.x, enemigo.body.y);
    explosion.play("kaboom", 30, false, true);
    sonidoExplosion.play();
    restarVidas(2);

  } else if (enemigo.key == "avionEnemigo3") {
    explosion.reset(enemigo.body.x + 30, enemigo.body.y + 20);
    explosion.play("kaboom", 30, false, true);
    sonidoExplosion.play();
    restarVidas(5);
  } else if (enemigo.key == "avionEnemigo4") {
    explosion.reset(enemigo.body.x + 60, enemigo.body.y + 60);
    explosion.play("kaboom", 30, false, true);
    sonidoExplosion.play();
    restarVidas(12);
  }
}

// Funcion para restar vidas //
function restarVidas(numeroVidas) {
  vidas.kill();
  contador = contador - numeroVidas;

  if (contador <= 0) {
    var explosion = explosions.getFirstExists(false);
    explosion.reset(avion.body.x, avion.body.y);
    explosion.play("kaboom", 30, false, true);
    avion.kill();
    sonidoExplosion.play();
  } else {
    vidas = game.add.group();
    crearVidas();
  }
}

// Funcion para controlar la colision con el objeto vidas //
function colisionVida(player, sumaVidas) {
  sumaVidas.kill();
  sonidoVida.play();
  sumarVidas(2);
}

// Funcion para sumar vidas //
function sumarVidas(numeroVidas) {
  vidas.kill();
  contador = contador + numeroVidas;
  vidas = game.add.group();
  crearVidas();
}