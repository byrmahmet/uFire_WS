var app = {
  socket: 0,
  value: 0,
  characteristic: 0,
  ko_value: ko.observable('-'),
  ko_description: ko.observable('-'),
  ko_temp: ko.observable('-'),
  ko_temp_unit: ko.observable('-'),
  ko_name: ko.observable(''),
  connected: ko.observable(false),
  initialize: async function() {

  },
  btn_click: async function() {
    if (app.socket.readyState === app.socket.CLOSED) {
      var websocketurl = "ws://ufire.local";
      app.socket = new WebSocket(websocketurl);

      app.socket.onopen = function() {
        console.log("Connected!");
        app.connected(true);
      };

      app.socket.onclose = function() {
        console.log("Disconnected");
        app.connected(false);
      };

      app.socket.onmessage = function(message) {
        console.log(message.data);
        var obj = JSON.parse(message.data);
        app.ko_value(obj.value);
        app.ko_description(obj.unit)
        app.ko_temp(obj.temp)
        app.ko_temp_unit(obj.temp_unit)
        app.ko_name(obj.name);
      };
    } else {
      {
        app.socket.close();
        app.connected(false);
        app.ko_name('');
        app.ko_value('-');
        app.ko_description('-');
        app.ko_temp('-');
        app.ko_temp_unit('-');
      }
    }
  },
  value_update: async function(event) {
    let value = event.target.value;
    app.ko_value(decoder.decode(value));
  },
  temp_update: async function(event) {
    let value = event.target.value;
    app.ko_temp(decoder.decode(value));
  }
};