#include <SoftwareSerial.h>
#include <WiFiClient.h>
#include <TinyGPS++.h>
#include <ESP8266WiFi.h>

const char* ssid = "Jeoungho’s iPhone";
const char* password = "jayPak12";
const char* server = "192.168.30.134:8088/dishes/location";

SoftwareSerial serialGPS(2, 3);  // RX, TX
TinyGPSPlus gps;
WiFiClient client;

void setup() {
  Serial.begin(115200);
  serialGPS.begin(9600);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");
}

void loop() {
  while (serialGPS.available()) {
    gps.encode(serialGPS.read());
  }

  if (gps.location.isUpdated()) {
    String url = String("http://") + server + "?lat=" + String(gps.location.lat(), 6) + "&lon=" + String(gps.location.lng(), 6);
    if (client.connect(server, 80)) {
      client.print(String("GET ") + url + " HTTP/1.1\r\n" +
                   "Host: " + server + "\r\n" + 
                   "Connection: close\r\n\r\n");
      Serial.println(url);
    }
  }
  delay(5000);
}