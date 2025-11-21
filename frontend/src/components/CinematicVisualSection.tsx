import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CinematicVisualSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(visualRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 1.5,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 px-6 relative overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        <div
          ref={visualRef}
          className="relative h-[700px] rounded-3xl overflow-hidden glossy-card group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-electric-blue/30 via-neon-purple/30 to-electric-blue/30 flex items-center justify-center">
            {/* Animated background elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-20">
              <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-electric-blue rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-neon-purple rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>
            <div className="text-center p-12 relative z-10">
              <h2 className="text-6xl md:text-8xl lg:text-9xl font-black mb-8 text-white tracking-tight">
                The Future of
                <br />
                <span className="text-gradient glow-text">Automation</span>
              </h2>
              <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed font-light">
                Experience the next generation of AI-powered automation
                that transforms how businesses operate.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CinematicVisualSection;

