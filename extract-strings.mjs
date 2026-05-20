import fs from 'fs';
const js = fs.readFileSync('reference.js', 'utf8');
const patterns = [
  'Samstones', 'Marketplace', '109121', 'e6f4e8', 'F9FAFB',
  'Discover the Finest', 'Fashion & Apparel', 'Universes',
  'bg-white', 'text-gray-900', 'Premium Marketplace',
  'header-image', 'logo.png', 'Admin Dashboard', 'The Vault',
];
for (const p of patterns) {
  let i = 0;
  while ((i = js.indexOf(p, i)) !== -1) {
    const start = Math.max(0, i - 80);
    const end = Math.min(js.length, i + p.length + 120);
    console.log('---', p, '---');
    console.log(js.slice(start, end).replace(/\n/g, ' '));
    i += p.length;
    if (i > 500000) break;
  }
}
