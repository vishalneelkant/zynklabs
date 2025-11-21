import { useState } from 'react';
import { submitBookDemo } from '../services/api';

interface BookDemoModalProps {
  onClose: () => void;
}

interface SuccessModalProps {
  onClose: () => void;
}

const SuccessModal = ({ onClose }: SuccessModalProps) => {
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="glossy-card p-8 max-w-md w-full">
        <div className="text-center">
          <div className="text-6xl mb-4">✓</div>
          <h3 className="text-2xl font-bold mb-4 text-white">Demo Scheduled!</h3>
          <p className="text-gray-400 mb-6">
            Thank you! We will contact you within 48 hours to confirm your demo.
          </p>
          <button
            onClick={onClose}
            className="btn-premium relative z-10"
          >
            <span className="relative z-10">Close</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const BookDemoModal = ({ onClose }: BookDemoModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    preferredDate: '',
    notes: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await submitBookDemo(formData);
      setShowSuccess(true);
      setFormData({ name: '', email: '', company: '', preferredDate: '', notes: '' });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to book demo. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (showSuccess) {
    return <SuccessModal onClose={() => { setShowSuccess(false); onClose(); }} />;
  }

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="glossy-card p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gradient">Book a Demo</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition text-2xl"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-300">
              Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="input-premium"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-300">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="input-premium"
            />
          </div>

          <div>
            <label htmlFor="company" className="block text-sm font-medium mb-2 text-gray-300">
              Company *
            </label>
            <input
              type="text"
              id="company"
              name="company"
              required
              value={formData.company}
              onChange={handleChange}
              className="input-premium"
            />
          </div>

          <div>
            <label htmlFor="preferredDate" className="block text-sm font-medium mb-2 text-gray-300">
              Preferred Date *
            </label>
            <input
              type="date"
              id="preferredDate"
              name="preferredDate"
              required
              value={formData.preferredDate}
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]}
              className="input-premium"
            />
          </div>

          <div>
            <label htmlFor="notes" className="block text-sm font-medium mb-2 text-gray-300">
              Notes (Optional)
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={4}
              value={formData.notes}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-dark-bg border border-white/10 rounded-lg text-white focus:outline-none focus:border-electric-blue transition resize-none"
            />
          </div>

          {error && (
            <div className="text-red-400 text-sm">{error}</div>
          )}

          <div className="flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 btn-outline-premium relative z-10"
            >
              <span className="relative z-10">Cancel</span>
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 btn-premium relative z-10 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none"
            >
              <span className="relative z-10">{isLoading ? 'Booking...' : 'Book Demo'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookDemoModal;

