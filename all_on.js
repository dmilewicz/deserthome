

//============================
// Imports
//============================
const { Client } = require('tplink-smarthome-api');
const WebSocket = require('ws');

//============================
// Constants
//============================
const client = new Client();
const halllights_plug = client.getPlug({ host: '192.168.0.16' });
const hydroponics_air_plug = client.getPlug({ host: '192.168.0.16' });
const hydroponics_water_plug = client.getPlug({ host: '192.168.0.16' });

const on = true;
const off = false;

//============================
// Globals
//============================
// var plugState = false;
// halllights_plug.setPowerState(plugState);
// var server = new WebSocket.Server( { port: 8000 });

// server.on('connection', function connection (ws) {
//  	console.log("Received connection");
// 	ws.on('message', function incoming(message) {
//         console.log('received: %s', message);
//         plugState = !plugState;
//         halllights_plug.setPowerState(plugState);
//   });
// });

function runHydroponicsPass()
{
  console.log("Turning on air");
  hydroponics_air_plug.setPowerState(on);

  // Turn on water 10 s after air
  setTimeout(function () {
    console.log("Turning on water");
    hydroponics_water_plug.setPowerState(on);
  }, 10 * 1000); // 10 s

  setTimeout(function () {
    hydroponics_air_plug.setPowerState(off);
    hydroponics_water_plug.setPowerState(off);
  }, 70 * 1000); // 70 s
}

runHydroponicsPass()
setInterval(runHydroponicsPass, 60 * 60 *1000) // 1 hr







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
