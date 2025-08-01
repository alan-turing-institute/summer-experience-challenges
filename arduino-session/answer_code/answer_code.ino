int sw0 = 10;
int sw1 = 11;
int sw2 = 12;
int sw3 = 13;
int clear_pin = 2;
int lock_pin = 3;

void setupSwitch(int pin){
  pinMode(pin, OUTPUT);
  digitalWrite(pin, HIGH);
}

void setup() {
  setupSwitch(sw0);
  setupSwitch(sw1);
  setupSwitch(sw2);
  setupSwitch(sw3);
  setupSwitch(clear_pin);
  pinMode(lock_pin, INPUT);
}

void pressSwitch(int switch_pin){
  int switch_delay = 50;
  digitalWrite(switch_pin, LOW);
  delay(switch_delay);
  digitalWrite(switch_pin, HIGH);
  delay(switch_delay);
}

void clearSafe(){
  int switch_delay = 50;
  digitalWrite(clear_pin, LOW);
  delay(switch_delay);
  digitalWrite(clear_pin, HIGH);
  delay(switch_delay);
}

void tryCombination(int a, int b, int c, int d){
  /* This is an array, if you want the pin number
      if you want the pin number for sw0, you can 
      use the code: switch_pins[0]. 
      For sw1 use the code switch_pins[1] etc. 
  */
  int switch_pins[] = {sw0, sw1, sw2, sw3};
  pressSwitch(switch_pins[a]);
  pressSwitch(switch_pins[b]);
  pressSwitch(switch_pins[c]);
  pressSwitch(switch_pins[d]);

}

bool checkSafe(){
  return digitalRead(lock_pin) == HIGH;
}

void loop() {
  bool safe_is_opened = false;
  for(int a = 0; a<4; a++){
    for (int b = 0; b<4; b++){
      for (int c = 0; c<4; c++){
        for (int d = 0; d<4; d++){
          clearSafe();
          tryCombination(a,b,c,d);
          safe_is_opened = checkSafe();
          if(safe_is_opened == true){
            delay(100000);
          }
        }
      }
    }
  }
}