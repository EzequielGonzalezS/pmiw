//orden de las pantallas: 0 portada, 1 despertar, 2 arresto, 3 estación
const nombresImagenes = ["p0.jpg", "p2.jpg", "p3.jpg", "p4.jpg"];
const carpetaImagenes = "data/";
const cantImagenes = nombresImagenes.length;
const PORTADA = 0;
const ULTIMA_PANTALLA = 3;  

const TITULO = "EL MILAGRO SECRETO";
const SUBTITULO = "DE JORGE LUIS BORGES";
const msPorLetraTitulo = 90;  
const msPorLetraTexto = 35;   
const PANTALLA_MILAGRO = 10;  

//VARIABLES
let imagenes = [];
let textos = [];
let botonesTexto = [];    
let botonesDestino = [];  

let pantalla = PORTADA;
let inicioTexto = 0;      
let relojCongelado = false;
let horaGuardada, minutoGuardado, segundoGuardado;

//PRELOAD
function preload() {
  for (let i = 0; i < cantImagenes; i++) {
    imagenes[i] = loadImage(carpetaImagenes + nombresImagenes[i]);
  }
}

function setup() {
  createCanvas(800, 450);
  cargarDatos();
  inicioTexto = millis();
}

function draw() {
  background(20);
  dibujarPantalla(pantalla);
}

//DIBUJO
function dibujarPantalla(n) {
  if (imagenes[n] !== undefined) {
    image(imagenes[n], 0, 0, width, height);
  }

  if (n === PORTADA) {
    dibujarPortada();
  } else {
    dibujarNarrativa(n);
  }

  //los botones aparecen cuando terminó de escribirse el texto
  if (textoTerminado()) {
    dibujarBotones(n);
  }

  dibujarReloj();
}

function dibujarPortada() {
  let letras = letrasVisibles();

  //TITULO
  textFont("Impact");
  textSize(38);
  textAlign(LEFT, TOP);
  let xTitulo = (width - textWidth(TITULO)) / 2;
  contornoTexto();
  text(TITULO.substring(0, letras), xTitulo, 50);

  //AUTOR
  textFont("Impact");
  textSize(22);
  let xSub = (width - textWidth(SUBTITULO)) / 2;
  let letrasSub = letras - TITULO.length;
  if (letrasSub > 0) {
    text(SUBTITULO.substring(0, letrasSub), xSub, 125);
  }
  strokeWeight(1);
  noStroke();
}

function contornoTexto() {
  fill(255);
  stroke(0);
  strokeWeight(5);
}

function dibujarNarrativa(n) {
  if (textos[n] === "") {
    return;
  }
  noStroke();
  fill(0, 190);
  rect(0, 270, width, 180);
  fill(255);
  textFont("NSimSun");
  textSize(17);
  textAlign(LEFT, TOP);
  text(textos[n].substring(0, letrasVisibles()), 20, 282, 760, 105);
}

function dibujarBotones(n) {
  let cant = botonesTexto[n].length;
  for (let i = 0; i < cant; i++) {
    dibujarBoton(posXBoton(i, cant), 396, anchoBoton(cant), 42, botonesTexto[n][i]);
  }
}

function dibujarBoton(x, y, w, h, txt) {
  push();
  translate(x, y);

  let sobreBoton = mouseSobre(x, y, w, h);

  //fondo del botón
  noStroke();
  if (sobreBoton) {
    fill(50, 38, 20);
  } else {
    fill(25, 18, 10);
  }
  rect(0, 0, w, h, 4);

  //marco doble dorado
  noFill();
  if (sobreBoton) {
    stroke(230, 190, 100);
  } else {
    stroke(160, 130, 60);
  }
  strokeWeight(2);
  rect(2, 2, w - 4, h - 4, 3);
  strokeWeight(1);
  rect(5, 5, w - 10, h - 10, 2);

  //pequeños remates en las esquinas
  strokeWeight(1);
  let m = 8;
  line(m, 3, m + 6, 3);
  line(3, m, 3, m + 6);
  line(w - m, 3, w - m - 6, 3);
  line(w - 3, m, w - 3, m + 6);
  line(m, h - 3, m + 6, h - 3);
  line(3, h - m, 3, h - m - 6);
  line(w - m, h - 3, w - m - 6, h - 3);
  line(w - 3, h - m, w - 3, h - m - 6);

  //texto dorado tipografía serif
  noStroke();
  if (sobreBoton) {
    fill(255, 215, 130);
  } else {
    fill(210, 175, 100);
  }
  textFont("serif");
  textSize(15);
  textAlign(CENTER, CENTER);
  text(txt, 0, 0, w, h);
  pop();
}
function dibujarReloj() {
  let h, m, s;
  if (relojCongelado) {
    h = horaGuardada;
    m = minutoGuardado;
    s = segundoGuardado;
  } else {
    h = hour();
    m = minute();
    s = second();
  }

  let cx = width - 65;
  let cy = 70;
  let r = 38;

  push();
  translate(cx, cy);

  //argolla y cadena 
  stroke(90, 70, 30);
  strokeWeight(3);
  noFill();
  ellipse(0, -r - 8, 12, 14);
  line(0, -r - 2, 0, -r + 6);

  //marco exterior estilo bronce
  noStroke();
  fill(120, 90, 40);
  ellipse(0, 0, r * 2 + 14, r * 2 + 14);
  fill(180, 140, 70);
  ellipse(0, 0, r * 2 + 6, r * 2 + 6);

  //esfera color hueso envejecido 
  fill(235, 222, 190);
  stroke(90, 70, 30);
  strokeWeight(2);
  ellipse(0, 0, r * 2, r * 2);

  //números romanos
  let romanos = ["XII", "I", "II", "III", "IIII", "V", "VI", "VII", "VIII", "IX", "X", "XI"];
  noStroke();
  fill(60, 45, 20);
  textFont("serif");
  textSize(8);
  textAlign(CENTER, CENTER);
  for (let i = 0; i < 12; i++) {
    let ang = TWO_PI * i / 12 - HALF_PI;
    let x = cos(ang) * (r - 10);
    let y = sin(ang) * (r - 10);
    text(romanos[i], x, y);
  }

  //marquitas finas entre números
  stroke(90, 70, 30);
  strokeWeight(1);
  for (let i = 0; i < 60; i++) {
    if (i % 5 !== 0) {
      let ang = TWO_PI * i / 60 - HALF_PI;
      let x1 = cos(ang) * (r - 3);
      let y1 = sin(ang) * (r - 3);
      let x2 = cos(ang) * (r - 6);
      let y2 = sin(ang) * (r - 6);
      line(x1, y1, x2, y2);
    }
  }

  //agujas
  let angHora = TWO_PI * ((h % 12) + m / 60) / 12 - HALF_PI;
  let angMin = TWO_PI * (m + s / 60) / 60 - HALF_PI;
  let angSeg = TWO_PI * s / 60 - HALF_PI;

  stroke(60, 45, 20);
  strokeWeight(3);
  line(0, 0, cos(angHora) * (r * 0.45), sin(angHora) * (r * 0.45));

  strokeWeight(2);
  line(0, 0, cos(angMin) * (r * 0.7), sin(angMin) * (r * 0.7));

  stroke(140, 30, 30);
  strokeWeight(1);
  line(0, 0, cos(angSeg) * (r * 0.8), sin(angSeg) * (r * 0.8));

  noStroke();
  fill(60, 45, 20);
  ellipse(0, 0, 6, 6);

  pop();
}
//FUNCIONES QUE RETORNAN UN VALOR
function mouseSobre(x, y, w, h) {
  return mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h;
}

function anchoBoton(cant) {
  return (760 - (cant - 1) * 10) / cant;
}

function posXBoton(i, cant) {
  return 20 + i * (anchoBoton(cant) + 10);
}

//cuántas letras se escribieron hasta ahora
function letrasVisibles() {
  if (pantalla === PORTADA) {
    let t = millis() - inicioTexto;
    let letrasTitulo = floor(t / msPorLetraTitulo);
    if (letrasTitulo <= TITULO.length) {
      return letrasTitulo;
    }
    //el subtítulo puede ir a otra velocidad una vez que arranca
    let tRestante = t - TITULO.length * msPorLetraTitulo;
    return TITULO.length + floor(tRestante / msPorLetraTexto);
  }
  return floor((millis() - inicioTexto) / msPorLetraTexto);
}

//cuántas letras tiene en total el texto de la pantalla actual
function totalLetras() {
  if (pantalla === PORTADA) {
    return TITULO.length + SUBTITULO.length;
  }
  return textos[pantalla].length;
}

function textoTerminado() {
  return letrasVisibles() >= totalLetras();
}

//INTERACCIÓN
function mousePressed() {
  //si todavía se está escribiendo el click completa el texto
  if (!textoTerminado()) {
    if (pantalla === PORTADA) {
      inicioTexto = millis() - TITULO.length * msPorLetraTitulo - SUBTITULO.length * msPorLetraTexto;
    } else {
      inicioTexto = millis() - totalLetras() * msPorLetraTexto;
    }
    return;
  }

  let cant = botonesTexto[pantalla].length;
  for (let i = 0; i < cant; i++) {
    if (mouseSobre(posXBoton(i, cant), 396, anchoBoton(cant), 42)) {
      irAPantalla(botonesDestino[pantalla][i]);
      return;
    }
  }
}

function irAPantalla(destino) {
  //si la pantalla todavía no existe, vuelve a la portada
  if (destino > ULTIMA_PANTALLA) {
    destino = PORTADA;
  }

  if (destino === PANTALLA_MILAGRO && !relojCongelado) {
    horaGuardada = hour();
    minutoGuardado = minute();
    segundoGuardado = second();
    relojCongelado = true;
  }

  pantalla = destino;
  inicioTexto = millis();
}

//DATOS DE LAS PANTALLAS 
function cargarDatos() {
  textos[0] = ""; // 

  textos[1] = "15 de marzo de 1939. Jaromir Hladík despierta en Praga tras un sueño febril sobre un ajedrez interminable. Los tanques del Tercer Reich han comenzado la ocupación de la ciudad. El peligro es inminente.";

  textos[2] = "Decides quedarte a resguardo en tu hogar trabajando en tus manuscritos. Golpean la puerta con violencia: la Gestapo irrumpe en tu departamento. Revisan tus escritos sobre la Kábala y te arrestan sin explicaciones.";

  textos[3] = "Empacas apresuradamente e intentas abordar un tren fuera de Praga. Sin embargo, la estación está fuertemente custodiada. Los soldados detectan tu presencia, te interceptan y proceden a tu detención inmediata.";

  botonesTexto[0] = ["Comenzar"];
  botonesDestino[0] = [1];

  botonesTexto[1] = ["[A] Quedarse en el departamento", "[B] Intentar escapar por la estación"];
  botonesDestino[1] = [2, 3];

  botonesTexto[2] = ["Avanzar a la celda"];
  botonesDestino[2] = [4];
  botonesTexto[3] = ["Avanzar a la celda"];
  botonesDestino[3] = [4];
}
