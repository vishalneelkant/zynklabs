import { ReactNode } from 'react';

interface SolutionCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  color: string;
  index: number;
}

const SolutionCard = ({ icon, title, description, color }: SolutionCardProps) => {
  // Convert hex to RGB for glow effect
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
      : '60, 111, 255';
  };

  const rgb = hexToRgb(color);

  return (
    <div 
      className="solution-card group cursor-pointer"
      style={{ 
        '--solution-color': color,
        '--solution-color-rgb': rgb,
        '--glow-color-30': `rgba(${rgb}, 0.3)`,
        '--glow-color-15': `rgba(${rgb}, 0.15)`,
      } as React.CSSProperties}
    >
      <div className="solution-card-inner">
        <div className="solution-icon-wrapper">
          {icon}
        </div>
        <h3 className="solution-title">{title}</h3>
        <p className="solution-description">{description}</p>
      </div>
    </div>
  );
};

export default SolutionCard;

