precision mediump float;

vec3 rgb2hsv(vec3 c)
{
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
    vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));

    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

vec3 hsv2rgb(vec3 c)
{
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

varying vec2 pos;

uniform sampler2D background;
uniform bool palette_Hue;
uniform bool palette_Saturation;
uniform bool palette_Value;

vec3 colour1 = vec3(68, 104, 68);
vec3 colour2 = vec3(35, 51, 35);
vec3 colour3 = vec3(129, 105, 85);
vec3 colour4 = vec3(86, 61, 41);
vec3 colour5 = vec3(104, 64, 88);
vec3 colour6 = vec3(69, 33, 54);
vec3 colour7 = vec3(86, 41, 41);
vec3 colour8 = vec3(64, 43, 43);

vec3 closest_Colour(vec3 target_Col, vec3 prev_Col, vec3 new_Col)
{
  vec3 new_Difference = new_Col - target_Col;
  vec3 prev_Difference = prev_Col - target_Col;
  
  if (length(new_Difference) <= length(prev_Difference)){
    return new_Col;
  }
  else{
    return prev_Col;
  }
}

void main(){
  vec2 newPos = pos;
  newPos.y = 1. - newPos.y;
  
  vec4 sample_Col = texture2D(background, newPos);
  vec3 target_Col = sample_Col.rgb * 255.;
    
  vec3 prev_Col = closest_Colour(target_Col, colour1, colour2);
  
  prev_Col = closest_Colour(target_Col, prev_Col, colour3);
  prev_Col = closest_Colour(target_Col, prev_Col, colour4);
  prev_Col = closest_Colour(target_Col, prev_Col, colour5);
  prev_Col = closest_Colour(target_Col, prev_Col, colour6);
  prev_Col = closest_Colour(target_Col, prev_Col, colour7);
  prev_Col = closest_Colour(target_Col, prev_Col, colour8);

  target_Col = target_Col/255.;
  vec3 hsv_Col = rgb2hsv(prev_Col / 255.);
  vec3 hsv_Sample = rgb2hsv(target_Col);
  
  vec3 final_Col = hsv_Sample;
  
  if(palette_Hue){final_Col.r = hsv_Col.r;}
  if(palette_Saturation){final_Col.g = hsv_Col.g;}
  if(palette_Value){final_Col.b = hsv_Col.b; }
  
  final_Col = hsv2rgb(final_Col);
  
  gl_FragColor = vec4((final_Col), 1);
}

