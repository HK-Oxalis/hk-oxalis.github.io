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
uniform sampler2D palette_Img;
uniform float palette_Size;
uniform bool palette_Hue;
uniform bool palette_Saturation;
uniform bool palette_Value;






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
  vec3 target_Col = sample_Col.rgb;
  
  float palette_Offset = 1. / palette_Size;
  
  vec3 prev_Col = texture2D(palette_Img, vec2(0,0)).rgb;
  
  
  for (float i = 0.; i < 20.; i++){
    
    if(i > palette_Size){break;}
    
    vec3 new_Col = texture2D(palette_Img, vec2(palette_Offset * i , 1.)).rgb;
    
    prev_Col = closest_Colour(target_Col, prev_Col, new_Col);
  }

  target_Col = target_Col;
  vec3 hsv_Col = rgb2hsv(prev_Col);
  vec3 hsv_Sample = rgb2hsv(target_Col);
  
  vec3 final_Col = hsv_Sample;
  
  if(palette_Hue){final_Col.r = hsv_Col.r;}
  if(palette_Saturation){final_Col.g = hsv_Col.g;}
  if(palette_Value){final_Col.b = hsv_Col.b; }
  
  final_Col = hsv2rgb(final_Col);
  
  gl_FragColor = vec4((final_Col), 1);
}


