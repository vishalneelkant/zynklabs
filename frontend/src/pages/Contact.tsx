import Header from '../components/Header';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';

const Contact = () => {
  return (
    <div className="min-h-screen bg-dark-bg">
      <Header />
      <main className="container mx-auto px-6 py-24">
        <h1 className="text-6xl font-bold mb-8 text-gradient">Contact Us</h1>
        <div className="max-w-2xl">
          <ContactForm />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;

