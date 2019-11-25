'use strict';

const express = require('express');
const ip = require("ip");

const PORT = 80;
const HOST = '0.0.0.0';

const app = express();
app.use(express.static('static'))
app.get('/server-ip', (req, res) => {
  let serverIp = ip.address();
  console.log('Fetching servier-ip ('+ serverIp +')');
  res.send('Serving on '+ serverIp +'\n');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);