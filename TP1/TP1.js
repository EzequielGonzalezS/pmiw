//VARIABLES 
let idleFrames = [];
let caminarFrames = [];
let ataqueFrames = [];
let escudoImg;
let fondoImg;

let cantIdle = 6;
let cantCaminar = 3;
let cantAtaque = 4;

let personajeX, personajeY;
let velocidad = 3;      
let velAnimacion = 8;   
let frameActual = 0;
let frameDir = 1;       

let mostrarEscudo = false;
let escudoOffsetX = -60; 
let escudoOffsetY = 0;

let mirando = "IZQUIERDA"; 

const IDLE = "IDLE";
const CAMINAR = "CAMINAR";
const ATAQUE = "ATAQUE";
let estado;

//CARGA DE IMÁGENES
function preload() {
  for (let i = 0; i < cantIdle; i++) {
    idleFrames[i] = loadImage("data/idle" + i + ".png");
  }
  for (let i = 0; i < cantCaminar; i++) {
    caminarFrames[i] = loadImage("data/caminar" + i + ".png");
  }
  for (let i = 0; i < cantAtaque; i++) {
    ataqueFrames[i] = loadImage("data/ataque" + i + ".png");
  }
  escudoImg = loadImage("data/escudo.png");
  fondoImg = loadImage("data/fondo.png");
}

function setup() {
  createCanvas(800, 600);
  imageMode(CENTER); 
  reiniciar();
}
 
function draw() {
  background(220);
  image(fondoImg, width / 2, height / 2, width, height); 

  actualizarEstado();
  moverPersonaje(velocidad);

  let framesActivos = obtenerFramesActuales(); 
  reproducirAnimacion(framesActivos, personajeX, personajeY, velAnimacion, mirando);

  if (mostrarEscudo) {
    dibujarEscudo(personajeX, personajeY, mirando);
  }
}

//MÁQUINA DE ESTADOS
function actualizarEstado() {
  let nuevoEstado;

  if (keyIsDown(32)) { //barra espaciadora
    nuevoEstado = ATAQUE;
  } else if (keyIsDown(LEFT_ARROW) || keyIsDown(RIGHT_ARROW)) {
    nuevoEstado = CAMINAR;
  } else {
    nuevoEstado = IDLE;
  }

  //si cambia de estado, reinicio el frame para que no quede desfasado
  if (nuevoEstado !== estado) {
    frameActual = 0;
    frameDir = 1;
  }
  estado = nuevoEstado;

  if (keyIsDown(82)) { // tecla R
    reiniciar();
  }
}

//FUNCIONES PROPIAS CON PARÁMETROS 
function moverPersonaje(vel) {
  if (keyIsDown(LEFT_ARROW)) {
    personajeX -= vel;
    mirando = "IZQUIERDA";
  }
  if (keyIsDown(RIGHT_ARROW)) {
    personajeX += vel;
    mirando = "DERECHA";
  }

  //si se sale por un borde, reaparece del otro lado
  if (personajeX < 0) {
    personajeX = width;
  }
  if (personajeX > width) {
    personajeX = 0;
  }
}

function reproducirAnimacion(arregloFrames, x, y, velAnim, direccion) {
  if (frameCount % velAnim === 0) {
    frameActual += frameDir;

    //al llegar al último frame, invierto el sentido (rebote)
    if (frameActual >= arregloFrames.length - 1) {
      frameActual = arregloFrames.length - 1;
      frameDir = -1;
    } else if (frameActual <= 0) {
      frameActual = 0;
      frameDir = 1;
    }
  }

  push();
  translate(x, y);
  if (direccion === "DERECHA") {
    scale(-1, 1); 
  }
  image(arregloFrames[frameActual], 0, 0);
  pop();
}

//FUNCIÓN QUE RETORNA VALOR 
function obtenerFramesActuales() {
  if (estado === ATAQUE) {
    return ataqueFrames;
  } else if (estado === CAMINAR) {
    return caminarFrames;
  } else {
    return idleFrames;
  }
}

//DIBUJAR ESCUDO (con offset ajustable y espejado) 
function dibujarEscudo(x, y, direccion) {
  push();
  translate(x, y);
  if (direccion === "DERECHA") {
    scale(-1, 1);
  }
  image(escudoImg, escudoOffsetX, escudoOffsetY);
  pop();
}

//TOGGLE DEL ESCUDO
function keyPressed() {
  if (key === 'e' || key === 'E') {
    mostrarEscudo = !mostrarEscudo;
  }
}

//REINICIO 
function reiniciar() {
  personajeX = width / 2;
  personajeY = 470;
  frameActual = 0;
  frameDir = 1;
  estado = IDLE;
  mostrarEscudo = false;
  mirando = "IZQUIERDA";
}
