import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out',
      });
      gsap.from(subtitleRef.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.3,
        ease: 'power3.out',
      });
      gsap.from(ctaRef.current, {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 0.6,
        ease: 'power3.out',
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="min-h-screen flex items-center justify-center pt-20 px-6 relative overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-electric-blue/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-purple/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto text-center relative z-10">
        <h1
          ref={titleRef}
          className="text-7xl md:text-9xl lg:text-[12rem] font-black mb-8 text-gradient leading-[0.9] tracking-tight"
        >
          AI Automation
          <br />
          <span className="text-white glow-text">Reimagined</span>
        </h1>
        <p
          ref={subtitleRef}
          className="text-xl md:text-2xl lg:text-3xl text-gray-300 mb-16 max-w-4xl mx-auto leading-relaxed font-light tracking-wide"
        >
          Transform your business with cutting-edge AI automation solutions.
          <br className="hidden md:block" />
          <span className="text-gradient font-medium">Premium. Powerful. Precise.</span>
        </p>
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Link
            to="/book-demo"
            className="btn-premium relative z-10"
          >
            <span className="relative z-10">Book a Demo</span>
          </Link>
          <Link
            to="/solutions"
            className="btn-outline-premium relative z-10"
          >
            <span className="relative z-10">Explore Solutions</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

