import fs from 'fs';
const d = '</div>';
const m = '</motion.div>';
let s = fs.readFileSync('src/components/home/HomeView.tsx', 'utf8');

s = s.replace(
  `Guaranteed</p>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>`,
  `Guaranteed</p>
                ${d}
              ${d}
            ${d}
          ${m}
        ${d}`
);

s = s.replace(
  `</button>
        </motion.div>
      </section>

      <section className="py-12 max-w-7xl`,
  `</button>
        ${d}
      </section>

      <section className="py-12 max-w-7xl`
);

s = s.replace(
  `            </motion.div>
          </motion.div>

          <div className="bg-white/5 border border-white/10 p-8 rounded-3xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-serif font-bold text-gray-900">
                Prime`,
  `            </motion.div>
          ${d}

          <motion.div className="bg-white/5 border border-white/10 p-8 rounded-3xl">
            <motion.div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-serif font-bold text-gray-900">
                Prime`
);

// Only fix motors close tag
s = s.replace(
  `              ))}
            </motion.div>
          </motion.div>

          <div className="bg-white/5 border border-white/10 p-8 rounded-3xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-serif font-bold text-gray-900">
                Prime`,
  `              ))}
            </motion.div>
          ${d}

          <motion.div className="bg-white/5 border border-white/10 p-8 rounded-3xl">
            <motion.div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-serif font-bold text-gray-900">
                Prime`
);

fs.writeFileSync('src/components/home/HomeView.tsx', s);
console.log('done');
