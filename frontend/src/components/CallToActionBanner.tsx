import { Link } from 'react-router-dom';

const CallToActionBanner = () => {
  return (
    <section className="py-32 px-6 bg-gradient-to-r from-electric-blue/15 via-neon-purple/15 to-electric-blue/15 backdrop-blur-sm relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-electric-blue/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-neon-purple/30 rounded-full blur-3xl"></div>
      </div>
      <div className="container mx-auto text-center relative z-10 max-w-5xl">
        <h2 className="text-6xl md:text-7xl lg:text-8xl font-black mb-8 text-white tracking-tight">
          Ready to Transform Your Business?
        </h2>
        <p className="text-xl md:text-2xl text-gray-300 mb-16 max-w-3xl mx-auto leading-relaxed font-light">
          Join hundreds of companies already using Zynk Labs to automate their operations.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Link
            to="/book-demo"
            className="btn-premium relative z-10"
          >
            <span className="relative z-10">Book a Demo</span>
          </Link>
          <Link
            to="/contact"
            className="btn-outline-premium relative z-10"
          >
            <span className="relative z-10">Get in Touch</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CallToActionBanner;

