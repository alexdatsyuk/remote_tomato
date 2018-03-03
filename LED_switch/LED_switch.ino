#define LED 13

String incomingMessage;

void setup() {
  pinMode(LED, OUTPUT);
  Serial.begin(9600);
}

void enableLED() {
  digitalWrite(LED, HIGH);
  Serial.println("LED enabled");
}

void disableLED() {
  digitalWrite(LED, LOW);
  Serial.println("LED disabled");
}

void chooseCommand(String message) {
  if (message == "enable LED") {
    enableLED();
  } else {
    disableLED();
  }
}

void loop() {
  if (Serial.available()) {
    incomingMessage = Serial.readString();
    Serial.println(incomingMessage);
    chooseCommand(incomingMessage);
  }
}
