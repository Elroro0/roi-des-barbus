const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');

const url = 'https://ronanren.github.io/roi-des-barbus/';
const outputFile = path.join(__dirname, '../qr-code.png');

QRCode.toFile(outputFile, url, {
  color: {
    dark: '#000',
    light: '#FFF'
  }
}, function(err) {
  if (err) throw err;
  console.log('QR Code generated successfully!');
});
