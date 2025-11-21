import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark-surface border-t border-white/10 py-12 px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold text-gradient mb-4">Zynk Labs</h3>
            <p className="text-gray-400">
              Premium AI automation solutions for modern businesses.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-400 hover:text-white transition">About</Link></li>
              <li><Link to="/solutions" className="text-gray-400 hover:text-white transition">Solutions</Link></li>
              <li><Link to="/case-studies" className="text-gray-400 hover:text-white transition">Case Studies</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition">Contact</Link></li>
              <li><Link to="/book-demo" className="text-gray-400 hover:text-white transition">Book Demo</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-electric-blue transition">LinkedIn</a>
              <a href="#" className="text-gray-400 hover:text-electric-blue transition">Twitter</a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Zynk Labs. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

