#include <WiFi.h>
#include <ESPmDNS.h>
#include <WiFiClient.h>
#include <WebSocketServer.h>
#include <ArduinoJson.h>

#include "ISE_pH.h"
ISE_pH ufire_obj;

const char *ssid     = "";
const char *password = "";

WiFiServer server(80);
WebSocketServer webSocketServer;

void setup(void)
{
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {}
  MDNS.begin("ufire");
  server.begin();
  MDNS.addService("http", "tcp", 80);
}

void loop(void)
{
  WiFiClient client = server.available();

  if (client.connected() && webSocketServer.handshake(client)) {
    while (client.connected()) {
      const size_t bufferSize = JSON_OBJECT_SIZE(5);
      DynamicJsonBuffer jsonBuffer(bufferSize);
      String json;

      JsonObject& root = jsonBuffer.createObject();
      root["name"]      = "uFire pH";
      root["unit"]      = "pH";
      root["value"]     = String(ufire_obj.measurepH());
      root["temp"]      = String(ufire_obj.measureTemp());
      root["temp_unit"] = "C";
      root.printTo(json);
      webSocketServer.sendData(json);
    }
  }
}
