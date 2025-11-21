import { useState } from 'react';
import Header from '../components/Header';
import BookDemoModal from '../components/BookDemoModal';
import Footer from '../components/Footer';

const BookDemo = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  return (
    <div className="min-h-screen bg-dark-bg">
      <Header />
      <main className="container mx-auto px-6 py-24">
        <h1 className="text-6xl font-bold mb-8 text-gradient">Book a Demo</h1>
        <p className="text-xl text-gray-400 mb-8">
          Schedule a personalized demo to see how Zynk Labs can transform your business.
        </p>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-8 py-4 bg-electric-blue text-white rounded-lg font-semibold hover:bg-electric-blue/80 transition"
        >
          Open Demo Booking Form
        </button>
      </main>
      {isModalOpen && <BookDemoModal onClose={() => setIsModalOpen(false)} />}
      <Footer />
    </div>
  );
};

export default BookDemo;

