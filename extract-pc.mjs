import fs from 'fs';
const js = fs.readFileSync('reference.js', 'utf8');
const idx = js.indexOf('gf=({product:a})');
console.log(js.slice(idx, idx + 2000));
