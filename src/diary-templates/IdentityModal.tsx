import { useState, useRef, useEffect } from 'react';

const COUNTRIES: { name: string; flag: string }[] = [
  { name: 'Afghanistan', flag: '🇦🇫' }, { name: 'Albania', flag: '🇦🇱' },
  { name: 'Algeria', flag: '🇩🇿' }, { name: 'Argentina', flag: '🇦🇷' },
  { name: 'Australia', flag: '🇦🇺' }, { name: 'Austria', flag: '🇦🇹' },
  { name: 'Bangladesh', flag: '🇧🇩' }, { name: 'Belgium', flag: '🇧🇪' },
  { name: 'Bolivia', flag: '🇧🇴' }, { name: 'Brazil', flag: '🇧🇷' },
  { name: 'Cambodia', flag: '🇰🇭' }, { name: 'Canada', flag: '🇨🇦' },
  { name: 'Chile', flag: '🇨🇱' }, { name: 'China', flag: '🇨🇳' },
  { name: 'Colombia', flag: '🇨🇴' }, { name: 'Croatia', flag: '🇭🇷' },
  { name: 'Czech Republic', flag: '🇨🇿' }, { name: 'Denmark', flag: '🇩🇰' },
  { name: 'Ecuador', flag: '🇪🇨' }, { name: 'Egypt', flag: '🇪🇬' },
  { name: 'Ethiopia', flag: '🇪🇹' }, { name: 'Finland', flag: '🇫🇮' },
  { name: 'France', flag: '🇫🇷' }, { name: 'Germany', flag: '🇩🇪' },
  { name: 'Ghana', flag: '🇬🇭' }, { name: 'Greece', flag: '🇬🇷' },
  { name: 'Guatemala', flag: '🇬🇹' }, { name: 'Hungary', flag: '🇭🇺' },
  { name: 'India', flag: '🇮🇳' }, { name: 'Indonesia', flag: '🇮🇩' },
  { name: 'Iran', flag: '🇮🇷' }, { name: 'Iraq', flag: '🇮🇶' },
  { name: 'Ireland', flag: '🇮🇪' }, { name: 'Israel', flag: '🇮🇱' },
  { name: 'Italy', flag: '🇮🇹' }, { name: 'Jamaica', flag: '🇯🇲' },
  { name: 'Japan', flag: '🇯🇵' }, { name: 'Jordan', flag: '🇯🇴' },
  { name: 'Kenya', flag: '🇰🇪' }, { name: 'Malaysia', flag: '🇲🇾' },
  { name: 'Mexico', flag: '🇲🇽' }, { name: 'Morocco', flag: '🇲🇦' },
  { name: 'Myanmar', flag: '🇲🇲' }, { name: 'Nepal', flag: '🇳🇵' },
  { name: 'Netherlands', flag: '🇳🇱' }, { name: 'New Zealand', flag: '🇳🇿' },
  { name: 'Nigeria', flag: '🇳🇬' }, { name: 'Norway', flag: '🇳🇴' },
  { name: 'Pakistan', flag: '🇵🇰' }, { name: 'Peru', flag: '🇵🇪' },
  { name: 'Philippines', flag: '🇵🇭' }, { name: 'Poland', flag: '🇵🇱' },
  { name: 'Portugal', flag: '🇵🇹' }, { name: 'Romania', flag: '🇷🇴' },
  { name: 'Russia', flag: '🇷🇺' }, { name: 'Saudi Arabia', flag: '🇸🇦' },
  { name: 'Senegal', flag: '🇸🇳' }, { name: 'Serbia', flag: '🇷🇸' },
  { name: 'Singapore', flag: '🇸🇬' }, { name: 'South Africa', flag: '🇿🇦' },
  { name: 'South Korea', flag: '🇰🇷' }, { name: 'Spain', flag: '🇪🇸' },
  { name: 'Sri Lanka', flag: '🇱🇰' }, { name: 'Sudan', flag: '🇸🇩' },
  { name: 'Sweden', flag: '🇸🇪' }, { name: 'Switzerland', flag: '🇨🇭' },
  { name: 'Tanzania', flag: '🇹🇿' }, { name: 'Thailand', flag: '🇹🇭' },
  { name: 'Turkey', flag: '🇹🇷' }, { name: 'Uganda', flag: '🇺🇬' },
  { name: 'Ukraine', flag: '🇺🇦' }, { name: 'United Arab Emirates', flag: '🇦🇪' },
  { name: 'United Kingdom', flag: '🇬🇧' }, { name: 'United States', flag: '🇺🇸' },
  { name: 'Uruguay', flag: '🇺🇾' }, { name: 'Venezuela', flag: '🇻🇪' },
  { name: 'Vietnam', flag: '🇻🇳' }, { name: 'Zimbabwe', flag: '🇿🇼' },
];

interface IdentityModalProps {
  onSave: (name: string, country: string) => void;
  onClose: () => void;
  initialName?: string;
  initialCountry?: string;
}

const IdentityModal = ({ onSave, onClose, initialName = '', initialCountry = '' }: IdentityModalProps) => {
  const [name, setName] = useState(initialName);
  const [country, setCountry] = useState(initialCountry);
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selected = COUNTRIES.find(c => c.name === country);
  const filtered = COUNTRIES.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  // close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSave = () => {
    onSave(name.trim(), country);
    onClose();
  };

  return (
    <div
      className="absolute inset-0 z-50 flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.35)', borderRadius: 'inherit' }}
      onClick={(e) => { e.stopPropagation(); onClose(); }}
    >
      <div
        className="bg-white rounded-2xl shadow-xl px-5 py-5 w-[82%] flex flex-col gap-3"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold text-gray-700" style={{ fontFamily: "'Lora', serif" }}>
            Who's reflecting? 🌍
          </span>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 text-lg leading-none">×</button>
        </div>

        {/* Name */}
        <div className="flex flex-col gap-1">
          <label className="text-[9px] uppercase tracking-widest text-amber-400 font-semibold">
            Name <span className="text-gray-300 normal-case tracking-normal">(optional)</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Anonymous"
            className="border border-gray-200 rounded-lg px-3 py-1.5 text-[11px] text-gray-700 outline-none focus:border-amber-300 placeholder:text-gray-300"
            style={{ fontFamily: "'Lora', serif" }}
          />
        </div>

        {/* Country picker */}
        <div className="flex flex-col gap-1" ref={dropdownRef}>
          <label className="text-[9px] uppercase tracking-widest text-amber-400 font-semibold">Country</label>

          {/* Trigger */}
          <button
            type="button"
            onClick={() => setOpen(o => !o)}
            className="border border-gray-200 rounded-lg px-3 py-1.5 text-[11px] text-gray-700 bg-white flex items-center gap-2 text-left focus:outline-none focus:border-amber-300"
            style={{ fontFamily: "'Lora', serif" }}
          >
            {selected ? (
              <><span className="text-base leading-none">{selected.flag}</span><span>{selected.name}</span></>
            ) : (
              <span className="text-gray-300">Select your country</span>
            )}
            <span className="ml-auto text-gray-300 text-[10px]">▾</span>
          </button>

          {/* Dropdown */}
          {open && (
            <div className="relative z-50">
              <div className="absolute top-1 left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden flex flex-col" style={{ maxHeight: '160px' }}>
                <div className="px-2 pt-2 pb-1 border-b border-gray-100">
                  <input
                    autoFocus
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search..."
                    className="w-full text-[10px] px-2 py-1 rounded-md border border-gray-200 outline-none focus:border-amber-300 placeholder:text-gray-300"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
                <div className="overflow-y-auto flex-1">
                  {filtered.length === 0 && (
                    <p className="text-[10px] text-gray-300 text-center py-3">No results</p>
                  )}
                  {filtered.map(c => (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => { setCountry(c.name); setSearch(''); setOpen(false); }}
                      className={`w-full flex items-center gap-2 px-3 py-1.5 text-[11px] text-left hover:bg-amber-50 transition-colors ${country === c.name ? 'bg-amber-50 text-amber-600' : 'text-gray-700'}`}
                      style={{ fontFamily: "'Lora', serif" }}
                    >
                      <span className="text-base leading-none">{c.flag}</span>
                      <span>{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Save */}
        <button
          onClick={handleSave}
          className="mt-1 w-full py-2 rounded-xl bg-amber-400 hover:bg-amber-500 text-white text-[11px] font-semibold transition-colors active:scale-95"
          style={{ fontFamily: "'Gloria Hallelujah', cursive" }}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default IdentityModal;
