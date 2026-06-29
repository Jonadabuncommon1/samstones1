const fs = require('fs');
const path = require('path');

const publicDir = path.join(process.cwd(), 'public');
const srcDir = path.join(process.cwd(), 'src');

function getAllFiles(dir, extFilter = null) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
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

const videoExts = ['.mp4', '.webm', '.ogg', '.mov', '.avi', '.mkv'];
const allVideos = getAllFiles(publicDir, videoExts);

const allSrcFiles = getAllFiles(srcDir, ['.ts', '.tsx', '.css', '.html', '.js', '.jsx']);
allSrcFiles.push(path.join(process.cwd(), 'index.html'));

let srcContent = '';
allSrcFiles.forEach(f => {
  if (fs.existsSync(f)) {
    srcContent += fs.readFileSync(f, 'utf8') + '\n';
  }
});

const unusedVideos = [];
allVideos.forEach(vid => {
  const baseName = path.basename(vid);
  
  if (!srcContent.includes(baseName)) {
    unusedVideos.push(vid);
  }
});

fs.writeFileSync('unused_videos.txt', unusedVideos.join('\n'));
console.log('Found ' + unusedVideos.length + ' unused videos.');
