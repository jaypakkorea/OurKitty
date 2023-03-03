#include <TinyGPS++.h>
#include <SoftwareSerial.h>

const char* ssid = "Jeoungho’s iPhone";
const char* password = "jayPak12";


String serverName = "13.124.231.185";   // 아이피 주소 기입
String serverPath = "/dishes/location";     // serverPath 기입
const int serverPort = 8088; // 포트번호


const int RX_PIN = D8;
const int TX_PIN = D7;
SoftwareSerial serialGPS(RX_PIN, TX_PIN);
TinyGPSPlus gps;
WiFiClient client;

void setup() {
  Serial.begin(115200);

  Serial.println("GPS Start");
  serialGPS.begin(9600);

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");
}

void loop() {

  while (serialGPS.available() > 0) {
    gps.encode(serialGPS.read());
  }

  if (gps.location.isValid()) {
    Serial.print("Latitude: ");
    Serial.println(gps.location.lat(), 6);
    Serial.print("Longitude: ");
    Serial.println(gps.location.lng(), 6);
  } else {
    Serial.println("No GPS data");
  }
  if (gps.location.isValid()) {
    Serial.print("Longitude: ");
    Serial.println(gps.location.lng(), 6);
    Serial.print("Latitude: ");
    Serial.println(gps.location.lat(), 6);

    float lon = gps.location.lng();
    float lat = gps.location.lat();

    //String url = String("http://") + server + "?weight=" + String(weight);
    if (client.connect(serverName.c_str(), serverPort)) {
      client.println("GET " + serverPath +  "?lon=" + lon + "&" + "lat=" + lat + " HTTP/1.1");

      client.println("Host: " + serverName);
      client.println("Connection: close");
            client.println();
      // client.print(String("GET ") + url + " HTTP/1.1\r\n" +
      //              "Host: " + server + "\r\n" + 
      //              "Connection: close\r\n\r\n");

      //Serial.println(url);
      Serial.println("Connected!");

      String getAll;
      String getBody;
      boolean state = false;
      Serial.print(".");    
      while (client.available()) {
        char c = client.read();
        if (c == '\n') {
          if (getAll.length()==0) { state=true; }
          getAll = "";
        }
        else if (c != '\r') { getAll += String(c); }
        if (state==true) { getBody += String(c); }
      }
      if (getBody.length()>0) { 
        Serial.println();
        Serial.println(getBody);
      }
    }
  }
  delay(1000);
}