import WhyPage from './WhyPage';

interface ThirdPageProps {
  coverColor: string;
  borderColor: string;
  borderRadius?: string;
}

const ThirdPage = ({ borderRadius = '0.75rem', coverColor, borderColor }: ThirdPageProps) => {
  return (
    <div 
      className="absolute inset-0 bg-white overflow-hidden"
      style={{ borderRadius }}
    >
      <WhyPage borderRadius={borderRadius} coverColor={coverColor} borderColor={borderColor} />
    </div>
  );
};

export default ThirdPage;
