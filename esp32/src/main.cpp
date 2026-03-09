#include <Arduino.h>
// esp32 libs
#include <WiFi.h>
#include <WiFiUdp.h>
#include <HTTPClient.h>
#include <ESPAsyncWebServer.h>
// for json
#include <ArduinoJson.h>
// dht lib
#include <dht.h>
// display libs
#include <Adafruit_GFX.h>
#include <gfxfont.h>
#include <Wire.h>
#include <Adafruit_SSD1306.h>
#include <splash.h>
// LittleFS
#include <LittleFS.h>
// time
#include <NTPClient.h>
// sensitive data
#include <passwords.h>

// display config & setup
#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 32
#define OLED_RESET -1
#define SCREEN_ADDRESS 0x3C
Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);

// time config
const char *ntpServer = "pool.ntp.org";
const long gmtOffset_sec = 0;

// time
WiFiUDP ntpUPD;
NTPClient timeClient(ntpUPD, ntpServer, gmtOffset_sec);

// dht setup
dht DHT;
#define dht_pin 4
// functions
String getDate();

void setup()
{
	// put your setup code here, to run once:
	Serial.begin(115200);
	if (!display.begin(SSD1306_SWITCHCAPVCC, SCREEN_ADDRESS))
	{
		Serial.println("display failed");
	}
	Serial.println("display started");

	display.setTextSize(1);
	display.setTextColor(SSD1306_WHITE);
	display.setCursor(0, 0);
	display.clearDisplay();
	display.display();

	WiFi.begin(mySsid, myPassword);

	while (WiFi.status() != WL_CONNECTED)
	{
		delay(1000);
		Serial.println(".");
	}
	Serial.println(WiFi.localIP());

	timeClient.begin();
	if (!timeClient.update())
	{
		Serial.println("cannot get time");
	}
}

unsigned long lastPrintTime = 0;
unsigned long lastCurrentPostTime = 0;

int lastSentHour = -1;

void loop()
{
	timeClient.update();
	unsigned long currentMillis = millis();
	if (currentMillis - lastPrintTime >= 5000)
	{
		DHT.read11(dht_pin);
		display.clearDisplay();
		display.setCursor(0, 0);
		display.print("Temperature:");
		display.println(DHT.temperature);
		display.print("Humidity:");
		display.println(DHT.humidity);
		display.print("Time:");
		display.print(timeClient.getHours() + 2);
		display.print(":");
		display.println((timeClient.getMinutes() < 10 ? "0" : "") + String(timeClient.getMinutes()));
		display.display();
		lastPrintTime = currentMillis;
	}

	if (currentMillis - lastCurrentPostTime >= 60000)
	{
		DHT.read11(dht_pin);
		HTTPClient http;
		String currentServerUrl = serverUrl + String("/current");
		http.begin(currentServerUrl);
		http.addHeader("Content-Type", "application/json");

		String jsonPayload = "{\"temp\":" + String(DHT.temperature) +
							 ", \"humid\":" + String(DHT.humidity) +
							 ", \"time\":" + (timeClient.getEpochTime() * 1000 - 42600000) + "}";
		int responseCode = http.POST(jsonPayload);
		if (responseCode > 0)
		{
			Serial.print("sent data to current, code: ");
			Serial.println(responseCode);
		}
		else
		{
			Serial.print("some error happened, code: ");
			Serial.println(responseCode);
		}
		http.end();
		lastCurrentPostTime = currentMillis;
	}

	int currentHour = timeClient.getHours();
	int currentMinute = timeClient.getMinutes();

	if (currentMinute == 0 && currentHour != lastSentHour)
	{
		DHT.read11(dht_pin);
		HTTPClient http;
		http.begin(serverUrl);
		http.addHeader("Content-Type", "application/json");

		String jsonPayload = "{\"temp\":" + String(DHT.temperature) +
							 ", \"humid\":" + String(DHT.humidity) +
							 ", \"time\":" + timeClient.getEpochTime() + "}";

		int responseCode = http.POST(jsonPayload);
		if (responseCode > 0)
		{
			Serial.print("sent data to db, code: ");
			Serial.println(responseCode);
		}
		else
		{
			Serial.print("some error happened, code: ");
			Serial.println(responseCode);
		}

		http.end();
		lastSentHour = currentHour;
	}
}