int sw0 = 9;
int sw1 = 10;
int sw2 = 11;
int sw3 = 12;
int clear_pin = 5;
int lock_pin = 6;
int switch_offset = 9;

void setup() {
  // put your setup code here, to run once:
  pinMode(sw0, OUTPUT);
  pinMode(sw1, OUTPUT);
  pinMode(sw2, OUTPUT);
  pinMode(sw3, OUTPUT);
  pinMode(clear_pin, OUTPUT);
  pinMode(lock_pin, INPUT);

  digitalWrite(sw0, HIGH);
  digitalWrite(sw1, HIGH);
  digitalWrite(sw2, HIGH);
  digitalWrite(sw3, HIGH);

}

void clearSafe() {
  int clear_delay = 50;
  digitalWrite(clear_pin, LOW);
  delay(clear_delay);
  digitalWrite(clear_pin, HIGH);
  delay(clear_delay);
}

void pressSwitch(int switch_pin) {
  int switch_delay = 50;
  digitalWrite(switch_pin, LOW);
  delay(switch_delay);
  digitalWrite(switch_pin, HIGH);
  delay(switch_delay);
}

void loop() {
    for(int a = 0 + switch_offset; a<4 + switch_offset; a++){
      for (int b = 0 + switch_offset; b<4 + switch_offset; b++){
        for (int c = 0 + switch_offset; c<4 + switch_offset; c++){
          for (int d = 0 + switch_offset; d<4 + switch_offset; d++){
            clearSafe();
            pressSwitch(a);
            pressSwitch(b);
            pressSwitch(c);
            pressSwitch(d);
            delay(100);
            if (digitalRead(lock_pin)==HIGH) {
              delay(10000);
            }
          }
        }
      }
    }
}