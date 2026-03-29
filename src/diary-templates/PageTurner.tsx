import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PageTurnerProps {
  onPrev?: () => void;
  onNext?: () => void;
  canPrev?: boolean;
  canNext?: boolean;
  children: React.ReactNode;
  borderRadius?: string;
}

const PageTurner = ({ onPrev, onNext, canPrev = true, canNext = true, children, borderRadius = '0.75rem' }: PageTurnerProps) => {
  const [hover, setHover] = useState<'left' | 'right' | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, width, top, height } = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    // only show hint in bottom 30% of page
    if (y < height * 0.7) { setHover(null); return; }
    setHover(x < width / 2 ? 'left' : 'right');
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // don't navigate if clicking an interactive element like a button or link
    if ((e.target as HTMLElement).closest('button, a, textarea, input')) return;
    const { left, width } = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - left;
    if (x < width / 2) { if (canPrev) onPrev?.(); }
    else { if (canNext) onNext?.(); }
  };

  return (
    <div
      className="absolute inset-0 cursor-pointer"
      style={{ borderRadius }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setHover(null)}
      onClick={handleClick}
    >
      {children}

      {/* Left arrow hint */}
      <div
        className="absolute bottom-3 left-3 transition-all duration-200 pointer-events-none"
        style={{ opacity: hover === 'left' && canPrev ? 1 : 0, transform: hover === 'left' && canPrev ? 'translateX(0)' : 'translateX(-4px)' }}
      >
        <div className="bg-black/10 backdrop-blur-sm rounded-full p-1">
          <ChevronLeft size={12} className="text-gray-500" />
        </div>
      </div>

      {/* Right arrow hint */}
      <div
        className="absolute bottom-3 right-3 transition-all duration-200 pointer-events-none"
        style={{ opacity: hover === 'right' && canNext ? 1 : 0, transform: hover === 'right' && canNext ? 'translateX(0)' : 'translateX(4px)' }}
      >
        <div className="bg-black/10 backdrop-blur-sm rounded-full p-1">
          <ChevronRight size={12} className="text-gray-500" />
        </div>
      </div>
    </div>
  );
};

export default PageTurner;
