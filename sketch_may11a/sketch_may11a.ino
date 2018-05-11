char trans[20];

void setup(){
  pinMode(0, OUTPUT);
  Serial.begin(9600);
}

void loop(){
  int a_in,b_in,c_in;
  int distance_a,distance_b,distance_c;
  a_in = analogRead(0);
  b_in = analogRead(1);
  c_in = analogRead(2);
  distance_a = (6762/(a_in-9))-4;
  distance_b = (6762/(b_in-9))-4;
  distance_c = (6762/(c_in-9))-4;
  if (Serial.available() > 0){
    String str = Serial.readStringUntil(';');
     memset(trans, 0, 20);
     char *json = &trans[0];
     sprintf(json, "{\"a\":%d, \"b\":%d, \"c\":%d}",  distance_a < 20 ? 1:0,  distance_b < 20 ? 1:0,  distance_c < 20 ? 1:0);
     Serial.println(json);
  }
}
