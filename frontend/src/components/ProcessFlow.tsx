import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ProcessFlow = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.process-step', {
        opacity: 0,
        scale: 0.8,
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

  const steps = [
    { number: 1, title: 'Discovery', description: 'We analyze your business needs and challenges' },
    { number: 2, title: 'Design', description: 'Custom automation solution designed for your workflow' },
    { number: 3, title: 'Develop', description: 'Build and test the automation system' },
    { number: 4, title: 'Deploy', description: 'Launch and monitor the solution in production' },
  ];

  return (
    <section ref={sectionRef} className="py-32 px-6">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-6xl md:text-7xl lg:text-8xl font-black text-center mb-20 text-gradient tracking-tight">
          Our Process
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {steps.map((step, index) => (
            <div key={index} className="process-step relative group">
              <div className="glossy-card p-10 text-center h-full">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-electric-blue to-neon-purple flex items-center justify-center text-3xl font-black text-white mx-auto mb-8 shadow-glow-blue group-hover:scale-110 transition-transform">
                  {step.number}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-electric-blue transition-colors">
                  {step.title}
                </h3>
                <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                  {step.description}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-5 w-10 h-1 bg-gradient-to-r from-electric-blue to-neon-purple transform -translate-y-1/2 opacity-50 group-hover:opacity-100 transition-opacity" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessFlow;

