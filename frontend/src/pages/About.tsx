import Header from '../components/Header';
import Footer from '../components/Footer';

const About = () => {
  return (
    <div className="min-h-screen bg-dark-bg">
      <Header />
      <main className="container mx-auto px-6 py-24">
        <h1 className="text-6xl font-bold mb-8 text-gradient">About Us</h1>
        <p className="text-xl text-gray-400">About Zynk Labs coming soon...</p>
      </main>
      <Footer />
    </div>
  );
};

export default About;

