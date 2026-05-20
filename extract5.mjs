import fs from 'fs';
const js = fs.readFileSync('reference.js', 'utf8');
const idx = js.indexOf('wa.me/2348065179554?text=Hello');
console.log(js.slice(idx - 300, idx + 400));
