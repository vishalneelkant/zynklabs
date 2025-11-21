import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FeatureCard from './FeatureCard';

gsap.registerPlugin(ScrollTrigger);

const FeatureCards = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.feature-card', {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const features = [
    {
      title: 'Intelligent Automation',
      description: 'Leverage AI to automate complex business processes with precision and efficiency.',
      icon: '🤖',
    },
    {
      title: 'Scalable Solutions',
      description: 'Build systems that grow with your business, from startup to enterprise scale.',
      icon: '📈',
    },
    {
      title: 'Real-time Analytics',
      description: 'Get instant insights into your operations with advanced analytics and reporting.',
      icon: '📊',
    },
    {
      title: 'Seamless Integration',
      description: 'Connect with your existing tools and workflows without disruption.',
      icon: '🔗',
    },
  ];

  return (
    <section ref={sectionRef} className="py-32 px-6">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-6xl md:text-7xl lg:text-8xl font-black text-center mb-20 text-gradient tracking-tight">
          Powerful Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <FeatureCard {...feature} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureCards;

