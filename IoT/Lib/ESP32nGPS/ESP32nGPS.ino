/************************************************************************************
 *  Created By: Tauseef Ahmad
 *  Created On: October 23, 2021
 *  
 *  Tutorial Video: https://youtu.be/yem5EysVloc
 *  My Channel: https://www.youtube.com/channel/UCOXYfOHgu-C-UfGyDcu5sYw/
 *  
 *  *********************************************************************************
 *  Preferences--> Aditional boards Manager URLs : 
 *  For ESP32:
 *  https://dl.espressif.com/dl/package_esp32_index.json
 *  
 **********************************************************************************/
 
//----------------------------
#include <WiFi.h>
#include <HTTPClient.h>
//----------------------------

//--------------------------------------------
#include <TinyGPS++.h>
TinyGPSPlus gps;

#define RXD2 4
#define TXD2 2

HardwareSerial neogps(1);
//--------------------------------------------

//---------------------------------------------------------------------
//
//
//ENTER_GOOGLE_DEPLOYMENT_ID
const char * ssid = "Jeoungho’s iPhone";
const char * password = "jayPak12";
// String GOOGLE_SCRIPT_ID = "AKfycbzVO4sCwBYlYUlZrH0985NdlPFpCPJ7_h1NbDb7D007MXz_rCTIs57UfnBoQG7wsdwr";
//---------------------------------------------------------------------
String serverName = "13.124.231.185";   // 아이피 주소 기입
String serverPath = "/dishes/location";     // serverPath 기입
const int serverPort = 8088; // 포트번호


const int sendInterval = 2000;

/************************************************************************************
 *  setup function starts
 **********************************************************************************/
 void setup() {
  //--------------------------------------------
  Serial.begin(115200);
  //start serial communication with Serial Monitor
  //--------------------------------------------
  //start serial communication with Neo6mGPS
  neogps.begin(9600, SERIAL_8N1, RXD2, TXD2);
  delay(10);
  //--------------------------------------------
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);

  Serial.print("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("OK");
  //--------------------------------------------
}
//MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM



/************************************************************************************
 *  loop function starts
 **********************************************************************************/
void loop() {
    
  boolean newData = false;
  for (unsigned long start = millis(); millis() - start < 1000;)
  {
    while (neogps.available())
    {
      if (gps.encode(neogps.read()))
        {newData = true;}
    }
  }

  //If newData is true
  if(newData == true)
  {
    newData = false;
    // Serial.println(gps.satellites.value());
    Serial.println("latitude =");
    Serial.println(gps.location.lat(),6);
    Serial.println("longitude =");
    Serial.println(gps.location.lng(),6);

  }
  else
  {
    Serial.println("No new data is received.");
  }  

}
//MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM


