let exampleShader;
let backgroundImage;
let colourFactor = 1;
let ditherpattern;

function Change_Image() {
  console.log("image changed");
}

function preload(){
  exampleShader = loadShader("P5js/example.vert", "P5js/dither.frag");
  backgroundImage = loadImage("Images/betta2_dithered.png");
  dither_Pattern = loadImage("P5js/Dither_pattern.png");
}

function setup() {
  let canvas = document.getElementById("main-canvas");
  createCanvas(400, 400, WEBGL, canvas);
  
  shader(exampleShader);
  
  exampleShader.setUniform("background", backgroundImage);
  exampleShader.setUniform("ditherImg", dither_Pattern);
  exampleShader.setUniform("factor", colourFactor);
  noStroke();
}

function draw() {
  
  
  //ellipse(0, 0, width, height, 150);
  rect(0, 0, width, height);
  noLoop();
}
