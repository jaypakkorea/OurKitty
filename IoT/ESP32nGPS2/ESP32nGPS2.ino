#include <WiFi.h>
#include <HTTPClient.h>
#include <TinyGPS++.h>


TinyGPSPlus gps;
WiFiClient client;


#define RXD2 23
#define TXD2 2

HardwareSerial neogps(1);

const char * ssid = "Jeoungho’s iPhone";
const char * password = "jayPak12";
String serverName = "https://ourkitty.site/api";   // 아이피 주소 기입
String serverPath = "/dishes/location?serialNumber=2kXBPprXEcOdzPB";     // serverPath 기입
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
      Serial.println(gps.location.lat(),8);
      Serial.println("longitude =");
      Serial.println(gps.location.lng(),8);

      float lon = gps.location.lng();
      float lat = gps.location.lat();

      if (client.connect(serverName.c_str(), serverPort)) {
        client.println("GET " + serverPath +  "&" + "lon=" + lon + "&" + "lat=" + lat + " HTTP/1.1");

        client.println("Host: " + serverName);
        client.println("Connection: close");
        client.println();
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
  else
  {
    Serial.println("No new data is received.");
  }  

}
