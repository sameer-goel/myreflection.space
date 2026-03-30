import bgImage from '../assets/reflection of tree on a lake.png';
import secondPageLogo from '../assets/ v3_second_page_logo.png';
import prompts from './useQuestions';

const QUESTIONS = prompts;

interface FourthPageProps {
  coverColor: string;
  borderColor: string;
  borderRadius?: string;
  onPromptClick?: (index: number) => void;
  answers?: Record<number, string>;
  onSubmit?: () => void;
}

const FourthPage = ({ borderRadius = '0.75rem', onPromptClick, answers = {}, onSubmit }: FourthPageProps) => (
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
        opacity: 0.12,
      }}
    />

    {/* Logo */}
    <div className="relative z-10 flex justify-center pt-4 pb-1 flex-shrink-0">
      <img src={secondPageLogo} alt="logo" style={{ height: '60px', objectFit: 'contain' }} />
    </div>

    {/* Header — before questions */}
    <div className="relative z-10 pl-8 pr-4 pb-2 flex-shrink-0">
      <h2
        className="text-[13px] font-bold text-gray-800 leading-tight mb-0.5"
        style={{ fontFamily: "'Lora', serif" }}
      >
        Questions
      </h2>
      <p className="text-[9px] text-amber-600 font-semibold uppercase tracking-wide leading-tight mb-0.5">
        Choose the question or questions that resonate with you
      </p>
      <p className="text-[8.5px] text-gray-400 leading-snug italic">
        Take your time to reflect on each question before responding.
      </p>
      <div className="mt-1.5 border-t border-amber-100" />
    </div>

    {/* Reflection prompts list */}
    <div className="relative z-10 flex flex-col pl-8 pr-4 gap-0 flex-1 overflow-y-auto">
      {QUESTIONS.map((q, i) => {
        const answered = !!answers[i];
        return (
          <button
            key={i}
            onClick={(e) => { e.stopPropagation(); onPromptClick?.(i); }}
            className="text-left py-2 px-2 rounded-lg border-b border-gray-100 last:border-0 group flex items-center justify-between gap-2 transition-all duration-150 hover:bg-amber-50 hover:border-transparent active:scale-[0.98]"
          >
            <span className="text-[10px] leading-[1.55] text-gray-600 group-hover:text-gray-900 transition-colors flex-1" style={{ fontFamily: "'Lora', serif" }}>
              <span className="text-amber-400 font-semibold mr-1">P{i + 1}.</span>
              {q}
            </span>
            <span className="flex items-center gap-1 flex-shrink-0">
              {answered ? (
                <>
                  {/* green tick */}
                  <span className="text-emerald-500 text-[11px]">✓</span>
                  {/* edit icon */}
                  <span className="text-gray-300 group-hover:text-amber-400 transition-colors text-[10px]">✎</span>
                </>
              ) : (
                <span className="text-amber-300 group-hover:text-amber-500 transition-all duration-150 opacity-0 group-hover:opacity-100 translate-x-[-4px] group-hover:translate-x-0">›</span>
              )}
            </span>
          </button>
        );
      })}
    </div>

    {/* Submit button */}
    <div className="relative z-10 pl-8 pr-4 pb-3 pt-2 flex-shrink-0">
      <button
        onClick={(e) => { e.stopPropagation(); onSubmit?.(); }}
        className="w-full py-2.5 rounded-xl text-white text-[10px] font-bold uppercase tracking-widest transition-all duration-200 active:scale-[0.97] shadow-md"
        style={{
          background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
          boxShadow: '0 4px 14px rgba(245,158,11,0.35)',
        }}
      >
        Share with the World 🌍
      </button>
    </div>

    {/* Footer */}
    <div className="relative z-10 pb-2 flex justify-center flex-shrink-0">
      <span className="text-[7px] tracking-widest uppercase text-amber-400 font-semibold" style={{ fontFamily: "'Gloria Hallelujah', cursive" }}>
        My Reflection Space
      </span>
    </div>
  </div>
);

export default FourthPage;
