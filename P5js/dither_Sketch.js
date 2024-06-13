let exampleShader;
let backgroundImage;
let colourFactor = 1;
let ditherpattern;

function Change_Image() {
  let userFile = document.getElementById("image-input").files;
  //userFile = userFile.replace("C:\\fakepath\\", "");
  console.log(userFile);
  let userFileURL = URL.createObjectURL(userFile[0]);

  backgroundImage = loadImage(userFileURL, draw);
  
  
}

function Image_Error(){
  console.log("Image failed to load");
}

function preload(){
  exampleShader = loadShader("P5js/example.vert", "P5js/dither.frag");
  backgroundImage = loadImage("Images/betta2_dithered.png");
  dither_Pattern = loadImage("P5js/Dither_pattern.png");
}

function setup() {
  var canvas = document.getElementById("main-canvas");
  createCanvas(400, 400, WEBGL, canvas);
  
  shader(exampleShader);
  
  exampleShader.setUniform("background", backgroundImage);
  exampleShader.setUniform("ditherImg", dither_Pattern);
  exampleShader.setUniform("factor", colourFactor);
  noStroke();

  //createFileInput(Image_Loaded);
}

function draw() {
  exampleShader.setUniform("background", backgroundImage);
  exampleShader.setUniform("ditherImg", dither_Pattern);
  exampleShader.setUniform("factor", colourFactor);

  background(0);
  rect(0, 0, backgroundImage.width, backgroundImage.height);
  noLoop();
}
