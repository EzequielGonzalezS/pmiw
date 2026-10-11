https://youtu.be/N5dGlEmvVVE

let pantallaActual = 0;
let portada;
let presentacion;
let imageCreditos;
let imagenes = [];
let sonido; 

let textos = []; 
let letrasVisibles = 0; 
let pantallaDelTexto = -1; 
let velTexto = 2; 

function preload() {
  portada = loadImage("data/portada.png");
  presentacion= loadImage("data/presentacion.png");
  imageCreditos = loadImage("data/credito.jpeg");
  sonido = loadSound("data/fondo.mp3");
  
  for (let i = 0; i <=11 ; i++) {
    imagenes[i] = loadImage("data/escena" + i + ".jpeg");
  }
}
 
function setup() {
  createCanvas(800, 450);
  cargarTextos();
}

function draw() {
  background(25, 20, 20);

  // PORTADA
  if (pantallaActual === 0) {
    image(portada, 0, 0, 800, 450);
    dibujarBotonTransparente(325, 280, 150, 50);
  }

  // PRESENTACIÓN: ELEGIR CAMINO
  else if (pantallaActual === 1) {
    image(presentacion, 0, 0, 800, 450);
    dibujarTexto(pantallaActual, 0); 
    dibujarBoton(100, 320, 250, 50, "A - QUEDARSE");
    dibujarBoton(450, 320, 250, 50, "B - ESCAPAR");
  }

     // CRÉDITOS
  else if (pantallaActual === 14) {
    image(imageCreditos, 0, 0, 800, 450);
    dibujarTexto(17, 215); 
    dibujarBoton(325, 380, 150, 45, " INICIO");
  
  
  }
  
  // ESCENAS DE LA HISTORIA
  else if (pantallaActual >= 2 && pantallaActual <= 13) {

    let numeroImagen = pantallaActual - 2;
    image(imagenes[numeroImagen], 0, 0, 800, 450);
    dibujarTexto(pantallaActual, 0); 

    // ESCENA 4: DESESPERARSE O REZAR
    if (pantallaActual === 4) {
      dibujarBoton(100, 320, 250, 50, "A - DESESPERARSE");
      dibujarBoton(450, 320, 250, 50, "B - REZAR");
    }
    // PANTALLA 6: REZAR
    else if (pantallaActual === 6) {
      dibujarBoton(600, 380, 150, 45, "CONTINUAR");
    }
    // ESCENA 6: TOCAR LA LETRA O DUDAR
    else if (pantallaActual === 7) {
      dibujarBoton(100, 320, 250, 50, "A - TOCAR LA LETRA");
      dibujarBoton(450, 320, 250, 50, "B - DUDAR");
    }
 
    // PANTALLA 9: ELEGIR EL CAMINO
    else if (pantallaActual === 10) {
      dibujarBoton(50, 320, 220, 50, "A - LA MENTE");
      dibujarBoton(290, 320, 220, 50, "B - EL BLOQUEO");
      dibujarBoton(530, 320, 220, 50, "C - LA PIEDAD");
    }

    // RESTO DE LAS ESCENAS
    else {
      dibujarBoton(600, 380, 150, 45, "CONTINUAR");
    }
  }
}

function mousePressed() {

  // PANTALLA 0: PORTADA
  if (pantallaActual === 0) {
    if (botonPresionado(325, 280, 150, 50)) {
      pantallaActual = 1;
      sonido.loop();
    }
  }

  // PANTALLA 1: ELEGIR CAMINO
  else if (pantallaActual === 1) {
    if (botonPresionado(100, 320, 250, 50)) {
      pantallaActual = 2;
    } else if (botonPresionado(450, 320, 250, 50)) {
      pantallaActual = 3;
    }
  }

  // PANTALLA 2: QUEDARSE
  else if (pantallaActual === 2) {
    if (botonPresionado(600, 380, 150, 45)) {
      pantallaActual = 4;
    }
  }

  // PANTALLA 3: ESCAPAR
  else if (pantallaActual === 3) {
    if (botonPresionado(600, 380, 150, 45)) {
      pantallaActual = 4;
    }
  }

  // PANTALLA 4: DESESPERARSE O REZAR
  else if (pantallaActual === 4) {
     if (botonPresionado(100, 320, 250, 50)) {
    pantallaActual = 5;
     }
     else if (botonPresionado(450, 320, 250, 50)) {
      pantallaActual = 6;
    }
  }

  // PANTALLA 5: CAMINO DE LA DESESPERACIÓN
  else if (pantallaActual === 5) {
    if (botonPresionado(600, 380, 150, 45)) {
      pantallaActual = 7;
    }
  }
  // PANTALLA 6: REZAR Y CONTINUAR
  else if (pantallaActual === 6) {
    if (botonPresionado(600, 380, 150, 45)) {
      pantallaActual = 7;
    }
  }

  // PANTALLA 6: TOCAR LA LETRA O DUDAR
  else if (pantallaActual === 7) {
    if (botonPresionado(100, 320, 250, 50)) {
      pantallaActual = 8;
    }
    else if (botonPresionado(450, 320, 250, 50)) {
      pantallaActual = 9;
    }
  }

  // PANTALLA 7: CONTINUAR
  else if (pantallaActual === 8) {
    if (botonPresionado(600, 380, 150, 45)) {
      pantallaActual = 10;
    }
  }
  // PANTALLA 9: CONTINUAR
  else if (pantallaActual === 9) {
    if (botonPresionado(600, 380, 150, 45)) {
      pantallaActual = 10;
    }
  }

  // PANTALLA 9: ELEGIR EL CAMINO
  else if (pantallaActual === 10) {
    if (botonPresionado(50, 320, 220, 50)) {
      pantallaActual = 11; // LA MENTE
    }
    else if (botonPresionado(290, 320, 220, 50)) {
      pantallaActual = 12; // EL BLOQUEO
    }
    else if (botonPresionado(530, 320, 220, 50)) {
      pantallaActual = 13; // LA PIEDAD
    }
  }

  // PANTALLA 11: LA MENTE
  else if (pantallaActual === 11) {
    if (botonPresionado(600, 380, 150, 45)) {
      pantallaActual = 14; // CRÉDITOS
    }
  }

  // PANTALLA 12: EL BLOQUEO
  else if (pantallaActual === 12) {
    if (botonPresionado(600, 380, 150, 45)) {
      pantallaActual = 14; // CRÉDITOS
    }
  }

  // PANTALLA 13: LA PIEDAD
  else if (pantallaActual === 13) {
    if (botonPresionado(600, 380, 150, 45)) {
      pantallaActual = 14; // CRÉDITOS
    }
  }
  // PANTALLA 14: VOLVER AL INICIO
  else if (pantallaActual === 14) {
    if (botonPresionado(325, 380, 150, 45)) {
      pantallaActual = 0;
    }
  }
}

function dibujarBoton(x, y, ancho, alto, textoBoton) { 
  fill(70, 45, 50);
  stroke(220, 190, 150); 
  strokeWeight(2);
  rect(x, y, ancho, alto, 10); 
  fill(255);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(18);
  text(textoBoton, x + ancho / 2, y + alto / 2); 
}


function dibujarTexto(n, y) {
  if (n !== pantallaDelTexto) {
    pantallaDelTexto = n;
    letrasVisibles = 0;
  }
  
  if (frameCount % velTexto === 0 && letrasVisibles < textos[n].length) {
    letrasVisibles++;
  }
  
  let textoVisible = "";
  for (let i = 0; i < letrasVisibles; i++) {
    textoVisible = textoVisible + textos[n][i];
  }
  
  noStroke();
  fill(0, 190);
  rect(0, y, 800, 97);
    
  fill(255);
  textSize(17);
  textAlign(LEFT, TOP);
  text(textoVisible, 20, y + 8, 760, 85);
}

function cargarTextos() {
  textos[1] = "15 de marzo de 1939. Jaromir Hladík despierta en Praga tras un sueño febril sobre un ajedrez interminable. Los tanques del Tercer Reich han comenzado la ocupación de la ciudad. El peligro es inminente.";

  textos[2] = "Decides quedarte a resguardo en tu hogar trabajando en tus manuscritos. Golpean la puerta con violencia: la Gestapo irrumpe en tu departamento. Revisan tus escritos sobre la Kábala y te arrestan sin explicaciones.";

  textos[3] = "Empacas apresuradamente e intentas abordar un tren fuera de Praga. Sin embargo, la estación está fuertemente custodiada. Los soldados detectan tu presencia, te interceptan y proceden a tu detención inmediata.";

  textos[4] = "Te encarcelan en el cuartel. Un oficial notifica la sentencia: serás ejecutado por el pelotón de fusilamiento el 29 de marzo a las 9:00 AM. La soledad de la prisión te consume a pocos días del final.";

  textos[5] = "Te entregas al pánico. Imaginas interminables variaciones de tu propia muerte, anticipando el dolor de los disparos. La mente se te convierte en un laberinto tortuoso del que no puedes escapar.";

  textos[6] = "Te arrodillas en la penumbra de tu celda. Elevas una plegaria a Dios: no pides la salvación de tu cuerpo, sino un año de tiempo para concluir tu obra teatral inconclusa 'Los Enemigos'.";

  textos[7] = "Rendido por el cansancio, te duermes. Sueñas que caminas por la inmensa biblioteca del Clementinum buscando a Dios entre sus atlas. El bibliotecario ciego te acerca un mapa para buscar la letra divina.";

  textos[8] = "Extiendes tu mano y tocas una de las letras del atlas. Una voz estruendosa resuena en tu mente: 'El tiempo de tu labor ha sido otorgado'. Despiertas con una profunda certeza y serenidad.";

  textos[9] = "Vacilas, con miedo a equivocarte, y no llegas a tocar ninguna letra del mapa. El sueño se disuelve bruscamente. Te despiertan los guardias en el frío amanecer del 29 de marzo.";

  textos[10] = "Son las 8:54 AM. Te colocan junto al muro. El sargento da la orden de apuntar. Una gota de lluvia empieza a resbalar por tu mejilla y las 9:00 dan en el reloj. ¡De pronto, el tiempo se paraliza por completo!";

  textos[11] = "Comprendes el milagro. Dios te ha concedido un año en tu mente. Sin moverte, trabajas meticulosamente durante 365 días invisibles: pules diálogos, borras versos y completas la tragedia 'Los Enemigos'.";

  textos[12] = "El tiempo físico está congelado, pero la ansiedad te domina. Intentas forzar tus miembros a moverse. Tu mente se queda en blanco, incapaz de concentrarse en la creación literaria.";

  textos[13] = "Abrumado por el milagro, en lugar de escribir intentas gritar o romper el hechizo del tiempo congelado, rebelándote contra el propio regalo divino hasta que tu mente se agota.";

  textos[14] = "Encuentras el adjetivo definitivo para cerrar la obra. En ese instante exacto, la gota de lluvia termina de resbalar por tu mejilla. Las balas reanudan su trayectoria y caes muerto. Son las 9:02 AM. Tu obra vive en la eternidad.";

  textos[15] = "Programadores: Kimberlyn Perez y Ezequiel Gonzalez Satostegui\nAutor de la obra: Jorge Luis Borges";
}

function botonPresionado(x, y, ancho, alto) {
  return mouseX >= x && mouseX <= x + ancho && mouseY >= y && mouseY <= y + alto;
}

function dibujarBotonTransparente(x, y, ancho, alto,) {
  noFill();
  stroke(255, 220, 180);
  strokeWeight(0);
  rect(x, y, ancho, alto, 10);
}
