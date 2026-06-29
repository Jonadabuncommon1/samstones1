import fs from 'fs';
import path from 'path';

const publicDir = path.join(process.cwd(), 'public');
const codeFile = path.join(process.cwd(), 'src', 'components', 'shop', 'CategoryView.tsx');

let codeContent = fs.readFileSync(codeFile, 'utf8');

function processDir(dir, prefix = '') {
  if (!fs.existsSync(dir)) return;
  const items = fs.readdirSync(dir);
  let counter = 1;
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (item.endsWith('_banner') || prefix !== '') {
        processDir(fullPath, item);
      }
    } else if ((item.endsWith('.jfif') || item.endsWith('.jpg') || item.endsWith('.png')) && prefix !== '') {
      const ext = path.extname(item);
      const newName = `${prefix}_img_${counter}${ext}`;
      
      if (newName !== item) {
        const newPath = path.join(dir, newName);
        console.log(`Renaming: ${item} -> ${newName}`);
        
        const escapedItem = item.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        const re = new RegExp(escapedItem, 'g');
        
        codeContent = codeContent.replace(re, newName);
        
        try { fs.renameSync(fullPath, newPath); } catch (e) { console.error(e); }
        counter++;
      }
    }
  }
}

processDir(publicDir, '');
fs.writeFileSync(codeFile, codeContent, 'utf8');

const distDir = path.join(process.cwd(), 'dist');
if (fs.existsSync(distDir)) {
  try {
    fs.rmSync(distDir, { recursive: true, force: true });
  } catch (e) {
    console.error('Could not delete dist folder, skipping deletion.');
  }
}

console.log('Fixed all names to be super clean!');
