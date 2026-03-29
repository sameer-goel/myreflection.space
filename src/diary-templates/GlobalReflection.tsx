import { useMemo } from 'react';
import prompts from './useQuestions';

// Country list with flag emoji — reuse same set as IdentityModal
const COUNTRIES: { name: string; flag: string }[] = [
  { name: 'Spain', flag: '🇪🇸' },
  { name: 'Germany', flag: '🇩🇪' },
  { name: 'Australia', flag: '🇦🇺' },
  { name: 'United States', flag: '🇺🇸' },
  { name: 'India', flag: '🇮🇳' },
  { name: 'Russia', flag: '🇷🇺' },
  { name: 'Italy', flag: '🇮🇹' },
  { name: 'Canada', flag: '🇨🇦' },
  { name: 'France', flag: '🇫🇷' },
  { name: 'Japan', flag: '🇯🇵' },
  { name: 'Brazil', flag: '🇧🇷' },
  { name: 'United Kingdom', flag: '🇬🇧' },
];

interface GlobalReflectionProps {
  /** Country selected by the current user — highlighted in the grid */
  userCountry?: string;
  /** Override the displayed prompt index; defaults to a random one */
  promptIndex?: number;
  /** Called when the top-right globe icon is clicked */
  onGlobeClick?: () => void;
}

// Inline SVG world globe vector
const GlobeIcon = ({ size = 28 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="32" cy="32" r="28" stroke="#3ecfcf" strokeWidth="3" fill="none" />
    {/* Latitude lines */}
    <ellipse cx="32" cy="32" rx="28" ry="11" stroke="#3ecfcf" strokeWidth="2" fill="none" />
    <line x1="4" y1="32" x2="60" y2="32" stroke="#3ecfcf" strokeWidth="2" />
    {/* Longitude lines */}
    <ellipse cx="32" cy="32" rx="11" ry="28" stroke="#3ecfcf" strokeWidth="2" fill="none" />
    <ellipse cx="32" cy="32" rx="20" ry="28" stroke="#3ecfcf" strokeWidth="1.5" fill="none" />
    {/* Top & bottom poles */}
    <line x1="32" y1="4" x2="32" y2="60" stroke="#3ecfcf" strokeWidth="2" />
    {/* Highlight arc */}
    <path d="M 20 12 Q 32 8 44 12" stroke="#7de87d" strokeWidth="2" fill="none" strokeLinecap="round" />
  </svg>
);

const GlobalReflection = ({ userCountry, promptIndex, onGlobeClick }: GlobalReflectionProps) => {
  const idx = useMemo(
    () => (promptIndex !== undefined ? promptIndex : Math.floor(Math.random() * prompts.length)),
    [promptIndex]
  );

  return (
    <div className="flex flex-col items-center w-full px-4 py-6 bg-white min-h-full relative">
      {/* Top-right globe button */}
      <button
        onClick={(e) => { e.stopPropagation(); onGlobeClick?.(); }}
        className="absolute top-4 right-4 z-20 flex items-center justify-center w-10 h-10 rounded-full bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-teal-200 transition-all active:scale-95"
        aria-label="Global Reflection"
      >
        <GlobeIcon size={24} />
      </button>

      {/* Title */}
      <h2
        className="text-[22px] font-semibold text-gray-800 mb-5 tracking-tight"
        style={{ fontFamily: "'Varela Round', sans-serif" }}
      >
        Global Reflection
      </h2>

      {/* Prompt bubble */}
      <div
        className="w-full rounded-[1.4rem] p-5 mb-8"
        style={{
          background: 'linear-gradient(135deg, #3ecfcf 0%, #7de87d 100%)',
          minHeight: '120px',
        }}
      >
        <p
          className="text-white text-[12px] leading-[1.7] font-medium"
          style={{ fontFamily: "'Lora', serif" }}
        >
          <span className="font-bold">Prompt:</span> {prompts[idx]}
        </p>
        <p
          className="text-white/80 text-[11px] mt-1"
          style={{ fontFamily: "'Lora', serif" }}
        >
          Random answer selected.
        </p>
      </div>

      {/* Flag grid */}
      <div className="grid grid-cols-4 gap-3 w-full">
        {COUNTRIES.map(({ name, flag }) => {
          const isUser = name === userCountry;
          return (
            <div
              key={name}
              title={name}
              className={`aspect-[3/2] rounded-xl flex items-center justify-center text-4xl select-none transition-transform duration-150 hover:scale-105 ${
                isUser ? 'ring-2 ring-amber-400 ring-offset-1' : ''
              }`}
              style={{ background: '#f5f5f5', overflow: 'hidden' }}
            >
              {flag}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-6">
        <span
          className="text-[7px] tracking-widest uppercase text-amber-400 font-semibold"
          style={{ fontFamily: "'Gloria Hallelujah', cursive" }}
        >
          My Reflection Space
        </span>
      </div>
    </div>
  );
};

export default GlobalReflection;
