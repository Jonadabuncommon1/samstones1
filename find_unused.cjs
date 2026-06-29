const fs = require('fs');
const path = require('path');

const publicDir = path.join(process.cwd(), 'public');
const srcDir = path.join(process.cwd(), 'src');

function getAllFiles(dir, extFilter = null) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllFiles(file, extFilter));
    } else {
      if (!extFilter || extFilter.some(ext => file.toLowerCase().endsWith(ext))) {
        results.push(file);
      }
    }
  });
  return results;
}

const imageExts = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.jfif', '.ico'];
const allImages = getAllFiles(publicDir, imageExts);

const allSrcFiles = getAllFiles(srcDir, ['.ts', '.tsx', '.css', '.html', '.js', '.jsx']);
// also add index.html
allSrcFiles.push(path.join(process.cwd(), 'index.html'));

let srcContent = '';
allSrcFiles.forEach(f => {
  if (fs.existsSync(f)) {
    srcContent += fs.readFileSync(f, 'utf8') + '\n';
  }
});

const unusedImages = [];
allImages.forEach(img => {
  const baseName = path.basename(img);
  // Exception for favicon and standard names that might be implicitly used
  if (baseName === 'favicon.ico' || baseName === 'favicon.png' || baseName === 'logo.png') {
    return;
  }
  
  if (!srcContent.includes(baseName)) {
    unusedImages.push(img);
  }
});

fs.writeFileSync('unused_images.txt', unusedImages.join('\n'));
console.log('Found ' + unusedImages.length + ' unused images.');
