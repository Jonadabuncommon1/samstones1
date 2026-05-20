import fs from 'fs';
const js = fs.readFileSync('reference.js', 'utf8');
const idx = js.indexOf('Vj=()=>');
console.log(js.slice(idx, idx + 8000));
