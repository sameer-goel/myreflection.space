import { useMemo } from 'react';
import { motion } from 'motion/react';
import prompts from './useQuestions';

const COUNTRIES = [
  { name: 'India', flag: '🇮🇳' },
  { name: 'Brazil', flag: '🇧🇷' },
  { name: 'Japan', flag: '🇯🇵' },
  { name: 'Germany', flag: '🇩🇪' },
  { name: 'USA', flag: '🇺🇸' },
  { name: 'Spain', flag: '🇪🇸' },
  { name: 'Nigeria', flag: '🇳🇬' },
  { name: 'Australia', flag: '🇦🇺' },
];

const NativeCard = ({ prompt, country, rotation }: { prompt: string, country: typeof COUNTRIES[0], rotation: number }) => (
  <div className="flex-shrink-0 w-[280px] mx-6 p-6 bg-white shadow-[8px_8px_20px_rgba(0,0,0,0.1)] border-2 border-[#3F5B7B]/10 hover:border-amber-400/50 transition-all duration-300 relative group"
       style={{ 
         borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px',
         transform: `rotate(${rotation}deg)`
       }}>
    <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[repeating-linear-gradient(white,white_24px,#3b82f6_25px)]" />
    <div className="flex items-center gap-2 mb-3 relative z-10">
      <span className="text-3xl filter saturate-[0.8]">{country.flag}</span>
      <div className="flex flex-col">
        <span className="text-[#3F5B7B] text-[10px] font-bold uppercase tracking-widest">{country.name}</span>
        <span className="text-gray-400 text-[8px]">MEMBER CONTRIBUTION</span>
      </div>
    </div>
    <p className="text-gray-700 text-sm leading-relaxed mb-4 relative z-10 font-bold italic" 
       style={{ fontFamily: "'Gloria Hallelujah', cursive" }}>
      "{prompt}"
    </p>
    <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 w-4 h-4 bg-red-400 rounded-full border-2 border-red-600 shadow-sm z-30" />
    <div className="flex justify-between items-center text-[9px] text-[#3F5B7B]/40 font-bold uppercase relative z-10 pt-2 border-t border-dashed border-gray-200">
      <span>View Note</span>
      <span>Post it ✺</span>
    </div>
  </div>
);

const ReflectionWallNative = () => {
  const rows = useMemo(() => {
    return Array.from({ length: 4 }).map((_, i) => ({
      id: i,
      direction: i % 2 === 0 ? 1 : -1,
      speed: 30 + Math.random() * 20,
      cards: Array.from({ length: 12 }).map((_, j) => ({
        id: `${i}-${j}`,
        prompt: prompts[Math.floor(Math.random() * prompts.length)],
        country: COUNTRIES[Math.floor(Math.random() * COUNTRIES.length)],
        rotation: Math.random() * 6 - 3,
      }))
    }));
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full bg-[#fdf2bb] overflow-hidden flex flex-col justify-center gap-12 py-12 pointer-events-auto">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/notebook.png')]" />
      
      {/* Background Decor */}
      <div className="absolute top-10 left-10 transform -rotate-2 pointer-events-none">
        <h1 className="text-[#3F5B7B] text-4xl md:text-5xl font-bold tracking-tight underline decoration-amber-400/40 opacity-80" style={{ fontFamily: "'Varela Round', sans-serif" }}>
          Reflections on AI & Wellbeing
        </h1>
        <p className="text-gray-500 text-xs mt-2 tracking-[0.2em] font-bold uppercase" style={{ fontFamily: "'Gloria Hallelujah', cursive" }}>
          The human record of humanity
        </p>
      </div>

      {rows.map((row) => (
        <div key={row.id} className="relative w-full flex overflow-hidden">
          <motion.div
            className="flex"
            animate={{ x: row.direction === 1 ? [0, -1880] : [-1880, 0] }}
            transition={{
              duration: row.speed,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {[...row.cards, ...row.cards].map((card, idx) => (
              <NativeCard key={`${card.id}-${idx}`} {...card} />
            ))}
          </motion.div>
        </div>
      ))}
      
      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[#fdf2bb] via-transparent to-[#fdf2bb] opacity-40" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#fdf2bb] via-transparent to-[#fdf2bb] opacity-20" />
    </div>
  );
};

export default ReflectionWallNative;
