
const { Client } = require('tplink-smarthome-api');
//var Server       = reqire('simple-websocket/server');
const WebSocket = require('ws');

const client = new Client();
const plug = client.getPlug({ host: '192.168.0.16' });

var plugState = false;
plug.setPowerState(plugState);


var server = new WebSocket.Server( { port: 8000 });

server.on('connection', function connection (ws) {
 	console.log("Received connection");
	ws.on('message', function incoming(message) {
        console.log('received: %s', message);
        plugState = !plugState;
        plug.setPowerState(plugState);

    });
});













/* Works -- not getting deleted

// Search for all plugs and turn them on
client.on('plug-new', plug => {
  console.log('Found plug:', plug.alias);
  console.log(plug.host);
  //plug.setPowerState(false).then(() => {
  //  console.log('Plug', plug.alias, 'is now on');
  //});
});

client.startDiscovery();
*/
