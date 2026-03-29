import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import NativeBookDiary from './diary-templates/NativeBookDiary';
import ProMaxDiary from './diary-templates/ProMaxDiary';
import secondPageLogo from './assets/ v3_second_page_logo.png';

type Cover = 'native' | 'promax';

export default function App() {
  const [active, setActive] = useState<Cover>('native');
  const [diaryOpen, setDiaryOpen] = useState(false);

  const handleSwitch = (cover: Cover) => {
    setActive(cover);
    setDiaryOpen(false);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center relative bg-white">

      {/* Site header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center px-6 py-3 bg-white/20 backdrop-blur-md border-b border-white/20">
        <a href="/" onClick={() => { setActive('native'); setDiaryOpen(false); }}>
          <img src={secondPageLogo} alt="My Reflection Space" className="h-10 object-contain opacity-80 cursor-pointer" />
        </a>
      </header>
      

      {/* Floating magic wand switcher — only on cover */}
      <AnimatePresence>
        {!diaryOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="fixed right-5 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-3"
          >
        {/* Wand icon */}
        <motion.div
          animate={{ rotate: [0, -15, 15, -10, 10, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 3, ease: 'easeInOut' }}
          className="text-2xl select-none pointer-events-none"
        >
          🪄
        </motion.div>

        {/* Native */}
        <motion.button
          onClick={() => handleSwitch('native')}
          whileTap={{ scale: 0.85 }}
          whileHover={{ scale: 1.15 }}
          className="relative text-2xl leading-none"
          title="Native Book"
        >
          <span>🌿</span>
          {active === 'native' && (
            <motion.div
              layoutId="wand-indicator"
              className="absolute inset-0 rounded-full ring-2 ring-green-400 ring-offset-2 ring-offset-white/10"
            />
          )}
        </motion.button>

        {/* ProMax */}
        <motion.button
          onClick={() => handleSwitch('promax')}
          whileTap={{ scale: 0.85 }}
          whileHover={{ scale: 1.15 }}
          className="relative text-2xl leading-none"
          title="Pro Max"
        >
          <span>✨</span>
          {active === 'promax' && (
            <motion.div
              layoutId="wand-indicator"
              className="absolute inset-0 rounded-full ring-2 ring-pink-400 ring-offset-2 ring-offset-white/10"
            />
          )}
        </motion.button>
      </motion.div>
        )}
      </AnimatePresence>

      {/* Canvas */}
      <motion.div
        animate={{ x: diaryOpen ? 60 : 0 }}
        transition={{ type: 'spring', damping: 22, stiffness: 80 }}
        className="w-full flex items-center justify-center min-h-[500px] z-10 perspective-1000 px-6"
      >
        <AnimatePresence mode="wait">
          {active === 'native' && (
            <motion.div key="native" className="w-full max-w-[22rem] flex justify-center items-center">
              <NativeBookDiary onClick={() => setDiaryOpen(true)} />
            </motion.div>
          )}
          {active === 'promax' && (
            <motion.div key="promax" className="w-full max-w-[22rem] flex justify-center items-center">
              <ProMaxDiary onClick={() => setDiaryOpen(true)} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
