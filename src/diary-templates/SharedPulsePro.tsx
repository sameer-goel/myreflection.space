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

const SharedPulsePro = () => {
  // Generate random cards
  const cards = useMemo(() => {
    return Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      x: Math.random() * 80 + 10, // 10-90%
      y: Math.random() * 80 + 10, // 10-90%
      prompt: prompts[Math.floor(Math.random() * prompts.length)],
      country: COUNTRIES[Math.floor(Math.random() * COUNTRIES.length)],
      delay: Math.random() * 5,
      duration: 15 + Math.random() * 10,
    }));
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full bg-[#0a0a23] overflow-hidden flex items-center justify-center">
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[150px] rounded-full" />
      
      {/* Stars/Dust particles */}
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute w-1 h-1 bg-white rounded-full opacity-20"
          initial={{ x: `${Math.random() * 100}%`, y: `${Math.random() * 100}%` }}
          animate={{
            opacity: [0.1, 0.4, 0.1],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Header */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 z-50 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-white text-4xl md:text-6xl font-bold tracking-tighter opacity-90"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          HUMANITY'S SHARED PULSE
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-blue-300/60 text-sm mt-3 tracking-[0.3em] uppercase font-light"
        >
          Discovering unity through reflection
        </motion.p>
      </div>

      {/* Floating Cards */}
      <div className="relative w-full h-full max-w-7xl mx-auto">
        {cards.map((card) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              x: [0, 20, -20, 0],
              y: [0, -30, 20, 0],
            }}
            transition={{
              opacity: { duration: 1 },
              x: { duration: card.duration, repeat: Infinity, ease: "easeInOut" },
              y: { duration: card.duration * 0.8, repeat: Infinity, ease: "easeInOut" },
            }}
            style={{ 
              left: `${card.x}%`, 
              top: `${card.y}%`,
              position: 'absolute'
            }}
            className="group cursor-pointer z-20"
          >
            <div className="relative p-6 rounded-[2rem] w-[280px] bg-white/5 backdrop-blur-xl border border-white/10 hover:border-blue-400/50 hover:bg-white/10 transition-all duration-500 shadow-2xl overflow-hidden active:scale-95">
              {/* Card Aura */}
              <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity blur-2xl" />
              
              {/* Country Badge */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">{card.country.flag}</span>
                <span className="text-white/40 text-[10px] uppercase tracking-wider font-semibold">
                  {card.country.name} Contribution
                </span>
              </div>

              {/* Reflection Content */}
              <p className="text-white/90 text-sm leading-relaxed font-medium mb-6 line-clamp-4 italic">
                "{card.prompt}"
              </p>

              {/* Interaction Row */}
              <div className="flex items-center justify-between border-t border-white/5 pt-4 opacity-40 group-hover:opacity-100 transition-opacity">
                <div className="flex gap-3">
                  <span className="text-xs text-white/50">🤍 Like</span>
                  <span className="text-xs text-white/50">💬 Reply</span>
                </div>
                <span className="text-[10px] text-blue-400">CONNECT</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Connection Lines (SVG) - simplified placeholder for now */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-20">
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
            <stop offset="50%" stopColor="#3ecfcf" stopOpacity="1" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default SharedPulsePro;
