import { User, MapPin } from 'lucide-react';
import bgImage from '../assets/reflection of tree on a lake.png';

interface IdentityPageProps {
  userName: string;
  userCountry: string;
  onUpdate: (name: string, country: string) => void;
  borderRadius?: string;
}

const IdentityPage = ({ userName, userCountry, onUpdate, borderRadius = '0.75rem' }: IdentityPageProps) => {
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
          opacity: 0.12,
        }}
      />

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-10 gap-8">
        <div className="text-center space-y-2">
          <h2 className="text-xl font-bold text-gray-800" style={{ fontFamily: "'Lora', serif" }}>
            Identify Your Reflection
          </h2>
          <p className="text-[11px] text-gray-400 italic">
            Your name and country help connect your story to the global tapestry.
          </p>
        </div>

        <div className="w-full space-y-6">
          <div className="relative group">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-400 w-4 h-4 transition-colors group-focus-within:text-amber-500" />
            <input
              type="text"
              placeholder="Your Name"
              value={userName}
              onChange={(e) => onUpdate(e.target.value, userCountry)}
              className="w-full pl-10 pr-4 py-3 bg-white/50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-300 transition-all text-sm placeholder:text-gray-300 shadow-sm"
              style={{ fontFamily: "'Nunito Sans', sans-serif" }}
            />
          </div>

          <div className="relative group">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-400 w-4 h-4 transition-colors group-focus-within:text-amber-500" />
            <input
              type="text"
              placeholder="Your Country"
              value={userCountry}
              onChange={(e) => onUpdate(userName, e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-300 transition-all text-sm placeholder:text-gray-300 shadow-sm"
              style={{ fontFamily: "'Nunito Sans', sans-serif" }}
            />
          </div>
        </div>

        <div className="flex items-center gap-2 text-[10px] text-amber-500/60 font-semibold uppercase tracking-widest mt-4">
          <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          Ready to Continue
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 pb-3 flex justify-center flex-shrink-0">
        <span className="text-[7px] tracking-widest uppercase text-amber-400 font-semibold" style={{ fontFamily: "'Gloria Hallelujah', cursive" }}>
          My Reflection Space
        </span>
      </div>
    </div>
  );
};

export default IdentityPage;
