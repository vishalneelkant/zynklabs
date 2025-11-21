interface CaseStudyCardProps {
  title: string;
  company: string;
  description: string;
  result: string;
}

const CaseStudyCard = ({ title, company, description, result }: CaseStudyCardProps) => {
  return (
    <div className="glossy-card p-10 min-w-[400px] md:min-w-[550px] group cursor-pointer h-full">
      <div className="text-sm text-electric-blue mb-3 font-bold tracking-wider uppercase">{company}</div>
      <h3 className="text-3xl font-bold mb-5 text-white group-hover:text-electric-blue transition-colors">{title}</h3>
      <p className="text-gray-400 mb-8 leading-relaxed text-lg group-hover:text-gray-300 transition-colors">{description}</p>
      <div className="pt-6 border-t border-white/10 group-hover:border-electric-blue/30 transition-colors">
        <div className="text-sm text-gray-500 mb-2 font-semibold uppercase tracking-wide">Result</div>
        <div className="text-2xl font-black text-neon-purple glow-purple-text">{result}</div>
      </div>
    </div>
  );
};

export default CaseStudyCard;

