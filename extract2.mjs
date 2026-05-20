import fs from 'fs';
const js = fs.readFileSync('reference.js', 'utf8');
const terms = ['CategoryView', 'FloatingWhatsApp', 'App.tsx', 'min-h-screen flex flex-col', 'setActiveCategory', 'activeCategory', 'bg-black', 'bg-white'];
for (const term of terms) {
  let idx = 0, count = 0;
  while ((idx = js.indexOf(term, idx)) !== -1 && count < 3) {
    console.log(`\n=== ${term} @ ${idx} ===`);
    console.log(js.slice(Math.max(0, idx - 50), idx + 200).replace(/\n/g, ' '));
    idx += term.length;
    count++;
  }
}
