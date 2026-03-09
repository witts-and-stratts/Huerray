const fs = require('fs');
const contents = fs.readFileSync('node_modules/@base-ui/react/esm/menu/item.d.ts', 'utf8').catch(() => fs.readFileSync('node_modules/@base-ui/react/menu/index.d.ts', 'utf8'));
console.log(contents.substring(0, 1000));
