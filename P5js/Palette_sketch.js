let exampleShader;
let backgroundImage;
let palette_Hue = true;
let palette_Saturation = true;
let palette_Value = true;

function Change_Image() {
  let userFile = document.getElementById("image-input").files;
  let userFileURL = URL.createObjectURL(userFile[0]);

  backgroundImage = loadImage(userFileURL, draw);  
}

function Change_Settings(){
  draw();
}

function preload(){
  exampleShader = loadShader("example.vert", "Palette.frag");
  backgroundImage = loadImage("elgbetta.jpg");
}

function setup() {
  var canvas = document.getElementById("main-canvas");
  createCanvas(400, 400, WEBGL, canvas);
  
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
