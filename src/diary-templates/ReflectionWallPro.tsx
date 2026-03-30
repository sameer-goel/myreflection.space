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

const ReflectionCard = ({ prompt, country }: { prompt: string, country: typeof COUNTRIES[0] }) => (
  <div className="flex-shrink-0 w-[320px] mx-4 p-6 rounded-[2rem] bg-white/5 backdrop-blur-xl border border-white/10 hover:border-blue-400/50 hover:bg-white/10 transition-all duration-500 shadow-2xl relative overflow-hidden group">
    <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity blur-2xl" />
    <div className="flex items-center gap-2 mb-4 relative z-10">
      <span className="text-2xl">{country.flag}</span>
      <span className="text-white/40 text-[10px] uppercase tracking-wider font-semibold">
        {country.name} Contribution
      </span>
    </div>
    <p className="text-white/90 text-sm leading-relaxed font-medium mb-6 italic relative z-10">
      "{prompt}"
    </p>
    <div className="flex items-center justify-between border-t border-white/5 pt-4 opacity-40 group-hover:opacity-100 transition-opacity relative z-10">
      <div className="flex gap-3">
        <span className="text-xs text-white/50">🤍 Like</span>
        <span className="text-xs text-white/50">💬 Reply</span>
      </div>
      <span className="text-[10px] text-blue-400">CONNECT</span>
    </div>
  </div>
);

const ReflectionWallPro = () => {
  const rows = useMemo(() => {
    return Array.from({ length: 4 }).map((_, i) => ({
      id: i,
      direction: i % 2 === 0 ? -1 : 1, // alternate directions
      speed: 20 + Math.random() * 20,
      cards: Array.from({ length: 10 }).map((_, j) => ({
        id: `${i}-${j}`,
        prompt: prompts[Math.floor(Math.random() * prompts.length)],
        country: COUNTRIES[Math.floor(Math.random() * COUNTRIES.length)],
      }))
    }));
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full bg-[#0a0a23] overflow-hidden flex flex-col justify-center gap-8 py-20 translate-z-0">
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none" />

      {/* Header Overlay */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-50 text-center pointer-events-none">
        <h1 className="text-white text-4xl md:text-5xl font-bold tracking-tighter opacity-90 drop-shadow-lg" style={{ fontFamily: "'Outfit', sans-serif" }}>
          THE RESPONSE WALL
        </h1>
        <p className="text-blue-300/60 text-xs mt-2 tracking-[0.4em] uppercase font-light">
          A living record of human reflection
        </p>
      </div>

      {rows.map((row) => (
        <div key={row.id} className="relative w-full flex overflow-hidden">
          <motion.div
            className="flex"
            animate={{ x: row.direction === -1 ? [0, -1760] : [-1760, 0] }}
            transition={{
              duration: row.speed,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {/* Double the cards for seamless loop */}
            {[...row.cards, ...row.cards].map((card, idx) => (
              <ReflectionCard key={`${card.id}-${idx}`} {...card} />
            ))}
          </motion.div>
        </div>
      ))}
      
      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[#0a0a23] via-transparent to-[#0a0a23] opacity-60" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#0a0a23] via-transparent to-[#0a0a23] opacity-60" />
    </div>
  );
};

export default ReflectionWallPro;
