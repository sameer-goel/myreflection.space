import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PageNavProps {
  page: number;
  maxPage: number;
  onPrev: () => void;
  onNext: () => void;
}

const PageNav = ({ page, maxPage, onPrev, onNext }: PageNavProps) => {
  if (page === 0) return null;

  return (
    <div className="absolute -bottom-12 left-0 right-0 flex items-center justify-center gap-4 z-50">
      <button
        onClick={onPrev}
        disabled={page <= 1}
        className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 disabled:opacity-20 disabled:cursor-not-allowed bg-black/5 hover:bg-black/10 active:scale-95"
      >
        <ChevronLeft size={16} className="text-gray-600" />
      </button>

      {/* Dot indicators */}
      <div className="flex items-center gap-1.5">
        {Array.from({ length: maxPage }).map((_, i) => (
          <div
            key={i}
            className={`rounded-full transition-all duration-300 ${
              i + 1 === page
                ? 'w-4 h-1.5 bg-gray-500'
                : 'w-1.5 h-1.5 bg-gray-300'
            }`}
          />
        ))}
      </div>

      <button
        onClick={onNext}
        disabled={page >= maxPage}
        className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 disabled:opacity-20 disabled:cursor-not-allowed bg-black/5 hover:bg-black/10 active:scale-95"
      >
        <ChevronRight size={16} className="text-gray-600" />
      </button>
    </div>
  );
};

export default PageNav;
