import fs from 'fs';
const js = fs.readFileSync('reference.js', 'utf8');
for (const name of ['Cj=()=>', 'zj=()=>', 'Bj=()=>', 'Hj=()=>']) {
  const idx = js.indexOf(name);
  if (idx === -1) { console.log('not found', name); continue; }
  console.log('\n\n########', name, '########\n');
  console.log(js.slice(idx, idx + 4500));
}
