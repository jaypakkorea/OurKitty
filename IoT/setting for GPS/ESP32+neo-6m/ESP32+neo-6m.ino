#include <HardwareSerial.h>

#define RXD2 16
#define TXD2 17
HardwareSerial neogps(1);

void setup(){
  Serial.begin(115200);
  neogps.begin(9600, SERIAL_8N1, RXD2, TXD2);
}

void loop(){

  if(neogps.available() > 0) {
    String command = neogps.readStringUntil('\n'); //추가 시리얼의 값을 수신하여 String으로 저장
    Serial.println(command); //기본 시리얼에 추가 시리얼 내용을 출력
  }

}
