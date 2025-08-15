int sw0 = 9;
int sw1 = 10;
int sw2 = 11;
int sw3 = 12;
int clear_pin = 5;
int lock_pin = 6

void setup() {
  pinMode(sw0, OUTPUT);
  pinMode(sw1, OUTPUT);
  pinMode(sw2, OUTPUT);
  pinMode(sw3, OUTPUT);
  pinMode(clear_pin, OUTPUT);
  pinMode(lockpin, INPUT);
}

void pressSwitch(int switch_pin){
  int time_delay = 50;
  digitalWrite(switch_pin, LOW);
  delay(time_delay);
  digitalWrite(switch_pin, HIGH);
  delay(time_delay);
}

void loop() {
  for (int first_digit = sw0; first_digit < (sw3+1); first_digit++)
    for (int second_digit = sw0; second_digit < (sw3+1); second_digit++)
      for (int third_digit = sw0; third_digit < (sw3+1); third_digit++)
        for (int forth_digit = sw0; forth_digit < (sw3+1); forth_digit++){
          pressSwitch(clear_pin);
          pressSwitch(first_digit);
          pressSwitch(second_digit);
          pressSwitch(third_digit);
          pressSwitch(forth_digit);
          // Check if safe is unlocked by reading the lock_pin
          if (digitalRead(lock_pin)==HIGH) {
            delay(10000);
          }
        }
      }
    }
  }
}