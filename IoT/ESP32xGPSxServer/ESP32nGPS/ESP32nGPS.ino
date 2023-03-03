/*
  Rui Santos
  Complete project details at Complete project details at https://RandomNerdTutorials.com/esp32-http-get-post-arduino/

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files.

  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.
*/

#include <WiFi.h>
#include <HTTPClient.h>
#include <SoftwareSerial.h>
#include <TinyGPS++.h>

TinyGPSPlus gps;

WiFiClient client;

#define RXD2 4
#define TXD2 2

SoftwareSerial ss(TXD2, RXD2);

const char* ssid = "Jeoungho’s iPhone";
const char* password = "jayPak12";

//Your Domain name with URL path or IP address with path
String serverName = "https://ourkitty.site/api/dishes/location?serialNumber=2kXBPprXEcOdzPB";

// the following variables are unsigned longs because the time, measured in
// milliseconds, will quickly become a bigger number than can be stored in an int.
unsigned long lastTime = 0;
// Timer set to 10 minutes (600000)
//unsigned long timerDelay = 600000;
// Set timer to 5 seconds (5000)
unsigned long timerDelay = 5000;

void setup() {
  Serial.begin(115200); 

  WiFi.begin(ssid, password);
  Serial.println("Connecting");
  while(WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected to WiFi network with IP Address: ");
  Serial.println(WiFi.localIP());
    // GPS 관련
  //start serial communication with Serial Monitor
  //--------------------------------------------
  //start serial communication with Neo6mGPS
  ss.begin(9600);
  delay(10);
  //-----
\
 
  Serial.println("Timer set to 5 seconds (timerDelay variable), it will take 5 seconds before publishing the first reading.");
}

void loop() {
  //Send an HTTP POST request every 10 minutes
  if ((millis() - lastTime) > timerDelay) {
    boolean newData = false;
    float lon, lat;

    while (ss.available() > 0) {
      if (gps.encode(ss.read()) && gps.location.isValid()) {
        newData = true;
        lon = gps.location.lng();
        lat = gps.location.lat();
        Serial.print("Latitude: ");
        Serial.println(lat, 6);
        Serial.print("Longitude: ");
        Serial.println(lon, 6);
      } else {
        Serial.println("Location is not valid");
      }
    }

    if (newData == true) {
      //Check WiFi connection status
      if(WiFi.status()== WL_CONNECTED){
        HTTPClient http;

        // lon = 35.2544;
        // lat = 128.6278;

        String serverPath = serverName + "&lon=" + lon + "&lat=" + lat;
        
        // Your Domain name with URL path or IP address with path
        http.begin(serverPath.c_str());
        
        // If you need Node-RED/server authentication, insert user and password below
        //http.setAuthorization("REPLACE_WITH_SERVER_USERNAME", "REPLACE_WITH_SERVER_PASSWORD");
        
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

    }
    else {
      Serial.println("No GPS Data");
    }
    lastTime = millis();
  }
}
