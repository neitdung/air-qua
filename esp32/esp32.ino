#include<ESP8266WiFi.h>

#include<PubSubClient.h>

#include<MQ7.h>

#include<stdlib.h>

const char * ssid = "Kim Anh 2.4";
const char * pass = "123456@#";
// const char * host = "c3c05bf6b7ff4f5fa23905cb6c726879.s2.eu.hivemq.cloud";
// const int port = 8883;
const char * host = "broker.hivemq.com";
const int port = 1883;
const char * username = "phtr311";
const char * password = "PhiTruong3120";
const char * mqtt_topic = "/hust/c3c05bf6b7ff4f5fa23905cb6c726879";
String clientID = "c3c05bf6b7ff4f5fa23905cb6c726879";

WiFiClient wfClient;
PubSubClient psClient(wfClient);
void wifiConnect() {
  Serial.print("Connect to ");
  Serial.println(ssid);
  WiFi.begin(ssid, pass);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  };
  Serial.println();
  Serial.println("Connected");
  Serial.println("The IP address: ");
  Serial.println(WiFi.localIP());
}
void reconnect() {
  while (!psClient.connected()) {
    if (psClient.connect(clientID.c_str(), username, password)) {
      Serial.println("Connected!");
      psClient.publish(mqtt_topic, "Reconnect");
    } else {
      Serial.println("Failed to connect to server, rc = ");
      Serial.println(psClient.state());
      Serial.println("Wait for 5 seconds");
      delay(5000);
    }
  }
}
void setup() {
  Serial.begin(9600);
  wifiConnect();
  psClient.setServer(host, port);
  reconnect();
}
void loop() {
//  delay(2000);
  if (!psClient.connected()) {
    reconnect();
  } else {
    // String ppm = String(analogRead(A0));
    MQ7 mq7(A0, 5.0);
    float ppmFloat = mq7.getPPM();
    String ppm = clientID + "," + String(ppmFloat, 3);
    Serial.println("********** Publish MQTT data to Server");
    const char * cstr = ppm.c_str();
    psClient.publish(mqtt_topic, cstr);
    Serial.println(ppm);
    Serial.println(" MQTT data published");
    Serial.println("********** End ");
    delay(1000);
  }
}
