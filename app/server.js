'use strict';

const express = require('express');
const os = require('os');
const ifaces = os.networkInterfaces();
let serverIp = '';

Object.keys(ifaces).forEach(function (ifname) {
  let alias = 0;
  ifaces[ifname].forEach(function (iface) {
    if ('IPv4' !== iface.family || iface.internal !== false) {
      return;
    }
    if (alias >= 1) {
      serverIp = serverIp +', '+ iface.address;
    } else {
      serverIp = iface.address;
    }
    ++alias;
  });
});

const PORT = 8080;
const HOST = '0.0.0.0';

const app = express();

app.use(express.static('static'))

app.get('/ready', (req, res) => {
  console.log('Report server is running');
  res.send('running\n');
});

app.get('/server-ip', (req, res) => {
  console.log('Fetching server-ip ('+ serverIp +')');
  res.send('Serving on '+ serverIp +'\n');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);