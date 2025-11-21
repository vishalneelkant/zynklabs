import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

const Header = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/solutions', label: 'Solutions' },
    { path: '/case-studies', label: 'Case Studies' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-dark-bg/90 backdrop-blur-xl border-b border-white/10 shadow-lg">
      <nav className="container mx-auto px-6 py-5 flex items-center justify-between">
        <Link to="/" className="text-2xl font-black text-gradient tracking-tight hover:scale-105 transition-transform">
          Zynk Labs
        </Link>
        
        <div className="hidden md:flex items-center space-x-10">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-sm font-semibold transition-all relative group ${
                location.pathname === item.path
                  ? 'text-electric-blue'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {item.label}
              <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-electric-blue transition-all group-hover:w-full ${
                location.pathname === item.path ? 'w-full' : ''
              }`}></span>
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <Link
            to="/book-demo"
            className="px-6 py-2.5 bg-electric-blue text-white rounded-lg font-semibold hover:shadow-glow-blue transition-all hover:scale-105 relative overflow-hidden group"
          >
            <span className="relative z-10">Book Demo</span>
            <span className="absolute inset-0 bg-gradient-to-r from-electric-blue to-neon-purple opacity-0 group-hover:opacity-100 transition-opacity"></span>
          </Link>
        </div>

        <button
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>

      {isMenuOpen && (
        <div className="md:hidden bg-dark-surface border-t border-white/10">
          <div className="container mx-auto px-6 py-4 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="block text-gray-400 hover:text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/book-demo"
              className="block px-6 py-2.5 bg-electric-blue text-white rounded-lg font-semibold text-center hover:shadow-glow-blue transition-all"
              onClick={() => setIsMenuOpen(false)}
            >
              Book Demo
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

