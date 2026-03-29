import { useState } from 'react';
import { motion } from 'motion/react';
import touLogo from '../assets/tou_logo.png';
import nativeLogo from '../assets/reount_reflection_logo_v2_native.png';
import { SpiralBinding } from './SpiralBinding';
import FirstPage from './FirstPage';
import SecondPage from './SecondPage';
import NewPage from './NewPage';
import IdentityModal from './IdentityModal';
import prompts from './useQuestions';

const COVER_COLOR = '#557eb5';
const BORDER_COLOR = '#3F5B7B';
const MAX_PAGE = 3;

const NativeCoverPattern = () => (
  <svg width="100%" height="100%" viewBox="0 0 400 600" preserveAspectRatio="none" className="absolute inset-0 z-0 rounded-xl overflow-hidden pointer-events-none">
    <rect width="400" height="600" fill="#fdf2bb" />
    <path d="M-50,350 C100,400 150,550 200,650 L-50,650 Z" fill="#8bcbd1" />
    <path d="M450,400 C300,350 200,550 150,650 L450,650 Z" fill="#fadacc" />
    <path d="M250,-50 C300,50 450,150 450,300 L450,-50 Z" fill="#fadacc" />
    <path d="M0,0 Q50,50 100,0 T200,0 T300,0 T400,0 T500,0" stroke="#f2b544" strokeWidth="2" fill="none" opacity="0.6" transform="translate(0, 50)" />
    <path d="M0,0 Q50,50 100,0 T200,0 T300,0 T400,0 T500,0" stroke="#f2b544" strokeWidth="2" fill="none" opacity="0.6" transform="translate(0, 70)" />
    <path d="M0,0 Q50,50 100,0 T200,0 T300,0 T400,0 T500,0" stroke="#f2b544" strokeWidth="2" fill="none" opacity="0.6" transform="translate(0, 90)" />
    <path d="M0,0 Q50,50 100,0 T200,0 T300,0 T400,0 T500,0" stroke="#f2b544" strokeWidth="2" fill="none" opacity="0.6" transform="translate(0, 110)" />
    <path d="M0,0 Q50,50 100,0 T200,0 T300,0 T400,0 T500,0" stroke="#f2b544" strokeWidth="2" fill="none" opacity="0.6" transform="translate(0, 130)" />
    <path d="M0,0 Q50,50 100,0 T200,0 T300,0 T400,0 T500,0" stroke="#f2b544" strokeWidth="2" fill="none" opacity="0.6" transform="translate(0, 150)" />
    <pattern id="wavy" x="0" y="0" width="100" height="15" patternUnits="userSpaceOnUse">
      <path d="M0,7.5 Q25,15 50,7.5 T100,7.5" stroke="#f2ca6b" strokeWidth="1.5" fill="none" opacity="0.4" />
    </pattern>
    <rect width="400" height="600" fill="url(#wavy)" />
  </svg>
);


interface NativeBookDiaryProps {
  onClick?: () => void;
}

const NativeBookDiary = ({ onClick }: NativeBookDiaryProps) => {
  const [page, setPage] = useState<number>(0);
  const [selectedPrompt, setSelectedPrompt] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showIdentity, setShowIdentity] = useState(false);
  const [userName, setUserName] = useState('');
  const [userCountry, setUserCountry] = useState('');

  const handleCoverClick = () => { setPage(1); onClick?.(); };
  const goNext = () => setPage(p => Math.min(p + 1, MAX_PAGE));
  const handlePromptClick = (i: number) => { setSelectedPrompt(i); setPage(3); };
  const handleSave = (text: string) => { if (selectedPrompt !== null) setAnswers(a => ({ ...a, [selectedPrompt]: text })); setPage(2); };
  const promptLabel = selectedPrompt !== null ? `P${selectedPrompt + 1}. ${prompts[selectedPrompt]}` : undefined;

  const isOpen = page >= 1;

  return (
    <motion.div
      initial={{ opacity: 0, rotateY: -30, scale: 0.9 }}
      animate={{ opacity: 1, rotateY: 0, scale: 1, y: isOpen ? 0 : [0, -10, 0] }}
      exit={{ opacity: 0, rotateY: 90, scale: 1.1 }}
      transition={{
        opacity: { duration: 0.5 },
        rotateY: { type: 'spring', damping: 15, stiffness: 100 },
        scale: { type: 'spring', damping: 15, stiffness: 100 },
        y: { duration: 6, repeat: isOpen ? 0 : Infinity, ease: 'easeInOut' },
      }}
      className="w-full max-w-[22rem] aspect-[3/4] relative"
      style={{ perspective: '1200px' }}
    >
      {/* Page stack */}
      <div className="absolute right-[-14px] top-3 bottom-3 w-10 bg-[#f8f8f8] rounded-r-2xl border border-gray-300 shadow-[2px_0_5px_rgba(0,0,0,0.1)] z-0" />
      <div className="absolute right-[-24px] top-5 bottom-5 w-10 bg-[#e8e8e8] rounded-r-2xl border border-gray-400 shadow-[5px_0_15px_rgba(0,0,0,0.2)] z-0" />

      {/* NewPage (reflection prompt detail) — z-10, bottom of stack */}
      {page >= 1 && (
        <div className="absolute inset-0 z-10">
          <NewPage key={selectedPrompt} coverColor={COVER_COLOR} borderColor={BORDER_COLOR} borderRadius="0.75rem"
            prompt={promptLabel}
            initialValue={selectedPrompt !== null ? (answers[selectedPrompt] ?? '') : ''}
            onClose={() => setPage(1)}
            onSave={handleSave}
          />
        </div>
      )}

      {/* SecondPage (reflection prompts list) — z-20, flips away when going to page 3 */}
      <motion.div
        className="absolute inset-0 z-20 preserve-3d"
        style={{ transformOrigin: 'left center' }}
        animate={{ rotateY: page >= 3 ? -165 : 0 }}
        transition={{ type: 'spring', damping: 22, stiffness: 75 }}
      >
        <div className="absolute inset-0" style={{ backfaceVisibility: 'hidden' }}>
          {page >= 2 && (
            <SecondPage coverColor={COVER_COLOR} borderColor={BORDER_COLOR} borderRadius="0.75rem" onPromptClick={handlePromptClick} answers={answers} />
          )}
        </div>
        <div className="absolute inset-0 bg-white rounded-xl" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }} />
      </motion.div>

      {/* FirstPage — z-30, flips away when page > 1 */}
      <motion.div
        className="absolute inset-0 z-30 preserve-3d"
        style={{ transformOrigin: 'left center' }}
        animate={{ rotateY: page >= 2 ? -165 : 0 }}
        transition={{ type: 'spring', damping: 22, stiffness: 75 }}
      >
        <div
          className="absolute inset-0 cursor-pointer"
          style={{ backfaceVisibility: 'hidden' }}
          onClick={(e) => { if ((e.target as HTMLElement).closest('button, a, textarea, input, select')) return; goNext(); }}
        >
          {page >= 1 && (
            <FirstPage coverColor={COVER_COLOR} borderColor={BORDER_COLOR} borderRadius="0.75rem" onGlobeClick={() => setShowIdentity(true)} />
          )}
          {showIdentity && page >= 1 && (
            <IdentityModal
              initialName={userName}
              initialCountry={userCountry}
              onSave={(n, c) => { setUserName(n); setUserCountry(c); }}
              onClose={() => setShowIdentity(false)}
            />
          )}
        </div>
        <div className="absolute inset-0 bg-[#fffef0] rounded-xl" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }} />
      </motion.div>

      {/* Front cover — sits at z-40, flips away on click */}
      <motion.div
        onClick={page === 0 ? handleCoverClick : undefined}
        className="absolute inset-0 z-40 preserve-3d"
        style={{ transformOrigin: 'left center', cursor: page === 0 ? 'pointer' : 'default' }}
        animate={{ rotateY: page >= 1 ? -165 : 0 }}
        transition={{ type: 'spring', damping: 22, stiffness: 75 }}
      >
        {/* Front face */}
        <div className="absolute inset-0 bg-[#557eb5] rounded-xl border-[8px] border-[#3F5B7B] shadow-[20px_20px_50px_rgba(0,0,0,0.5)] overflow-hidden ring-2 ring-black/80" style={{ backfaceVisibility: 'hidden' }}>
          <NativeCoverPattern />
          <div className="absolute top-4 right-4 z-30 px-5 py-2 bg-white rounded-[1rem] flex items-center justify-center shadow-[0_2px_10px_rgba(0,0,0,0.1)]">
            <img src={touLogo} alt="ToU Logo" className="h-6 md:h-7 object-contain" />
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-start pointer-events-none pt-6">
            <div className="z-30 relative w-[95%] aspect-square">
              <div className="absolute z-30 rounded-full overflow-hidden drop-shadow-[0_10px_20px_rgba(0,0,0,0.25)]" style={{ width: '58%', aspectRatio: '1', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
                <img src={nativeLogo} alt="My Reflection Space Orb" className="absolute inset-0 w-full h-full object-cover scale-[1.35]" />
              </div>
              <svg viewBox="-40 -10 280 220" className="absolute inset-0 w-full h-full z-40 pointer-events-none overflow-visible">
                <path id="text-curve" d="M 10,110 A 90,90 0 0,1 190,110" fill="none" />
                <text fill="#111" style={{ fontFamily: "'Gloria Hallelujah', cursive", fontSize: '17px', fontWeight: 'bold', letterSpacing: '3px' }}>
                  <textPath href="#text-curve" startOffset="50%" textAnchor="middle">MY REFLECTION SPACE</textPath>
                </text>
              </svg>
            </div>
            <div className="z-30 flex flex-col items-center justify-center w-[90%] mt-1 mb-2">
              <span style={{ fontFamily: "'Gloria Hallelujah', cursive", letterSpacing: '2px' }} className="text-[#111] text-[9px] font-bold text-center leading-[2]">
                A VIRAL MOVEMENT TO<br />PROVIDE SUPPORT TOWARD<br />HONEST SELF-REFLECTION
              </span>
            </div>
          </div>
        </div>
        {/* Back face of cover */}
        <div className="absolute inset-0 bg-[#4a6fa0] rounded-xl border-[8px] border-[#3F5B7B]" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }} />
      </motion.div>

      <SpiralBinding />
    </motion.div>
  );
};

export default NativeBookDiary;
