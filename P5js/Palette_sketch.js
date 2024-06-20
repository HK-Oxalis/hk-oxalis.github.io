let exampleShader;
let backgroundImage;
let palette_Hue = true;
let palette_Saturation = true;
let palette_Value = true;

function preload(){
  exampleShader = loadShader("example.vert", "Palette.frag");
  backgroundImage = loadImage("elgbetta.jpg");
}

function setup() {
  createCanvas(400, 400, WEBGL);
  
  shader(exampleShader);
  
  exampleShader.setUniform("background", backgroundImage);

  noStroke();
}

function draw() {
  exampleShader.setUniform("background", backgroundImage);
  exampleShader.setUniform("palette_Hue", palette_Hue);
  exampleShader.setUniform("palette_Saturation", palette_Saturation);
  exampleShader.setUniform("palette_Value", palette_Value);
  
  //ellipse(0, 0, width, height, 150);
  rect(0, 0, width, height);
  noLoop();
}
