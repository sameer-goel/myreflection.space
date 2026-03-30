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

const SharedPulseNative = () => {
  const cards = useMemo(() => {
    return Array.from({ length: 7 }).map((_, i) => ({
      id: i,
      x: Math.random() * 70 + 15,
      y: Math.random() * 70 + 15,
      prompt: prompts[Math.floor(Math.random() * prompts.length)],
      country: COUNTRIES[Math.floor(Math.random() * COUNTRIES.length)],
      rotation: Math.random() * 10 - 5, // -5 to +5 deg
      delay: Math.random() * 5,
    }));
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full bg-[#fdf2bb] overflow-hidden flex items-center justify-center">
      {/* Texture Overlays */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/notebook.png')]" />
      
      {/* Watercolor bleeds */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#8bcbd1] opacity-20 blur-[100px] rounded-full" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#fadacc] opacity-30 blur-[120px] rounded-full" />

      {/* Header */}
      <div className="absolute top-10 left-10 z-50 transform -rotate-1">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-[#3F5B7B] text-4xl md:text-5xl font-bold tracking-tight underline decoration-amber-400/40 underline-offset-8"
          style={{ fontFamily: "'Varela Round', sans-serif" }}
        >
          Community <span className="italic opacity-70">&</span> Unity
        </motion.h1>
        <p className="text-gray-500 text-xs mt-4 tracking-[0.2em] font-bold uppercase" style={{ fontFamily: "'Gloria Hallelujah', cursive" }}>
          Hand-written reflections from around the globe
        </p>
      </div>

      {/* Floating Cards (Organic Paper style) */}
      <div className="relative w-full h-full max-w-7xl mx-auto">
        {cards.map((card) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, scale: 0.9, rotate: card.rotation }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              x: [0, 10, -10, 0],
              y: [0, -15, 10, 0],
              rotate: [card.rotation, card.rotation + 2, card.rotation - 2, card.rotation]
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ 
              left: `${card.x}%`, 
              top: `${card.y}%`,
              position: 'absolute'
            }}
            className="group cursor-pointer z-20"
          >
            {/* Paper card with irregular border */}
            <div className="relative p-6 bg-white shadow-[10px_10px_25px_rgba(0,0,0,0.1)] border-2 border-[#3F5B7B]/10 hover:border-amber-400/50 transition-all duration-300 w-[260px]"
                 style={{ 
                   borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px'
                 }}>
              
              {/* Paper line pattern */}
              <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[repeating-linear-gradient(white,white_24px,#3b82f6_25px)]" />

              {/* Header */}
              <div className="flex items-center gap-2 mb-3 relative z-10">
                <span className="text-3xl filter saturate-[0.8]">{card.country.flag}</span>
                <div className="flex flex-col">
                  <span className="text-[#3F5B7B] text-[10px] font-bold uppercase tracking-widest">{card.country.name}</span>
                  <span className="text-gray-400 text-[8px]">MEMBER CONTRIBUTION</span>
                </div>
              </div>

              {/* Content */}
              <p className="text-gray-700 text-sm leading-relaxed mb-4 relative z-10 font-bold" 
                 style={{ fontFamily: "'Gloria Hallelujah', cursive" }}>
                {card.prompt}
              </p>

              {/* Pin icon (visual) */}
              <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 w-4 h-4 bg-red-400 rounded-full border-2 border-red-600 shadow-sm z-30" />
              
              <div className="flex justify-between items-center text-[9px] text-[#3F5B7B]/40 font-bold uppercase relative z-10 pt-2 border-t border-dashed border-gray-200">
                <span>View More</span>
                <span>Share ✺</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Floating Tape bits */}
      <div className="absolute top-20 right-40 w-16 h-6 bg-amber-200/40 rotate-[15deg] blur-[1px] border-l-2 border-amber-300/20" />
      <div className="absolute bottom-40 left-60 w-12 h-5 bg-blue-200/30 -rotate-[10deg] blur-[1px]" />
    </div>
  );
};

export default SharedPulseNative;
