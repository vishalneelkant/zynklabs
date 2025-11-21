import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SolutionCard from '../components/SolutionCard';
import {
  VisionQualityIcon,
  PredictiveMaintenanceIcon,
  WorkflowAutomationIcon,
  ProductionIntelligenceIcon,
  SmartInventoryIcon,
  AIAssistantsIcon,
  CustomAISystemsIcon,
} from '../components/SolutionIcons';

gsap.registerPlugin(ScrollTrigger);

const Solutions = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.solution-card', {
        opacity: 0,
        y: 50,
        scale: 0.95,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const solutions = [
    {
      icon: <VisionQualityIcon />,
      title: 'Vision Quality AI',
      description: 'Detect defects before they cost money. Automated quality inspection using AI vision systems.',
      color: '#3C6FFF',
    },
    {
      icon: <PredictiveMaintenanceIcon />,
      title: 'Predictive Maintenance',
      description: 'Stop breakdowns before they happen. AI models that predict machine failures in advance.',
      color: '#10B981',
    },
    {
      icon: <WorkflowAutomationIcon />,
      title: 'Workflow Automation',
      description: 'Make processes run on autopilot. LLM-powered agents and automated workflows that save hours daily.',
      color: '#F97316',
    },
    {
      icon: <ProductionIntelligenceIcon />,
      title: 'Production Intelligence',
      description: 'Actionable insights from your factory floor. AI-driven analytics for cycle time, scrap rate, delays, OEE.',
      color: '#A66BFF',
    },
    {
      icon: <SmartInventoryIcon />,
      title: 'Smart Inventory & Demand Forecasting',
      description: 'Never overstock or run out again. AI predicts material usage, demand, and reorder quantities.',
      color: '#FBBF24',
    },
    {
      icon: <AIAssistantsIcon />,
      title: 'AI Assistants & Agents for Industry',
      description: 'Your 24/7 industrial co-pilot. Agents that answer queries, generate reports, and take actions.',
      color: '#92400E',
    },
    {
      icon: <CustomAISystemsIcon />,
      title: 'Custom AI Systems',
      description: 'Tailored AI architectures built for your business. High-ticket clients LOVE this — it positions you as a serious engineering company.',
      color: '#A66BFF',
    },
  ];

  return (
    <div className="min-h-screen bg-dark-bg">
      <Header />
      <main className="pt-20">
        <section ref={sectionRef} className="py-32 px-6 md:px-24">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-20">
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-6 text-gradient tracking-tight">
                Our Solutions
              </h1>
              <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                Premium AI automation solutions designed to transform your industrial operations.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {solutions.map((solution, index) => (
                <SolutionCard
                  key={index}
                  icon={solution.icon}
                  title={solution.title}
                  description={solution.description}
                  color={solution.color}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Solutions;
