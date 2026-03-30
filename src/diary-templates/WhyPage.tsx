import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import rough from 'roughjs';

/* ──────────────────────── SVG filter definitions ──────────────────────── */
const WatercolorFilters = () => (
  <svg width="0" height="0" style={{ position: 'absolute' }}>
    <defs>
      {/* Paper / watercolor texture */}
      <filter id="wc-paper" x="-10%" y="-10%" width="120%" height="120%">
        <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="4" seed="2" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="6" xChannelSelector="R" yChannelSelector="G" />
      </filter>

      {/* Soft glow */}
      <filter id="wc-glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      {/* Ink bleed for hand-drawn look */}
      <filter id="wc-ink" x="-5%" y="-5%" width="110%" height="110%">
        <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="3" seed="5" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" />
      </filter>
    </defs>
  </svg>
);

/* ──────────────────────── Rough.js hand-drawn shapes ──────────────────── */
interface RoughShapeProps {
  width: number;
  height: number;
  draw: (rc: ReturnType<typeof rough.svg>, svg: SVGSVGElement) => void;
  className?: string;
  style?: React.CSSProperties;
}

const RoughShape = ({ width, height, draw, className, style }: RoughShapeProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const drawnRef = useRef(false);

  useEffect(() => {
    if (!svgRef.current || drawnRef.current) return;
    drawnRef.current = true;
    const rc = rough.svg(svgRef.current);
    draw(rc, svgRef.current);
  }, [draw]);

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      style={style}
    />
  );
};

/* ──────────────────────── Floating chaos icons ─────────────────────────── */
const chaosIcons = ['📱', '💬', '🔔', '📧', '🤖', '⚡', '📊', '🔗', '💻', '🧠', '📡', '⏰'];

const FloatingIcon = ({ emoji, delay, x, y }: { emoji: string; delay: number; x: number; y: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      opacity: [0, 0.7, 0.5, 0.7, 0.5],
      scale: [0, 1, 0.9, 1.05, 0.95],
      x: [0, Math.random() * 20 - 10, Math.random() * -15, Math.random() * 10],
      y: [0, Math.random() * -20, Math.random() * 15, Math.random() * -10],
      rotate: [0, Math.random() * 30 - 15, Math.random() * -20, Math.random() * 15],
    }}
    transition={{
      delay,
      duration: 4 + Math.random() * 3,
      repeat: Infinity,
      repeatType: 'reverse',
      ease: 'easeInOut',
    }}
    className="absolute text-xl md:text-2xl select-none pointer-events-none"
    style={{ left: `${x}%`, top: `${y}%` }}
  >
    {emoji}
  </motion.div>
);

/* ──────────────────────── Calm side floating elements ──────────────────── */
const CalmBubble = ({ delay, x, y, size }: { delay: number; x: number; y: number; size: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      opacity: [0, 0.15, 0.25, 0.15],
      scale: [0.8, 1, 1.05, 1],
      y: [0, -8, -3, -8],
    }}
    transition={{
      delay,
      duration: 5 + Math.random() * 3,
      repeat: Infinity,
      repeatType: 'reverse',
      ease: 'easeInOut',
    }}
    className="absolute rounded-full pointer-events-none"
    style={{
      left: `${x}%`,
      top: `${y}%`,
      width: size,
      height: size,
      background: 'radial-gradient(circle, rgba(139,203,209,0.5) 0%, rgba(253,242,187,0.2) 70%, transparent 100%)',
    }}
  />
);

/* ──────────────────────── Person silhouette (SVG) ──────────────────────── */
const PersonOverwhelmed = () => (
  <svg viewBox="0 0 80 100" width="60" height="75" className="opacity-70" filter="url(#wc-ink)">
    {/* Head */}
    <circle cx="40" cy="22" r="12" fill="#8a7a6a" opacity="0.7" />
    {/* Body — hunched */}
    <path d="M28,34 Q30,55 25,70 Q22,80 30,85 L50,85 Q58,80 55,70 Q50,55 52,34" fill="#8a7a6a" opacity="0.6" />
    {/* Hands on head */}
    <path d="M25,30 Q20,25 22,18" stroke="#8a7a6a" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.6" />
    <path d="M55,30 Q60,25 58,18" stroke="#8a7a6a" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.6" />
  </svg>
);

const PersonPeaceful = () => (
  <svg viewBox="0 0 100 120" width="70" height="85" className="opacity-70" filter="url(#wc-ink)">
    {/* Head */}
    <circle cx="50" cy="20" r="12" fill="#5a6a5a" opacity="0.7" />
    {/* Body — upright, relaxed */}
    <path d="M38,32 Q36,55 38,75 L62,75 Q64,55 62,32" fill="#5a6a5a" opacity="0.5" />
    {/* Arm writing */}
    <path d="M62,45 Q72,55 68,65 Q66,70 60,72" stroke="#5a6a5a" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.5" />
    {/* Pen */}
    <line x1="60" y1="72" x2="55" y2="80" stroke="#c8a06a" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
    {/* Table/desk hint */}
    <line x1="25" y1="78" x2="85" y2="78" stroke="#c8b898" strokeWidth="2" opacity="0.3" />
  </svg>
);

/* ──────────────────────── Glowing diary (center bridge) ────────────────── */
const GlowingDiary = () => (
  <motion.div
    animate={{
      boxShadow: [
        '0 0 20px rgba(242,181,68,0.3), 0 0 40px rgba(242,181,68,0.1)',
        '0 0 30px rgba(242,181,68,0.5), 0 0 60px rgba(242,181,68,0.2)',
        '0 0 20px rgba(242,181,68,0.3), 0 0 40px rgba(242,181,68,0.1)',
      ],
    }}
    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
    className="relative z-20"
  >
    <svg viewBox="0 0 60 80" width="48" height="64" filter="url(#wc-ink)">
      {/* Back cover */}
      <rect x="6" y="4" width="48" height="72" rx="3" fill="#c8a06a" opacity="0.4" />
      {/* Front cover */}
      <rect x="4" y="2" width="48" height="72" rx="3" fill="#d4a94a" opacity="0.8" />
      {/* Spine */}
      <rect x="4" y="2" width="6" height="72" rx="2" fill="#b8903a" opacity="0.6" />
      {/* Lines on cover */}
      <line x1="16" y1="20" x2="44" y2="20" stroke="#b8903a" strokeWidth="1" opacity="0.5" />
      <line x1="16" y1="28" x2="44" y2="28" stroke="#b8903a" strokeWidth="1" opacity="0.5" />
      <line x1="16" y1="36" x2="38" y2="36" stroke="#b8903a" strokeWidth="1" opacity="0.5" />
      {/* Heart / reflection symbol */}
      <text x="30" y="55" textAnchor="middle" fontSize="14" opacity="0.6">📖</text>
    </svg>
  </motion.div>
);

/* ──────────────────────── Main WHY Page component ─────────────────────── */
interface WhyPageProps {
  coverColor?: string;
  borderColor?: string;
  borderRadius?: string;
}

const WhyPage = ({ coverColor = '#557eb5', borderColor = '#3F5B7B', borderRadius = '0.75rem' }: WhyPageProps) => {
  const [entered, setEntered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setEntered(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative overflow-hidden flex flex-col"
      style={{
        borderRadius,
        background: 'linear-gradient(135deg, #fdf8ef 0%, #f0ebe0 50%, #e8e3d8 100%)',
        border: `3px solid ${borderColor}`,
      }}
    >
      <WatercolorFilters />

      {/* ─── Background texture ─── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background: `
            repeating-linear-gradient(0deg, transparent, transparent 18px, rgba(200,184,152,0.15) 18px, rgba(200,184,152,0.15) 19px),
            repeating-linear-gradient(90deg, transparent, transparent 18px, rgba(200,184,152,0.08) 18px, rgba(200,184,152,0.08) 19px)
          `,
        }}
      />

      {/* ─── Title ─── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-center pt-5 pb-2 z-10 relative"
      >
        <h2
          className="text-[18px] font-bold tracking-[3px]"
          style={{ fontFamily: "'Gloria Hallelujah', cursive", color: '#557eb5' }}
        >
          WHY
        </h2>
        <p
          className="text-[8px] mt-1 tracking-[1.5px] uppercase"
          style={{ fontFamily: "'Lora', serif", color: '#b8a898' }}
        >
          this world needs a reflection space
        </p>
      </motion.div>

      {/* ─── Split scene container ─── */}
      <div className="flex-1 flex relative z-10">

        {/* ─── LEFT: Digital Chaos ─── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="w-1/2 relative overflow-hidden"
          style={{
            background: 'linear-gradient(160deg, rgba(80,100,140,0.08) 0%, rgba(60,80,120,0.15) 100%)',
          }}
        >
          {/* Swirl background */}
          <RoughShape
            width={180}
            height={280}
            className="absolute inset-0 w-full h-full opacity-20"
            draw={(rc, svg) => {
              // Chaotic spiral lines
              for (let i = 0; i < 6; i++) {
                const cx = 90 + Math.random() * 40 - 20;
                const cy = 140 + Math.random() * 60 - 30;
                const r = 30 + i * 18;
                const node = rc.arc(cx, cy, r, r, 0, Math.PI * (1.2 + Math.random()), false, {
                  stroke: '#6682a8',
                  strokeWidth: 0.8,
                  roughness: 2.5,
                });
                svg.appendChild(node);
              }
            }}
          />

          {/* Floating chaos icons */}
          {chaosIcons.map((emoji, i) => (
            <FloatingIcon
              key={i}
              emoji={emoji}
              delay={0.8 + i * 0.15}
              x={10 + (i % 3) * 30 + Math.random() * 10}
              y={8 + Math.floor(i / 3) * 22 + Math.random() * 8}
            />
          ))}

          {/* Overwhelmed person */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5, duration: 1, type: 'spring' }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2"
          >
            <PersonOverwhelmed />
          </motion.div>

          {/* Label */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 2, duration: 1 }}
            className="absolute bottom-1 left-0 right-0 text-center text-[7px] tracking-[1px]"
            style={{ fontFamily: "'Gloria Hallelujah', cursive", color: '#6682a8' }}
          >
            noise
          </motion.p>
        </motion.div>

        {/* ─── CENTER: Divider + Glowing Diary ─── */}
        <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-[2px] z-20 flex flex-col items-center justify-center">
          {/* Gradient line */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to bottom, transparent, rgba(212,169,74,0.4), rgba(212,169,74,0.6), rgba(212,169,74,0.4), transparent)',
            }}
          />
          {/* Diary */}
          <GlowingDiary />
        </div>

        {/* ─── RIGHT: Peaceful Reflection ─── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 1 }}
          className="w-1/2 relative overflow-hidden"
          style={{
            background: 'linear-gradient(160deg, rgba(253,242,187,0.15) 0%, rgba(139,203,209,0.1) 100%)',
          }}
        >
          {/* Soft watercolor blobs */}
          <CalmBubble delay={1} x={20} y={15} size={80} />
          <CalmBubble delay={1.5} x={55} y={30} size={60} />
          <CalmBubble delay={2} x={35} y={60} size={70} />
          <CalmBubble delay={2.5} x={65} y={10} size={50} />

          {/* Thought bubbles with question marks */}
          {['?', '?', '?'].map((q, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: [0, 0.5, 0.3, 0.5],
                y: [10, -5, 0, -8],
              }}
              transition={{
                delay: 2 + i * 0.5,
                duration: 4,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
              className="absolute flex items-center justify-center"
              style={{
                left: `${30 + i * 20}%`,
                top: `${12 + i * 12}%`,
                width: 28 + i * 4,
                height: 28 + i * 4,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.5)',
                border: '1px solid rgba(139,203,209,0.3)',
                fontFamily: "'Gloria Hallelujah', cursive",
                fontSize: 12 + i * 2,
                color: '#8bcbd1',
              }}
            >
              {q}
            </motion.div>
          ))}

          {/* Peaceful person writing */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.8, duration: 1, type: 'spring' }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2"
          >
            <PersonPeaceful />
          </motion.div>

          {/* Small leaves */}
          {['🌿', '🍃', '🌱'].map((leaf, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.25, rotate: [0, 10, -5, 10] }}
              transition={{ delay: 2.5 + i * 0.3, duration: 6, repeat: Infinity, repeatType: 'reverse' }}
              className="absolute text-sm select-none pointer-events-none"
              style={{
                right: `${10 + i * 25}%`,
                top: `${50 + i * 15}%`,
              }}
            >
              {leaf}
            </motion.span>
          ))}

          {/* Label */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 2, duration: 1 }}
            className="absolute bottom-1 left-0 right-0 text-center text-[7px] tracking-[1px]"
            style={{ fontFamily: "'Gloria Hallelujah', cursive", color: '#6a9a6a' }}
          >
            clarity
          </motion.p>
        </motion.div>
      </div>

      {/* ─── Bottom message ─── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="text-center py-3 z-10 relative"
      >
        <p
          className="text-[9px] leading-[2] tracking-[1px]"
          style={{ fontFamily: "'Gloria Hallelujah', cursive", color: '#8a7a6a' }}
        >
          the diary is the bridge
        </p>
      </motion.div>
    </div>
  );
};

export default WhyPage;
