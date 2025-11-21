import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CaseStudyCard from './CaseStudyCard';

gsap.registerPlugin(ScrollTrigger);

const CaseStudies = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.case-study-card', {
        opacity: 0,
        x: 100,
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

  const caseStudies = [
    {
      title: 'E-commerce Automation',
      company: 'TechCorp Inc.',
      description: 'Automated order processing and inventory management, reducing manual work by 80%.',
      result: '300% ROI in 6 months',
    },
    {
      title: 'Customer Support AI',
      company: 'ServicePro',
      description: 'Implemented AI-powered chatbot handling 90% of customer inquiries automatically.',
      result: '50% cost reduction',
    },
    {
      title: 'Data Processing Pipeline',
      company: 'DataFlow Systems',
      description: 'Built intelligent data processing system handling millions of records daily.',
      result: '10x faster processing',
    },
  ];

  return (
    <section ref={sectionRef} className="py-32 px-6">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-6xl md:text-7xl lg:text-8xl font-black text-center mb-20 text-gradient tracking-tight">
          Success Stories
        </h2>
        <div
          ref={containerRef}
          className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {caseStudies.map((study, index) => (
            <div key={index} className="case-study-card">
              <CaseStudyCard {...study} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;

