import { useState } from 'react';
import { Save } from 'lucide-react';
import bgImage from '../../../website_assets/reflection of tree on a lake.png';

interface NewPageProps {
  coverColor: string;
  borderColor: string;
  borderRadius?: string;
  prompt?: string;
  initialValue?: string;
  onClose?: () => void;
  onSave?: (text: string) => void;
}

const NewPage = ({ borderRadius = '0.75rem', prompt, initialValue = '', onClose, onSave }: NewPageProps) => {
  const [text, setText] = useState(initialValue);

  return (
    <div
      className="absolute inset-0 bg-white flex flex-col overflow-hidden"
      style={{ borderRadius }}
    >
      {/* Faded background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url("${bgImage}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.18,
        }}
      />

      {/* X close button */}
      <button
        onClick={(e) => { e.stopPropagation(); onClose?.(); }}
        className="absolute top-3 right-3 z-20 w-6 h-6 flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors text-base leading-none"
      >
        ×
      </button>

      {/* Speech bubble + save layout */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-5 gap-4">
        <div className="relative w-full">
          <div
            className="w-full bg-white rounded-2xl border-[2.5px] border-gray-900 p-4 flex flex-col gap-2"
            style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}
          >
            {prompt && (
              <p className="text-[13px] font-semibold leading-[1.5] text-gray-900 italic" style={{ fontFamily: "'Lora', serif" }}>
                {prompt}
              </p>
            )}
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              className="w-full resize-none bg-transparent outline-none text-[10.5px] leading-[1.7] text-gray-600 placeholder:text-gray-300 min-h-[80px]"
              style={{ fontFamily: "'Lora', serif" }}
              placeholder="Write your reflection here ..."
            />
          </div>
          <div className="flex justify-center">
            <svg width="32" height="20" viewBox="0 0 32 20" fill="none">
              <path d="M12 0 L20 0 L16 20 Z" fill="white" stroke="#111" strokeWidth="2.5" strokeLinejoin="round" />
              <rect x="10" y="0" width="12" height="3" fill="white" />
            </svg>
          </div>
        </div>

        <button
          onClick={(e) => { e.stopPropagation(); onSave?.(text); }}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-gray-200 shadow-sm hover:shadow-md hover:border-amber-300 hover:text-amber-500 text-gray-400 transition-all active:scale-95"
        >
          <Save size={14} />
        </button>
      </div>

      <div className="relative z-10 pb-3 flex justify-center flex-shrink-0">
        <span className="text-[7px] tracking-widest uppercase text-amber-400 font-semibold" style={{ fontFamily: "'Gloria Hallelujah', cursive" }}>
          My Reflection Space
        </span>
      </div>
    </div>
  );
};

export default NewPage;
