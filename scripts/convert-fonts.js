const fs = require('fs');
const path = require('path');
const ttf2woff = require('ttf2woff');

const fontsDir = path.join(__dirname, '../public/fonts');

const fonts = [
  'RightGrotesk-SpatialBlack.otf',
  'RightGrotesk-SpatialBlackItalic.otf',
  'ABCDiatype-Light.ttf',
  'ABCDiatype-Regular.ttf',
  'ABCDiatype-Medium.ttf'
];

fonts.forEach(fontFile => {
  const fontPath = path.join(fontsDir, fontFile);
  const baseName = fontFile.replace(/\.(otf|ttf)$/, '');

  // Read TTF/OTF file
  const ttf = fs.readFileSync(fontPath);

  // Convert to WOFF
  const woff = Buffer.from(ttf2woff(ttf).buffer);
  fs.writeFileSync(path.join(fontsDir, `${baseName}.woff`), woff);
  console.log(`Created ${baseName}.woff`);
});

console.log('Font conversion to WOFF complete!');
