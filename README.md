### uFire WebSockets Demo

> turn a uFire device into a WebSockets server
* send measurement data when connected
* uses mDNS for easy connection
* implement isolation from probe interfaces through WiFi

#### What it is
An ESP32-compatible demo project to expose uFire data through a WebSocket interface.

#### Using it
 * get some ESP32s. Any development board should work. If you want isolation, be sure the board includes a battery supply of some sort.
 * this project uses software I2C and requires slightly modified library files to use the uFire interfaces. Determine the I2C pins you will use, and edit EC_Salinity.h, uFire_ISE.h, ISE_pH, ISE_ORP.h as follows.
 * search for the `Wire.begin` statements and replace the line with the I2C pins you are using. `Wire.begin(19, 23, 100000);` will use pin 19 as SDA, and 23 as SCL. Leave the 100000 as is.
 * Change the `const char *ssid` and `const char *password` to your WiFi network.
 * program the ESP32 with the example program
 * goto https://ufire.co/uFire_WS in your browser to connect to the device.

#### Compiling
This is a [PlatformIO](http://platformio.org/) project. Download and install it, import this repo, and it should download all the required tools for you.
