import { useState, useEffect } from 'react';
import { useGeoCountry } from './useGeoCountry';
import { motion } from 'motion/react';
import { BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';
import touLogo from '../assets/tou_logo.png';
import logoVideo from '../assets/reflection of man meditating video.mp4';
import { SpiralBinding } from './SpiralBinding';
import SecondPage from './SecondPage';
import FourthPage from './FourthPage';
import NewPage from './NewPage';
import PageTurner from './PageTurner';
import IdentityPage from './IdentityPage';
import prompts from './useQuestions';

const COVER_COLOR = '#ffcae3';
const BORDER_COLOR = '#f9a8d4';
const MAX_PAGE = 4;

interface ProMaxDiaryProps {
  onClick?: () => void;
  onGlobalView?: () => void;
}

const ProMaxDiary = ({ onClick, onGlobalView }: ProMaxDiaryProps) => {
  const [page, setPage] = useState<number>(0);
  const [selectedPrompt, setSelectedPrompt] = useState<number | null>(null);
  const [userName, setUserName] = useState('');
  const [userCountry, setUserCountry] = useState('');
  const geoCountry = useGeoCountry();
  // Auto-fill country from geo only if user hasn't typed anything yet
  useEffect(() => { if (geoCountry && !userCountry) setUserCountry(geoCountry); }, [geoCountry]);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const handleCoverClick = () => { setPage(1); onClick?.(); };
  const goNext = () => setPage(p => Math.min(p + 1, MAX_PAGE));
  const goPrev = () => setPage(p => Math.max(p - 1, 1));
  const handlePromptClick = (i: number) => { setSelectedPrompt(i); setPage(4); };
  const handleSave = (text: string) => { if (selectedPrompt !== null) setAnswers(a => ({ ...a, [selectedPrompt]: text })); setPage(3); };
  const promptLabel = selectedPrompt !== null ? `P${selectedPrompt + 1}. ${prompts[selectedPrompt]}` : undefined;

  const isOpen = page >= 1;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: isOpen ? 0 : [0, -4, 0] }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{
        opacity: { duration: 0.5 },
        scale: { type: 'spring', damping: 15, stiffness: 100 },
        y: { duration: 5, repeat: isOpen ? 0 : Infinity, ease: 'easeInOut' },
      }}
      className="w-full max-w-[22rem] aspect-[3/4] relative"
      style={{ perspective: '1200px' }}
    >
      {/* 3D extrusion layers */}
      <div className="absolute inset-0 bg-[#A3A3A3] rounded-[1.8rem] translate-x-[14px] translate-y-[12px] z-[-2]" />
      <div className="absolute inset-0 bg-[#E0E0E0] rounded-[1.8rem] translate-x-[7px] translate-y-[6px] z-[-1]" />

      {/* NewPage (reflection prompt detail) — z-10 */}
      {page >= 1 && (
        <div className="absolute inset-0 z-10">
          <PageTurner onPrev={goPrev} onNext={goNext} canPrev={page > 1} canNext={false} borderRadius="1.8rem">
            <NewPage key={selectedPrompt} coverColor={COVER_COLOR} borderColor={BORDER_COLOR} borderRadius="1.8rem"
              prompt={promptLabel}
              initialValue={selectedPrompt !== null ? (answers[selectedPrompt] ?? '') : ''}
              onClose={() => setPage(3)}
              onSave={handleSave}
            />
          </PageTurner>
        </div>
      )}

      {/* FourthPage (reflection prompts list) — z-20, flips away to page 4 */}
      <motion.div
        className="absolute inset-0 z-20 preserve-3d"
        style={{ transformOrigin: 'left center' }}
        animate={{ rotateY: page >= 4 ? -165 : 0 }}
        transition={{ type: 'spring', damping: 22, stiffness: 75 }}
      >
        <div className="absolute inset-0" style={{ backfaceVisibility: 'hidden' }}>
          {page >= 3 && (
            <PageTurner onPrev={goPrev} onNext={goNext} canPrev={page > 1} canNext={page < MAX_PAGE} borderRadius="1.8rem">
              <FourthPage coverColor={COVER_COLOR} borderColor={BORDER_COLOR} borderRadius="1.8rem" onPromptClick={handlePromptClick} answers={answers} onSubmit={onGlobalView} />
            </PageTurner>
          )}
        </div>
        <div className="absolute inset-0 bg-white rounded-[1.8rem]" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }} />
      </motion.div>

      {/* IdentityPage (user info) — z-30, flips away to page 3 */}
      <motion.div
        className="absolute inset-0 z-30 preserve-3d"
        style={{ transformOrigin: 'left center' }}
        animate={{ rotateY: page >= 3 ? -165 : 0 }}
        transition={{ type: 'spring', damping: 22, stiffness: 75 }}
      >
        <div className="absolute inset-0" style={{ backfaceVisibility: 'hidden' }}>
          {page >= 2 && (
            <PageTurner onPrev={goPrev} onNext={goNext} canPrev={page > 1} canNext={page < MAX_PAGE} borderRadius="1.8rem">
              <IdentityPage userName={userName} userCountry={userCountry} onUpdate={(n, c) => { setUserName(n); setUserCountry(c); }} borderRadius="1.8rem" />
            </PageTurner>
          )}
        </div>
        <div className="absolute inset-0 bg-white rounded-[1.8rem]" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }} />
      </motion.div>

      {/* SecondPage (description) — z-40, flips away to page 2 */}
      <motion.div
        className="absolute inset-0 z-40 preserve-3d"
        style={{ transformOrigin: 'left center' }}
        animate={{ rotateY: page >= 2 ? -165 : 0 }}
        transition={{ type: 'spring', damping: 22, stiffness: 75 }}
      >
        <div className="absolute inset-0" style={{ backfaceVisibility: 'hidden' }}>
          {page >= 1 && (
            <PageTurner onPrev={goPrev} onNext={goNext} canPrev={false} canNext={page < MAX_PAGE} borderRadius="1.8rem">
              <SecondPage coverColor={COVER_COLOR} borderColor={BORDER_COLOR} borderRadius="1.8rem" />
            </PageTurner>
          )}
        </div>
        <div className="absolute inset-0 bg-white rounded-[1.8rem]" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }} />
      </motion.div>

      {/* Front cover — flips on click — z-60 */}
      <motion.div
        onClick={page === 0 ? handleCoverClick : undefined}
        className="absolute inset-0 z-60 preserve-3d"
        style={{ transformOrigin: 'left center', cursor: page === 0 ? 'pointer' : 'default' }}
        animate={{ rotateY: page >= 1 ? -165 : 0 }}
        transition={{ type: 'spring', damping: 22, stiffness: 75 }}
      >
        {/* Front face */}
        <div className="absolute inset-0 rounded-[1.8rem] bg-gradient-to-bl from-[#ffcae3] via-[#ffffff] to-[#e2f4f6] border-[8px] border-[#f9a8d4] shadow-[0_0_20px_rgba(0,0,0,0.1)] overflow-hidden" style={{ backfaceVisibility: 'hidden' }}>
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/70 pointer-events-none" />
          <div className="relative z-20 flex flex-col h-full items-start w-full p-6 lg:p-7">
            <div className="w-full flex justify-end z-30 relative">
              <div className="flex items-center justify-center bg-white/60 backdrop-blur-md rounded-3xl border border-white/80 shadow-[0_2px_10px_rgba(0,0,0,0.05)] px-4 py-1.5">
                <img src={touLogo} alt="ToU Logo" className="h-7 object-contain mix-blend-multiply opacity-90" />
              </div>
            </div>
            <div className="w-full flex justify-between items-start mb-3 mt-1">
              <h1 style={{ fontFamily: "'Varela Round', sans-serif" }} className="text-[2.2rem] lg:text-[2.5rem] font-bold text-[#8B1E47] leading-[1.05] tracking-tight drop-shadow-sm">
                Reflections<br />on AI &<br />Wellbeing
              </h1>
              <div className="w-[72px] h-[72px] lg:w-[80px] lg:h-[80px] rounded-full overflow-hidden border border-white/80 shadow-[0_5px_15px_rgba(0,0,0,0.1)] flex-shrink-0 mt-1">
                <video src={logoVideo} autoPlay loop muted playsInline className="w-full h-full object-cover scale-110" />
              </div>
            </div>
            <p style={{ fontFamily: "'Nunito Sans', sans-serif" }} className="text-[#8B1E47]/90 text-[12px] leading-[1.4] font-semibold max-w-[90%] mb-4">
              Exploring the evolving role of AI in our daily lives and its impact on personal wellbeing.
            </p>
            <div className="flex flex-col gap-3 w-full mt-auto">
              <div className="bg-white/40 backdrop-blur-xl rounded-[1rem] px-4 py-3 border border-white/60 w-full flex flex-col items-start">
                <BookOpen size={18} className="text-[#F472B6] mb-1.5" />
                <div style={{ fontFamily: "'Nunito Sans', sans-serif" }} className="text-[#8B1E47] text-[11px] font-black tracking-widest uppercase">142 ENTRIES</div>
              </div>
              <button className="w-full bg-[#f67eb9] text-white py-3.5 rounded-[1rem] text-[12px] font-black tracking-widest uppercase shadow-[0_6px_15px_rgba(244,114,182,0.3)] flex items-center justify-center gap-2">
                <span style={{ fontFamily: "'Nunito Sans', sans-serif" }}>I WANT TO REFLECT</span> <ChevronRight size={16} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>
        {/* Back face of cover */}
        <div className="absolute inset-0 bg-[#fce4f0] rounded-[1.8rem] border border-white/80" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }} />
      </motion.div>

      <SpiralBinding />

      {/* Navigation Arrows at the bottom */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -bottom-20 left-0 right-0 flex justify-center items-center gap-12 z-[100]"
        >
          <button 
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            disabled={page <= 1}
            className={`p-3 rounded-full bg-white/40 backdrop-blur-md border border-white/60 shadow-lg transition-all
              ${page <= 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white/60 active:scale-90 hover:shadow-xl'}`}
            aria-label="Previous Page"
          >
            <ChevronLeft size={24} className="text-[#8B1E47]" />
          </button>
          
          <button 
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            disabled={page >= MAX_PAGE || (page === 2 && (!userName || !userCountry)) || (page === 3 && selectedPrompt === null)}
            className={`p-3 rounded-full bg-white/40 backdrop-blur-md border border-white/60 shadow-lg transition-all
              ${(page >= MAX_PAGE || (page === 2 && (!userName || !userCountry)) || (page === 3 && selectedPrompt === null)) ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white/60 active:scale-90 hover:shadow-xl'}`}
            aria-label="Next Page"
          >
            <ChevronRight size={24} className="text-[#8B1E47]" />
          </button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ProMaxDiary;
