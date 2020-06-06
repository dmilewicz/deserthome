
const { Client } = require('tplink-smarthome-api');
const client = new Client();


const plug = client.getPlug({ host: '192.168.0.16' });

//const plug = client.getPlug({ alias: 'Hall Lights'  });

plug.setPowerState(true);

// Search for all plugs and turn them on
client.on('plug-new', plug => {
  console.log('Found plug:', plug.alias);
  console.log(plug.host);
  //plug.setPowerState(false).then(() => {
  //  console.log('Plug', plug.alias, 'is now on');
  //});
});



client.startDiscovery();
