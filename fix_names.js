import fs from 'fs';
import path from 'path';

const publicDir = path.join(process.cwd(), 'public');
const codeFile = path.join(process.cwd(), 'src', 'components', 'shop', 'CategoryView.tsx');

let codeContent = fs.readFileSync(codeFile, 'utf8');

function cleanName(name) {
  let newName = name.replace(/…/g, '');
  newName = newName.replace(/[\.\…]+\.jfif$/g, '.jfif');
  return newName;
}

function processDir(dir) {
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
        fs.renameSync(fullPath, newPath);
      }
    }
  }
}

processDir(publicDir);

// Replace any `..jfif` or `...jfif` or `…` with `.jfif`
codeContent = codeContent.replace(/…/g, '');
codeContent = codeContent.replace(/[\.\…]+\.jfif/g, '.jfif');

fs.writeFileSync(codeFile, codeContent, 'utf8');
console.log('Fixed CategoryView.tsx');
