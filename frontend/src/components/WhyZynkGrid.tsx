import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const WhyZynkGrid = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.why-item', {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const reasons = [
    { number: '01', title: 'Expert Team', description: 'World-class AI engineers and automation specialists' },
    { number: '02', title: 'Proven Track Record', description: 'Successfully deployed 500+ automation solutions' },
    { number: '03', title: 'Cutting-Edge Tech', description: 'Latest AI models and automation frameworks' },
    { number: '04', title: '24/7 Support', description: 'Round-the-clock assistance when you need it' },
  ];

  return (
    <section ref={sectionRef} className="py-32 px-6 bg-dark-surface/50 backdrop-blur-sm">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-6xl md:text-7xl lg:text-8xl font-black text-center mb-20 text-gradient tracking-tight">
          Why Zynk Labs
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {reasons.map((reason, index) => (
            <div key={index} className="why-item glossy-card p-10 group cursor-pointer">
              <div className="text-7xl font-black text-electric-blue/30 mb-6 group-hover:text-electric-blue/50 transition-colors">
                {reason.number}
              </div>
              <h3 className="text-3xl font-bold mb-4 text-white group-hover:text-electric-blue transition-colors">
                {reason.title}
              </h3>
              <p className="text-gray-400 text-lg leading-relaxed group-hover:text-gray-300 transition-colors">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyZynkGrid;

