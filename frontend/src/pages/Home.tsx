import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import TextScroller from '../components/TextScroller';
import FeatureCards from '../components/FeatureCards';
import CinematicVisualSection from '../components/CinematicVisualSection';
import CaseStudies from '../components/CaseStudies';
import WhyZynkGrid from '../components/WhyZynkGrid';
import ProcessFlow from '../components/ProcessFlow';
import CallToActionBanner from '../components/CallToActionBanner';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="min-h-screen bg-dark-bg">
      <Header />
      <HeroSection />
      <TextScroller />
      <FeatureCards />
      <CinematicVisualSection />
      <CaseStudies />
      <WhyZynkGrid />
      <ProcessFlow />
      <CallToActionBanner />
      <Footer />
    </div>
  );
};

export default Home;

