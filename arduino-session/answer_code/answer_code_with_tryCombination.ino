int sw0 = 10;
int sw1 = 11;
int sw2 = 12;
int sw3 = 13;
int clear_pin = 2;
int lock_pin = 3;

void setup() {
  pinMode(lock_pin, INPUT);
  pinMode(clear_pin, OUTPUT);
  //Set pins to be OUTPUTs and turn off
  pinMode(sw0, OUTPUT);
  digitalWrite(sw0, HIGH);

  pinMode(sw1, OUTPUT);
  digitalWrite(sw1, HIGH);

  pinMode(sw2, OUTPUT);
  digitalWrite(sw2, HIGH);

  pinMode(sw3, OUTPUT);
  digitalWrite(sw3, HIGH);
}

void pressSwitch(int switch_pin){
  int switch_delay = 50;
  digitalWrite(switch_pin, LOW);
  delay(switch_delay);
  digitalWrite(switch_pin, HIGH);
  delay(switch_delay);
}
void clear_safe(){
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
  bool safe_is_locked = false;


  for(int a = 0; a<4; a++){
    for (int b = 0; b<4; b++){
      for (int c = 0; c<4; c++){
        for (int d = 0; d<4; d++){
          clear_safe();
          tryCombination(a,b,c,d);
          safe_is_locked = checkSafe();
          if(safe_is_locked == true){
            delay(5000);
          }

        }
      }
    }
  }
  

}













