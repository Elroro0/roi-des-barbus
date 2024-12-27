const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sizes = [192, 512];
const inputImage = path.join(__dirname, '../public/images/title.png');
const outputDir = path.join(__dirname, '../public');

async function generateIcons() {
  try {
    for (const size of sizes) {
      await sharp(inputImage)
        .resize(size, size)
        .toFile(path.join(outputDir, `logo${size}.png`));
    }
    console.log('Icons generated successfully!');
  } catch (error) {
    console.error('Error generating icons:', error);
  }
}
