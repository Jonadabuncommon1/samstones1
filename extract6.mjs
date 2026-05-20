import fs from 'fs';
const js = fs.readFileSync('reference.js', 'utf8');
const idx = js.indexOf('Rj=()=>');
console.log(js.slice(idx, idx + 600));
