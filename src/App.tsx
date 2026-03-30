import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import NativeBookDiary from './diary-templates/NativeBookDiary';
import ProMaxDiary from './diary-templates/ProMaxDiary';
import ReflectionWallNative from './diary-templates/ReflectionWallNative';
import ReflectionWallPro from './diary-templates/ReflectionWallPro';
import secondPageLogo from './assets/ v3_second_page_logo.png';
import ThreeGlobe from './components/ThreeGlobe';

type Cover = 'native' | 'promax' | 'pulse' | 'voice';
type ConceptModal = 'why' | 'how' | 'value';

type BgTexture = 'clean' | 'mesh' | 'dark' | 'watercolor';

function Tooltip({ label, isDark, children }: { label: string; isDark: boolean; children: React.ReactNode }) {
  const [visible, setVisible] = useState(false);
  return (
    <div
      style={{ position: 'relative', display: 'flex', alignItems: 'center' }}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {visible && (
        <div style={{
          position: 'absolute',
          right: 'calc(100% + 10px)',
          top: '50%',
          transform: 'translateY(-50%)',
          whiteSpace: 'nowrap',
          padding: '4px 10px',
          borderRadius: '8px',
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.02em',
          pointerEvents: 'none',
          background: isDark ? 'rgba(30,30,40,0.95)' : 'rgba(255,255,255,0.95)',
          color: isDark ? 'rgba(255,255,255,0.85)' : 'rgba(40,40,60,0.9)',
          border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(200,200,220,0.5)',
          boxShadow: isDark ? '0 4px 16px rgba(0,0,0,0.5)' : '0 4px 16px rgba(100,100,140,0.15)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}>
          {label}
          {/* Arrow */}
          <div style={{
            position: 'absolute',
            right: '-5px',
            top: '50%',
            transform: 'translateY(-50%) rotate(45deg)',
            width: '8px',
            height: '8px',
            background: isDark ? 'rgba(30,30,40,0.95)' : 'rgba(255,255,255,0.95)',
            border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(200,200,220,0.5)',
            borderLeft: 'none',
            borderBottom: 'none',
          }} />
        </div>
      )}
      {children}
    </div>
  );
}

const BG_TEXTURES: { id: BgTexture; label: string; emoji: string; style: React.CSSProperties }[] = [
  {
    id: 'clean',
    label: 'Clean White',
    emoji: '⬜',
    style: { background: '#ffffff' },
  },
  {
    id: 'mesh',
    label: 'Divine Lights',
    emoji: '🌈',
    style: {
      background: 'radial-gradient(ellipse at 20% 20%, #e0f2fe 0%, transparent 50%), radial-gradient(ellipse at 80% 10%, #fce7f3 0%, transparent 45%), radial-gradient(ellipse at 60% 80%, #ede9fe 0%, transparent 50%), radial-gradient(ellipse at 10% 80%, #d1fae5 0%, transparent 45%), #f8fafc',
    },
  },
  {
    id: 'dark',
    label: 'Dark Noise',
    emoji: '🌑',
    style: {
      backgroundColor: '#111118',
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.12'/%3E%3C/svg%3E")`,
      backgroundSize: '200px 200px',
    },
  },
  {
    id: 'watercolor',
    label: 'Watercolor Wash',
    emoji: '🎨',
    style: {
      background: 'radial-gradient(ellipse at 30% 40%, rgba(251,207,232,0.6) 0%, transparent 55%), radial-gradient(ellipse at 70% 60%, rgba(196,181,253,0.5) 0%, transparent 50%), radial-gradient(ellipse at 50% 10%, rgba(167,243,208,0.4) 0%, transparent 45%), #fdf4ff',
    },
  },
];

export default function App() {
  const [active, setActive] = useState<Cover>('native');
  const [lastAesthetic, setLastAesthetic] = useState<'native' | 'promax'>('native');
  const [diaryOpen, setDiaryOpen] = useState(false);
  const [bgTexture, setBgTexture] = useState<BgTexture>('dark');
  const [conceptModal, setConceptModal] = useState<ConceptModal | null>(null);

  const handleSwitch = (cover: Cover) => {
    if (cover === 'native' || cover === 'promax') setLastAesthetic(cover);
    setActive(cover);
    setDiaryOpen(false);
  };

  const currentBg = BG_TEXTURES.find(t => t.id === bgTexture)!;
  const isDark = bgTexture === 'dark';

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center relative"
      style={{ ...currentBg.style, transition: 'background 0.5s ease, background-color 0.5s ease' }}
    >

      {/* Site header */}
      <header
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center px-6 py-2"
        style={{
          background: isDark ? 'rgba(10,10,18,0.35)' : 'rgba(255,255,255,0.25)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(200,200,220,0.25)',
        }}
      >
        <a href="/" onClick={() => { setActive('native'); setDiaryOpen(false); }}>
          <img src={secondPageLogo} alt="My Reflection Space" className="h-16 object-contain opacity-70 cursor-pointer" />
        </a>

        {/* Header Actions */}
        <div className="absolute right-6 flex items-center gap-4">
          <button onClick={() => setConceptModal('why')} className="px-3 py-1 text-xs font-semibold uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity rounded-full border border-indigo-200/50 hover:border-indigo-400" style={{ color: isDark ? '#fff' : '#333' }}>Why Self-Reflection</button>
          <button onClick={() => setConceptModal('value')} className="px-3 py-1 text-xs font-semibold uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity rounded-full border border-indigo-200/50 hover:border-indigo-400" style={{ color: isDark ? '#fff' : '#333' }}>Global Impact</button>
          <button 
            onClick={() => handleSwitch('voice')}
            title="Explore Global"
            className="p-2 bg-transparent text-indigo-400 rounded-full border border-indigo-200/50 hover:border-indigo-400 hover:text-indigo-600 transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <path d="M2 12h20"/>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
          </button>
        </div>
      </header>
      

      {/* Right-side panel — theme + texture, stacked */}
      <AnimatePresence>
        {!diaryOpen && (
          <div style={{ position: 'fixed', right: '14px', top: '50%', transform: 'translateY(-50%)', zIndex: 50 }}>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            transition={{ type: 'spring', damping: 20, stiffness: 100 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            {/* Theme Switcher */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '2px',
              background: isDark ? 'rgba(20,20,28,0.82)' : 'rgba(255,255,255,0.72)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              borderRadius: '16px',
              border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(200,200,220,0.45)',
              boxShadow: isDark ? '0 8px 32px rgba(0,0,0,0.4)' : '0 8px 32px rgba(100,100,140,0.12)',
              padding: '6px',
            }}>
              <span style={{
                fontSize: '8px',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(100,100,130,0.5)',
                paddingBottom: '2px',
              }}>Theme</span>

              {/* Native Book */}
              <Tooltip label="Native Book" isDark={isDark}>
              <motion.button
                onClick={() => handleSwitch('native')}
                whileTap={{ scale: 0.9 }}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: '38px', height: '38px', border: 'none', borderRadius: '10px',
                  cursor: 'pointer', position: 'relative',
                  background: active === 'native' ? 'rgba(134,239,172,0.28)' : 'transparent',
                  transition: 'background 0.2s',
                }}
                title="Native Book"
              >
                {active === 'native' && (
                  <motion.div layoutId="theme-indicator" style={{
                    position: 'absolute', inset: 0, borderRadius: '10px',
                    border: '1.5px solid rgba(74,222,128,0.7)',
                    boxShadow: '0 0 10px rgba(74,222,128,0.25)',
                  }} />
                )}
                <span style={{ fontSize: '20px', lineHeight: 1 }}>🍃</span>
              </motion.button>
              </Tooltip>

              {/* Pro Max */}
              <Tooltip label="Pro Max" isDark={isDark}>
              <motion.button
                onClick={() => handleSwitch('promax')}
                whileTap={{ scale: 0.9 }}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: '38px', height: '38px', border: 'none', borderRadius: '10px',
                  cursor: 'pointer', position: 'relative',
                  background: active === 'promax' ? 'rgba(244,114,182,0.22)' : 'transparent',
                  transition: 'background 0.2s',
                }}
                title="Pro Max"
              >
                {active === 'promax' && (
                  <motion.div layoutId="theme-indicator" style={{
                    position: 'absolute', inset: 0, borderRadius: '10px',
                    border: '1.5px solid rgba(236,72,153,0.7)',
                    boxShadow: '0 0 10px rgba(236,72,153,0.25)',
                  }} />
                )}
                <span style={{ fontSize: '20px', lineHeight: 1 }}>🌸</span>
              </motion.button>
              </Tooltip>

            </div>

            {/* Texture Switcher — only when a theme is picked (not voice) */}
            <AnimatePresence>
              {active !== 'voice' && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ type: 'spring', damping: 20, stiffness: 120 }}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '2px',
                    background: isDark ? 'rgba(20,20,28,0.82)' : 'rgba(255,255,255,0.72)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    borderRadius: '16px',
                    border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(200,200,220,0.45)',
                    boxShadow: isDark ? '0 8px 32px rgba(0,0,0,0.4)' : '0 8px 32px rgba(100,100,140,0.12)',
                    padding: '6px',
                  }}
                >
                  <span style={{
                    fontSize: '8px',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(100,100,130,0.5)',
                    paddingBottom: '2px',
                  }}>Texture</span>
                  {BG_TEXTURES.map(t => (
                    <Tooltip key={t.id} label={t.label} isDark={isDark}>
                    <motion.button
                      onClick={() => setBgTexture(t.id)}
                      whileTap={{ scale: 0.88 }}
                      title={t.label}
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        width: '38px', height: '38px', border: 'none', borderRadius: '10px',
                        cursor: 'pointer', position: 'relative',
                        background: bgTexture === t.id
                          ? isDark ? 'rgba(255,255,255,0.1)' : 'rgba(99,102,241,0.12)'
                          : 'transparent',
                        transition: 'background 0.2s',
                      }}
                    >
                      {bgTexture === t.id && (
                        <motion.div
                          layoutId="texture-indicator"
                          style={{
                            position: 'absolute', inset: 0, borderRadius: '10px',
                            border: isDark ? '1.5px solid rgba(255,255,255,0.35)' : '1.5px solid rgba(99,102,241,0.7)',
                            boxShadow: isDark ? '0 0 8px rgba(255,255,255,0.1)' : '0 0 8px rgba(99,102,241,0.2)',
                          }}
                        />
                      )}
                      <span style={{ fontSize: '18px', lineHeight: 1 }}>{t.emoji}</span>
                    </motion.button>
                    </Tooltip>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Credits footer */}
      <footer
        className="fixed bottom-0 left-0 right-0 z-40 flex flex-col items-center pb-2 pt-1"
        style={{
          background: isDark ? 'rgba(10,10,18,0.35)' : 'rgba(255,255,255,0.25)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderTop: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(200,200,220,0.25)',
        }}
      >
        <p style={{
          fontSize: '11px',
          letterSpacing: '0.08em',
          color: 'rgba(167,139,250,0.7)',
          fontFamily: "'Lora', serif",
          textAlign: 'center',
          lineHeight: 1.7,
        }}>
          AI Awareness Society · Founded by{' '}
          <span style={{ color: 'rgba(196,181,253,0.9)' }}>
            Ankon Das · Claudia Abei · Jordan (ToU) · Kristina Akopyan · Laura Zavialova · Lilian Nunes Almeida
          </span>
        </p>
      </footer>

      {/* Canvas */}
      <motion.div
        animate={{ x: diaryOpen ? 60 : 0 }}
        transition={{ type: 'spring', damping: 22, stiffness: 80 }}
        className="w-full h-full flex items-center justify-center min-h-[700px] z-10 perspective-1000 px-6"
      >
        <AnimatePresence mode="wait">
          {active === 'native' && (
            <motion.div key="native" className="w-full max-w-[22rem] flex justify-center items-center">
              <NativeBookDiary onClick={() => setDiaryOpen(true)} onGlobalView={() => handleSwitch('voice')} />
            </motion.div>
          )}
          {active === 'promax' && (
            <motion.div key="promax" className="w-full max-w-[22rem] flex justify-center items-center">
              <ProMaxDiary onClick={() => setDiaryOpen(true)} onGlobalView={() => handleSwitch('voice')} />
            </motion.div>
          )}
          {active === 'pulse' && (
            <motion.div key="pulse" className="w-full h-full flex justify-center items-center overflow-hidden">
              <div className="w-full h-screen fixed inset-0 z-0 opacity-40">
                <ThreeGlobe />
              </div>
              
              {/* The Response Wall Layer */}
              <div className="relative z-10 w-full h-full">
                {lastAesthetic === 'native' ? <ReflectionWallNative /> : <ReflectionWallPro />}
              </div>

              {/* Back button to return to diary view */}
              <button 
                onClick={() => setActive(lastAesthetic)}
                className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 px-6 py-3 bg-white/40 backdrop-blur-md rounded-full border border-white/20 text-gray-800 font-semibold hover:bg-white/60 transition-all shadow-xl"
              >
                Return to Diary
              </button>
            </motion.div>
          )}
          {active === 'voice' && (
            <motion.div key="voice" className="fixed inset-0 z-[100] w-full h-full">
              <iframe 
                src="/globalfile.html" 
                className="w-full h-full border-none block"
                title="Global Voice Explorer"
              />
              {/* Back button to return to diary view */}
              <button 
                onClick={() => setActive(lastAesthetic)}
                className="fixed bottom-10 left-10 z-[110] px-6 py-3 bg-white/20 backdrop-blur-md rounded-full border border-white/20 text-white font-semibold hover:bg-white/40 transition-all shadow-xl"
              >
                ← Back
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Concept Modal */}
      <AnimatePresence>
        {conceptModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setConceptModal(null)}
            style={{
              position: 'fixed', inset: 0, zIndex: 200,
              background: 'rgba(0,0,0,0.75)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              backdropFilter: 'blur(6px)',
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', maxWidth: '90vw' }}
            >
              {conceptModal === 'why' && (
                <>
                  <p style={{ color: '#fff', fontSize: '22px', fontWeight: 700, fontFamily: "'Lora', serif", textAlign: 'center', letterSpacing: '0.02em', textShadow: '0 2px 12px rgba(0,0,0,0.5)' }}>
                    Self-reflection leads to Self-Realization
                  </p>
                  <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '14px', fontFamily: "'Lora', serif", textAlign: 'center', letterSpacing: '0.04em' }}>
                    Pause the busy life to Self-reflect.
                  </p>
                </>
              )}
              {conceptModal === 'value' && (
                <>
                  <p style={{ color: '#fff', fontSize: '22px', fontWeight: 700, fontFamily: "'Lora', serif", textAlign: 'center', letterSpacing: '0.02em', textShadow: '0 2px 12px rgba(0,0,0,0.5)' }}>
                    Collective Self-reflection leads to Aware Humanity
                  </p>
                  <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '14px', fontFamily: "'Lora', serif", textAlign: 'center', letterSpacing: '0.04em' }}>
                    Together we share and care.
                  </p>
                </>
              )}
              <img
                src={conceptModal === 'why' ? '/why_concept.png' : '/how_concept.png'}
                alt={conceptModal === 'why' ? 'Why' : 'Value'}
                style={{ maxWidth: '90vw', maxHeight: '75vh', borderRadius: '12px', boxShadow: '0 24px 80px rgba(0,0,0,0.6)' }}
              />
            </motion.div>
            <button
              onClick={() => setConceptModal(null)}
              style={{
                position: 'absolute', top: '20px', right: '24px',
                background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '50%',
                width: '36px', height: '36px', cursor: 'pointer', color: '#fff', fontSize: '18px',
              }}
            >✕</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
