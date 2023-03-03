#include <ESP8266WiFi.h>
#include "HX711.h"
<<<<<<< HEAD
#include <ESP8266HTTPClient.h>

const char* ssid = "Jeoungho’s iPhone";
const char* password = "jayPak12";
//const char* server = "13.124.231.185:8088/dishes/weight";

String serverName = "https://ourkitty.site/api/dishes/weight?serialNumber=75200043643";
// String serverPath = "/dishes/weight?serialNumber=trick00000002";     // serverPath 기입
const int serverPort = 8088; // 포트번호
=======
#include <WiFiClientSecure.h>


const char* ssid = "Jeoungho’s iPhone";
const char* password = "jayPak12";
>>>>>>> 45049885f7bce92239f0c8c166603a7566b4a3f2

String serverName = "https://ourkitty.site/api/dishes/weight?serialNumber=75200043643";
const int httpsPort = 8088;

// HX711 circuit wiring
const int DOUT_PIN = D5;
const int CLK_PIN = D6;

HX711 scale;
WiFiClientSecure client;


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
<<<<<<< HEAD
  Serial.println("");
  Serial.print("Connected to WiFi network with IP Address: ");
  Serial.println(WiFi.localIP());
 
  Serial.println("Timer set to 5 seconds (timerDelay variable), it will take 5 seconds before publishing the first reading.");
=======
  Serial.println("Connected to WiFi");
  client.setInsecure();
>>>>>>> 45049885f7bce92239f0c8c166603a7566b4a3f2
}

void loop() {
  float weight = scale.get_units();
  if (weight) {
    Serial.println("weight:");
    Serial.println(weight);
    float weightt = weight * 55 / 117999;
    Serial.println("weight2:");
    Serial.println(weightt);
<<<<<<< HEAD

    if(WiFi.status()== WL_CONNECTED){


      HTTPClient http;
      WiFiClient client;

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
  // }


    // if (client.connect(serverName.c_str(), serverPort)) {
    //   Serial.println('serverPath');

    //   client.println("GET " + serverPath + " HTTP/1.1");
    
    //   // client.println("GET " + serverPath +  "?weight=" + String(weight) + " HTTP/1.1");
    //   client.println("Host: " + serverName);
    //   //client.println("Content-Type: text/plain");
    //   client.println("Connection: close");
    //   client.println();
    //   // client.print(String("GET ") + url + " HTTP/1.1\r\n" +
    //   //              "Host: " + server + "\r\n" + 
    //   //              "Connection: close\r\n\r\n");

    //   //Serial.println(url);
    //   Serial.println("Connected!");

    //   String getAll;
    //   String getBody;
    //   boolean state = false;
    //   Serial.print(".");    
    //   while (client.available()) {
    //     char c = client.read();
    //     if (c == '\n') {
    //       if (getAll.length()==0) { state=true; }
    //       getAll = "";
    //     }
    //     else if (c != '\r') { getAll += String(c); }
    //     if (state==true) { getBody += String(c); }
    //   }
    //   if (getBody.length()>0) { 
    //     Serial.println();
    //     Serial.println(getBody);
    //     Serial.println("YES!YES");
    //   }
    //   Serial.println("YES!");
    // }
    // }
=======

    //Check WiFi connection status
    if(WiFi.status()== WL_CONNECTED){
      HTTPClient http;

      String serverPath = serverName + "&foodWeight=" + weightt;
      
      // Your Domain name with URL path or IP address with path
      http.begin(client, serverPath.c_str(), httpsPort);

      // Send HTTP GET request
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
    else {
      Serial.println("WiFi Disconnected");
    }

>>>>>>> 45049885f7bce92239f0c8c166603a7566b4a3f2
  }
  delay(5000);
}