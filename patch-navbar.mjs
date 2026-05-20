import fs from 'fs';

const logo = `          <motion.div className="flex items-center space-x-4 cursor-pointer group relative" onClick={() => handleNavClick('home')}>
            <motion.div className="flex flex-col justify-center">
              <h1 className="font-sans text-xl md:text-2xl font-bold tracking-tight text-gray-900 transition-colors duration-300 drop-shadow-sm group-hover:drop-shadow-md flex items-center">
                <img
                  src="/header-image.jpg"
                  alt="Feature"
                  className="h-7 md:h-8 w-auto mr-2 md:mr-3 object-contain rounded"
                />
                <span>
                  Samstones <span className="font-light">Marketplace</span>
                </span>
              </h1>
            </motion.div>
          </motion.div>`;

// Build with div tags only
const logo2 = [
  '          <div className="flex items-center space-x-4 cursor-pointer group relative" onClick={() => handleNavClick(\'home\')}>',
  '            <div className="flex flex-col justify-center">',
  '              <h1 className="font-sans text-xl md:text-2xl font-bold tracking-tight text-gray-900 transition-colors duration-300 drop-shadow-sm group-hover:drop-shadow-md flex items-center">',
  '                <img',
  '                  src="/header-image.jpg"',
  '                  alt="Feature"',
  '                  className="h-7 md:h-8 w-auto mr-2 md:mr-3 object-contain rounded"',
  '                />',
  '                <span>',
  '                  Samstones <span className="font-light">Marketplace</span>',
  '                </span>',
  '              </h1>',
  '            </div>',
  '          </motion.div>',
].join('\n').replace(/motion\.div/g, 'div');

let s = fs.readFileSync('src/components/layout/Navbar.tsx', 'utf8');
s = s.replace(
  /          \{\/\* Logo \*\/\}[\s\S]*?          <div className="flex-1 hidden lg:flex/,
  logo2 + '\n\n          <div className="flex-1 hidden lg:flex'
);

s = s.replace(/text-gray-300 hover:text-white/g, 'text-gray-600 hover:text-gray-900');
s = s.replace(/h-\[1px\] bg-gradient-to-r from-purple-400 to-pink-400/g, 'h-[2px] bg-[#109121]');
s = s.replace(/bg-gradient-to-tr from-purple-500 to-pink-500 text-white text-\[10px\]/g, 'bg-[#109121] text-white text-[10px]');
s = s.replace(/shadow-\[0_0_10px_rgba\(236,72,153,0\.5\)\]/g, 'shadow-sm');
s = s.replace('className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xl"', 'className="fixed inset-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-100"');
s = s.replace('<div className="p-6 flex flex-col h-full text-white">', '<div className="p-6 flex flex-col h-full text-gray-900">');
s = s.replace(
  'className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-center py-4 rounded-xl uppercase text-sm tracking-widest font-bold block shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all"',
  'className="w-full bg-[#109121] hover:bg-[#0a5f15] text-white text-center py-4 rounded-xl uppercase text-sm tracking-widest font-bold block transition-all"'
);

fs.writeFileSync('src/components/layout/Navbar.tsx', s);
console.log('done');
