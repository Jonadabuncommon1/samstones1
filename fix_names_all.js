import fs from 'fs';
import path from 'path';

const publicDir = path.join(process.cwd(), 'public');
const distDir = path.join(process.cwd(), 'dist');
const codeFile = path.join(process.cwd(), 'src', 'components', 'shop', 'CategoryView.tsx');

let codeContent = fs.readFileSync(codeFile, 'utf8');

function cleanName(name) {
  // Remove straight and curly quotes
  return name.replace(/["“”]/g, '');
}

function processDir(dir) {
  if (!fs.existsSync(dir)) return;
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      processDir(fullPath);
    } else if (item.endsWith('.jfif')) {
      const newName = cleanName(item);
      if (newName !== item) {
        const newPath = path.join(dir, newName);
        console.log(`Renaming: ${item} -> ${newName}`);
        try { fs.renameSync(fullPath, newPath); } catch (e) { console.error(e); }
      }
    }
  }
}

processDir(publicDir);
processDir(distDir);

// Replace in code
codeContent = codeContent.replace(/titled "Color\.jfif/g, 'titled Color.jfif');

fs.writeFileSync(codeFile, codeContent, 'utf8');
console.log('Fixed quotes in both public, dist, and CategoryView.tsx');
