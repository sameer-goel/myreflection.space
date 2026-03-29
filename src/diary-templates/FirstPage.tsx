import pageImage from '../assets/1stPageImage.png';
import bgImage from '../assets/reflection of tree on a lake.png';

interface FirstPageProps {
  coverColor: string;
  borderColor: string;
  borderRadius?: string;
  onGlobeClick?: () => void;
}

const FirstPage = ({ borderRadius = '0.75rem', onGlobeClick }: FirstPageProps) => (
  <div
    className="absolute inset-0 bg-white flex flex-col items-center justify-center overflow-hidden"
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

    {/* Image */}
    <div className="w-[78%] flex-shrink-0 relative z-10">
      <img src={pageImage} alt="Reflection Space" className="w-full object-contain" style={{ display: 'block' }} />
    </div>

    {/* Text block */}
    <div className="w-[78%] mt-4 flex flex-col gap-1 relative z-10">
      <div className="w-8 h-[2px] bg-amber-400 rounded-full mb-2" />
      <p className="text-[10.5px] leading-[1.75] text-gray-500 italic" style={{ fontFamily: "'Lora', serif" }}>
        Reflection space is for you to express yourself freely and be a part of a global supportive reflection community.
      </p>
    </div>

    {/* Glowing pulsating globe */}
    <button
      onClick={(e) => { e.stopPropagation(); onGlobeClick?.(); }}
      className="relative z-10 mt-5 flex items-center justify-center focus:outline-none"
      aria-label="Set your name and country"
    >
      <span
        className="absolute rounded-full"
        style={{
          width: '52px', height: '52px',
          background: 'radial-gradient(circle, rgba(99,179,237,0.45) 0%, rgba(99,179,237,0) 70%)',
          animation: 'globePulse 2.2s ease-in-out infinite',
        }}
      />
      <span style={{ fontSize: '32px', filter: 'drop-shadow(0 0 8px rgba(99,179,237,0.9)) drop-shadow(0 0 18px rgba(59,130,246,0.5))' }}>
        🌍
      </span>
    </button>

    {/* Footer */}
    <div className="absolute bottom-3 left-0 right-0 flex justify-center z-10">
      <span className="text-[7px] tracking-widest uppercase text-amber-400 font-semibold" style={{ fontFamily: "'Gloria Hallelujah', cursive" }}>
        My Reflection Space
      </span>
    </div>

    <style>{`
      @keyframes globePulse {
        0%, 100% { transform: scale(1); opacity: 0.7; }
        50% { transform: scale(1.55); opacity: 0.2; }
      }
    `}</style>
  </div>
);

export default FirstPage;
