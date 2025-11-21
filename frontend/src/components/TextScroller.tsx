import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const TextScroller = () => {
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollerRef.current) return;

    const scroller = scrollerRef.current;
    const text = scroller.querySelector('.scroller-text');
    if (!text) return;

    const ctx = gsap.context(() => {
      gsap.to(text, {
        x: '-50%',
        duration: 20,
        repeat: -1,
        ease: 'none',
      });
    }, scroller);

    return () => ctx.revert();
  }, []);

  const text = 'AI Automation • Machine Learning • Process Optimization • Intelligent Systems • ';

  return (
    <section className="py-20 overflow-hidden bg-dark-surface/50 border-y border-white/10 backdrop-blur-sm">
      <div ref={scrollerRef} className="relative">
        <div className="scroller-text flex whitespace-nowrap">
          <span className="text-5xl md:text-7xl lg:text-8xl font-black text-gradient mr-12 tracking-tight">
            {text}
          </span>
          <span className="text-5xl md:text-7xl lg:text-8xl font-black text-gradient mr-12 tracking-tight">
            {text}
          </span>
        </div>
      </div>
    </section>
  );
};

export default TextScroller;

