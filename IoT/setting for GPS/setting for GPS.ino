#include <HardwareSerial.h>

HardwareSerial gpsSerial(2);

void setup(){
  gpsSerial.begin(9600, SERIAL_8N1, 17, 16);
}

void loop(){
  if (gpsSerial.available()) {
    String gpsData = gpsSerial.readStringUntil('\n');
    // process the GPS data
  }
}


// #include <TinyGPS++.h>
// #include <SoftwareSerial.h>

// static const int RXPin = 4, TXPin = 3;
// static const uint32_t GPSBaud = 9600;

// // The TinyGPS++ object
// TinyGPSPlus gps;

// // The serial connection to the GPS device
// SoftwareSerial ss(RXPin, TXPin);

// void setup(){
//   Serial.begin(9600);
//   ss.begin(GPSBaud);
// }

// void loop(){
//   while (ss.available() > 0){
//     gps.encode(ss.read());
//     if (gps.location.isUpdated()){
//       Serial.print("Latitude= "); 
//       Serial.print(gps.location.lat(), 6);
//       Serial.print(" Longitude= "); 
//       Serial.println(gps.location.lng(), 6);
//     }
//   }
// }






// #include <SoftwareSerial.h>
// #include <TinyGPS.h>
 
// // Define which pins you will use on the Arduino to communicate with your 
// // GPS. In this case, the GPS module's TX pin will connect to the 
// // Arduino's RXPIN which is pin 3.
// #define RXPIN 5
// #define TXPIN 6
// //Set this value equal to the baud rate of your GPS
// #define GPSBAUD 9600
 
// // Create an instance of the TinyGPS object
// TinyGPS gps;
// // Initialize the NewSoftSerial library to the pins you defined above
// SoftwareSerial uart_gps(RXPIN, TXPIN);
 
// // This is where you declare prototypes for the functions that will be 
// // using the TinyGPS library.
// void getgps(TinyGPS &gps);
 
// // In the setup function, you need to initialize two serial ports; the 
// // standard hardware serial port (Serial()) to communicate with your 
// // terminal program an another serial port (NewSoftSerial()) for your 
// // GPS.
// void setup()
// {
//   // This is the serial rate for your terminal program. It must be this 
//   // fast because we need to print everything before a new sentence 
//   // comes in. If you slow it down, the messages might not be valid and 
//   // you will likely get checksum errors.
//   Serial.begin(9600);
//   //Sets baud rate of your GPS
//   uart_gps.begin(GPSBAUD);
  
//   Serial.println("");
//   Serial.println("GPS Shield QuickStart Example Sketch v12");
//   Serial.println("       ...waiting for lock...           ");
//   Serial.println("");
// }
 
// // This is the main loop of the code. All it does is check for data on 
// // the RX pin of the ardiuno, makes sure the data is valid NMEA sentences, 
// // then jumps to the getgps() function.
// void loop()
// {
//   while(uart_gps.available())     // While there is data on the RX pin...
//   {
//       int c = uart_gps.read();    // load the data into a variable...
//       if(gps.encode(c))      // if there is a new valid sentence...
//       {
//         getgps(gps);         // then grab the data.
//       }   
//   }
// }
 
// // The getgps function will get and print the values we want.
// void getgps(TinyGPS &gps)
// {
//   // To get all of the data into varialbes that you can use in your code, 
//   // all you need to do is define variables and query the object for the 
//   // data. To see the complete list of functions see keywords.txt file in 
//   // the TinyGPS and NewSoftSerial libs.
  
//   // Define the variables that will be used
//   float latitude, longitude;
//   // Then call this function
//   gps.f_get_position(&latitude, &longitude);
//   // You can now print variables latitude and longitude
//   Serial.print("Lat/Long: "); 
//   Serial.print(latitude,5); 
//   Serial.print(", "); 
//   Serial.println(longitude,5);
  
//   // Same goes for date and time
//   int year;
//   byte month, day, hour, minute, second, hundredths;
//   gps.crack_datetime(&year,&month,&day,&hour,&minute,&second,&hundredths);
//   // Print data and time
//   Serial.print("Date: "); Serial.print(month, DEC); Serial.print("/"); 
//   Serial.print(day, DEC); Serial.print("/"); Serial.print(year);
//   Serial.print("  Time: "); Serial.print(hour, DEC); Serial.print(":"); 
//   Serial.print(minute, DEC); Serial.print(":"); Serial.print(second, DEC); 
//   Serial.print("."); Serial.println(hundredths, DEC);
//   //Since month, day, hour, minute, second, and hundr
  
//   // Here you can print the altitude and course values directly since 
//   // there is only one value for the function
//   Serial.print("Altitude (meters): "); Serial.println(gps.f_altitude());  
//   // Same goes for course
//   Serial.print("Course (degrees): "); Serial.println(gps.f_course()); 
//   // And same goes for speed
//   Serial.print("Speed(kmph): "); Serial.println(gps.f_speed_kmph());
//   Serial.println();
  
//   // Here you can print statistics on the sentences.
//   unsigned long chars;
//   unsigned short sentences, failed_checksum;
//   gps.stats(&chars, &sentences, &failed_checksum);
//   //Serial.print("Failed Checksums: ");Serial.print(failed_checksum);
//   //Serial.println(); Serial.println();
//   delay(1000);
// }
