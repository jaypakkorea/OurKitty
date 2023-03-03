#include <WiFi.h>
#include "HX711.h"
#include <HTTPClient.h>

const char* ssid = "nyang1";
const char* password = "nyang123";
//const char* server = "13.124.231.185:8088/dishes/weight";

String serverName = "http://13.124.231.185:8088/api/dishes/weight?serialNumber=2kXBPprXEcOdzPB";
// String serverPath = "/dishes/weight?serialNumber=trick00000002";     // serverPath 기입
const int serverPort = 8088; // 포트번호


// HX711 circuit wiring
const int DOUT_PIN = 5;
const int CLK_PIN = 4;

HX711 scale;
WiFiClient client;

void setup() {
  Serial.begin(115200);

  // scale.begin();
  Serial.println("HX711 Demo");
  Serial.println("Initializing the scale");

  scale.begin(DOUT_PIN, CLK_PIN);  
  Serial.println("Initializing");
  scale.set_scale();
  scale.tare();


  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("");
  Serial.print("Connected to WiFi network with IP Address: ");
  Serial.println(WiFi.localIP());
 
  Serial.println("Timer set to 5 seconds (timerDelay variable), it will take 5 seconds before publishing the first reading.");
}

void loop() {
  float weight = scale.get_units();
  if (weight) {
    Serial.println("weight:");
    Serial.println(weight);
    float weightt = weight * 55 / 57649;
    Serial.println("weight2:");
    Serial.println(weightt);

    if(WiFi.status()== WL_CONNECTED){


      HTTPClient http;
      

      String serverPath = serverName + "&foodWeight=" + weightt ;
      Serial.println(serverPath);
      http.begin(client, serverPath.c_str());
      
      int httpResponseCode = http.GET();

      if (httpResponseCode>0) {
        Serial.print("HTTP Response code: ");
        Serial.println(httpResponseCode);
        String payload = http.getString();
        Serial.println(payload);
      }

      else {
        Serial.print("Error code: ");
        Serial.println(httpResponseCode);
      }
      // Free resources
      http.end();
      }
    }
  delay(5000);
}