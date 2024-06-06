let exampleShader;
let backgroundImage;
let colourFactor = 1;
let ditherpattern;
let ditherMatrix = [0,  8,  2,  10,
                    12, 4,  14, 6,
                     3,  11, 1,  9,
                    15, 7,  13, 5];
function preload(){
  exampleShader = loadShader("example.vert", "dither.frag");
  backgroundImage = loadImage("elgbetta.jpg");
  dither_Pattern = loadImage("Dither_pattern.png");
}

function setup() {
  createCanvas(400, 400, WEBGL);
  
  shader(exampleShader);
  
  exampleShader.setUniform("background", backgroundImage);
  exampleShader.setUniform("ditherImg", dither_Pattern);
  exampleShader.setUniform("factor", colourFactor);
  exampleShader.setUniform("matrix", ditherMatrix);
  noStroke();
}

function draw() {
  
  
  //ellipse(0, 0, width, height, 150);
  rect(0, 0, width, height);
  noLoop();
}
