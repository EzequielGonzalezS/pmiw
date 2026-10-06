// "El milagro secreto" — pantallas 0 a 3

const nombresImagenes = ["p0.jpg", "p2.jpg", "p3.jpg", "p4.jpg"];
const carpetaImagenes = "data/";
const PORTADA = 0;
const ULTIMA_PANTALLA = 3;
const TITULO = "EL MILAGRO SECRETO";
const SUBTITULO = "DE JORGE LUIS BORGES";
const msPorLetraTitulo = 90;
const msPorLetraTexto = 35;

let imagenes = [];
let textos = [];
let botonesTexto = [];
let botonesDestino = [];
let cantImagenes, totalLetrasTitulo, totalLetrasSubtitulo;
let pantalla = PORTADA;
let inicioTexto = 0;

function contar(coleccion) {
  let c = 0;
  for (let item of coleccion) c = c + 1;
  return c;
}

function preload() {
  cantImagenes = contar(nombresImagenes);
  for (let i = 0; i < cantImagenes; i++) {
    imagenes[i] = loadImage(carpetaImagenes + nombresImagenes[i]);
  }
}

function setup() {
  createCanvas(800, 450);
  totalLetrasTitulo = contar(TITULO);
  totalLetrasSubtitulo = contar(SUBTITULO);
  cargarDatos();
  inicioTexto = millis();
}

function draw() {
  background(20);
  if (imagenes[pantalla] !== undefined) image(imagenes[pantalla], 0, 0, width, height);
  if (pantalla === PORTADA) dibujarPortada();
  else dibujarNarrativa();
  if (textoTerminado()) dibujarBotones();
}

//texto
function dibujarPortada() {
  let letras = letrasVisibles();
  textoCentrado(TITULO, letras, 38, 50);
  textoCentrado(SUBTITULO, letras - totalLetrasTitulo, 22, 125);
}

function textoCentrado(txt, letras, tam, y) {
  if (letras <= 0) return;
  textFont("Impact");
  textSize(tam);
  fill(255);
  stroke(0);
  strokeWeight(5);
  let parte = txt.substring(0, letras);
  text(parte, (width - textWidth(txt)) / 2, y);
  noStroke();
}

function dibujarNarrativa() {
  let txt = textos[pantalla];
  if (txt === "") return;
  noStroke();
  fill(0, 190);
  rect(0, 270, width, 180);
  fill(255);
  textFont("NSimSun");
  textSize(17);
  textAlign(LEFT, TOP);
  text(txt.substring(0, letrasVisibles()), 20, 282, 760, 105);
}

//botones
function dibujarBotones() {
  let cant = contar(botonesTexto[pantalla]);
  for (let i = 0; i < cant; i++) {
    dibujarBoton(posXBoton(i, cant), 396, anchoBoton(cant), 42, botonesTexto[pantalla][i]);
  }
}

function dibujarBoton(x, y, w, h, txt) {
  let sobre = mouseSobre(x, y, w, h);
  push();
  translate(x, y);

  noStroke();
  fill(sobre ? 50 : 25, sobre ? 38 : 18, sobre ? 20 : 10);
  rect(0, 0, w, h, 4);

  noFill();
  stroke(sobre ? color(230, 190, 100) : color(160, 130, 60));
  strokeWeight(2);
  rect(2, 2, w - 4, h - 4, 3);
  strokeWeight(1);
  rect(5, 5, w - 10, h - 10, 2);

  let m = 8;
  for (let esq of [[m, 3, 6, 0], [3, m, 0, 6], [w - m, 3, -6, 0], [w - 3, m, 0, -6],
                    [m, h - 3, 6, 0], [3, h - m, 0, -6], [w - m, h - 3, -6, 0], [w - 3, h - m, 0, -6]]) {
    line(esq[0], esq[1], esq[0] + esq[2], esq[1] + esq[3]);
  }

  noStroke();
  fill(sobre ? color(255, 215, 130) : color(210, 175, 100));
  textFont("serif");
  textSize(15);
  textAlign(CENTER, CENTER);
  text(txt, 0, 0, w, h);
  pop();
}

// utilidades
function mouseSobre(x, y, w, h) {
  return mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h;
}

function anchoBoton(cant) {
  return (760 - (cant - 1) * 10) / cant;
}

function posXBoton(i, cant) {
  return 20 + i * (anchoBoton(cant) + 10);
}

function letrasVisibles() {
  let t = millis() - inicioTexto;
  if (pantalla !== PORTADA) return int(t / msPorLetraTexto);

  let letrasTitulo = int(t / msPorLetraTitulo);
  if (letrasTitulo <= totalLetrasTitulo) return letrasTitulo;
  return totalLetrasTitulo + int((t - totalLetrasTitulo * msPorLetraTitulo) / msPorLetraTexto);
}

function totalLetras() {
  return pantalla === PORTADA ? totalLetrasTitulo + totalLetrasSubtitulo : contar(textos[pantalla]);
}

function textoTerminado() {
  return letrasVisibles() >= totalLetras();
}

//interacción
function mousePressed() {
  if (!textoTerminado()) return;

  let cant = contar(botonesTexto[pantalla]);
  for (let i = 0; i < cant; i++) {
    if (mouseSobre(posXBoton(i, cant), 396, anchoBoton(cant), 42)) {
      irAPantalla(botonesDestino[pantalla][i]);
      return;
    }
  }
}

function irAPantalla(destino) {
  pantalla = destino > ULTIMA_PANTALLA ? PORTADA : destino;
  inicioTexto = millis();
}

//datos
function cargarDatos() {
  textos[0] = "";
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
