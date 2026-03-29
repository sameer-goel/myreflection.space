const SpiralBinding = () => (
  <div className="absolute left-[-15px] top-4 bottom-4 w-[30px] flex flex-col justify-between py-[2%] z-50 pointer-events-none">
    {[...Array(14)].map((_, i) => (
      <div key={i} className="w-[30px] h-[12px] bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-500 rounded-full shadow-[0_4px_4px_rgba(0,0,0,0.4),inset_0_-2px_4px_rgba(255,255,255,0.6)] border border-amber-600/50" />
    ))}
  </div>
);

const OpenSpiralBinding = () => (
  <div className="absolute left-1/2 top-4 bottom-4 w-[36px] -translate-x-1/2 flex flex-col justify-between py-[2%] z-30 pointer-events-none">
    {[...Array(14)].map((_, i) => (
      <div key={i} className="w-full h-[12px] bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-500 rounded-full shadow-[0_4px_4px_rgba(0,0,0,0.4),inset_0_-2px_4px_rgba(255,255,255,0.6)] border border-amber-600/50" />
    ))}
  </div>
);

export { SpiralBinding, OpenSpiralBinding };
