import bgImage from '../assets/reflection of tree on a lake.png';
import secondPageLogo from '../assets/ v3_second_page_logo.png';
import prompts from './useQuestions';

const QUESTIONS = prompts;

interface SecondPageProps {
  coverColor: string;
  borderColor: string;
  borderRadius?: string;
  onPromptClick?: (index: number) => void;
  answers?: Record<number, string>;
}

const SecondPage = ({ borderRadius = '0.75rem', onPromptClick, answers = {} }: SecondPageProps) => (
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
    <div className="relative z-10 flex justify-center pt-5 pb-1 flex-shrink-0">
      <img src={secondPageLogo} alt="logo" style={{ height: '72px', objectFit: 'contain' }} />
    </div>

    {/* Reflection prompts list */}
    <div className="relative z-10 flex flex-col px-4 gap-0 flex-1">
      {QUESTIONS.map((q, i) => {
        const answered = !!answers[i];
        return (
          <button
            key={i}
            onClick={(e) => { e.stopPropagation(); onPromptClick?.(i); }}
            className="text-left py-2 px-2 rounded-lg border-b border-gray-100 last:border-0 group flex items-center justify-between gap-2 transition-all duration-150 hover:bg-amber-50 hover:border-transparent active:scale-[0.98]"
          >
            <span className="text-[10.5px] leading-[1.55] text-gray-600 group-hover:text-gray-900 transition-colors flex-1" style={{ fontFamily: "'Lora', serif" }}>
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

    {/* Footer */}
    <div className="relative z-10 pb-3 flex justify-center flex-shrink-0">
      <span className="text-[7px] tracking-widest uppercase text-amber-400 font-semibold" style={{ fontFamily: "'Gloria Hallelujah', cursive" }}>
        My Reflection Space
      </span>
    </div>
  </div>
);

export default SecondPage;
