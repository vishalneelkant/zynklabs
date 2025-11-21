interface FeatureCardProps {
  title: string;
  description: string;
  icon?: string;
}

const FeatureCard = ({ title, description, icon }: FeatureCardProps) => {
  return (
    <div className="glossy-card p-10 h-full group cursor-pointer">
      {icon && (
        <div className="text-5xl mb-6 text-electric-blue transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
          {icon}
        </div>
      )}
      <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-electric-blue transition-colors">
        {title}
      </h3>
      <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
        {description}
      </p>
      <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="w-12 h-0.5 bg-gradient-to-r from-electric-blue to-neon-purple"></div>
      </div>
    </div>
  );
};

export default FeatureCard;

