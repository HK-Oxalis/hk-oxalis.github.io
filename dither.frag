precision mediump float;

varying vec2 pos;

uniform float factor;

uniform sampler2D background;
uniform sampler2D ditherImg;


float indexLookup(vec2 pos){
  float x = mod(pos.x, 4.) / 4.;
  float y = mod(pos.y, 4.) / 4.;
  vec4 ditherCol = texture2D(ditherImg, vec2(x, y));
  return ditherCol.r + 0.1;
}

float dither(vec4 col){
  vec4 colQ = step(0.5, col);
  
  float d = indexLookup(gl_FragCoord.xy);
  float distance = abs(colQ.r - col.r);
  
  float dCol = (distance < d) ? colQ.r : 1. - colQ.r;
  
  return dCol;
}


void main(){
  vec2 newPos = pos;
  newPos.y = 1. - newPos.y;
  
  vec4 col = texture2D(background, newPos);
  
  //colQ.r = floor(factor * col.r + 0.5) /factor;
  //colQ.g = floor(factor * col.g + 0.5) /factor;
  //colQ.b = floor(factor * col.b + 0.5) /factor;
  col = vec4(vec3((col.r + col.g + col.b)/3.), col.a);
  
  gl_FragColor = vec4(vec3(dither(col)), 1);
}

