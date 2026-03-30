import bgImage from '../assets/reflection of tree on a lake.png';
import secondPageLogo from '../assets/ v3_second_page_logo.png';
import descriptionImage from '../assets/1stPageImage.png';
interface SecondPageProps {
  coverColor: string;
  borderColor: string;
  borderRadius?: string;
}

const SecondPage = ({ borderRadius = '0.75rem' }: SecondPageProps) => (
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
    <div className="relative z-10 flex justify-center pt-4 pb-0.5 flex-shrink-0">
      <img src={secondPageLogo} alt="logo" style={{ height: '42px', objectFit: 'contain' }} />
    </div>

    {/* Reflection Scene Image from Page 1 */}
    <div className="relative z-10 flex justify-center px-16 mt-1 flex-shrink-0">
      <img src={descriptionImage} alt="Reflection" className="w-[85%] h-auto object-contain" />
    </div>

    {/* Description container */}
    <div className="relative z-10 flex-1 flex items-center justify-center px-10">
      <p 
        className="text-[11px] leading-[1.8] text-gray-500 italic font-medium text-center" 
        style={{ fontFamily: "'Lora', serif" }}
      >
        In today’s fast-evolving digital world, artificial intelligence (AI) touches every aspect of our lives, from productivity to personal well-being and mental health. This reflective activity invites you to explore how AI impacts your life, your mental health, and your journey toward mindful living. Your honest reflections will contribute to a shared perspective on AI's effects and its intersection with the well-being of individuals.
      </p>
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
