import React, { useState } from 'react';
import { Mail, Send } from 'lucide-react';
import { ref, push } from 'firebase/database';
import { database } from '../config/firebase';
import { useAnalytics } from '../hooks/useAnalytics';
import { checkRateLimit, updateRateLimit } from '../hooks/useFirebase';
import { isValidEmail } from '../utils/security';

interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { trackEvent } = useAnalytics();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      alert('Please fill in all fields.');
      return;
    }

    if (!isValidEmail(formData.email)) {
      alert('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);

    try {
      const contactRef = ref(database, 'contacts');
      await push(contactRef, {
        ...formData,
        timestamp: new Date().toISOString(),
        status: 'new'
      });

      trackEvent('contact_form_submission', {
        email: formData.email
      });

      setFormData({
        name: '',
        email: '',
        message: ''
      });

      alert('Thank you for your message! We will get back to you soon.');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error sending your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-4">
              <Mail className="w-8 h-8 text-white mr-2" />
              <h2 className="text-4xl font-bold text-white">
                Let's Connect
              </h2>
            </div>
            <p className="text-xl text-gray-400">
              Ready to transform your business? Get in touch today.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg bg-white/10 text-white p-2 focus:outline-none focus:ring-2 focus:ring-white"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg bg-white/10 text-white p-2 focus:outline-none focus:ring-2 focus:ring-white"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="mt-1 block w-full rounded-lg bg-white/10 text-white p-2 focus:outline-none focus:ring-2 focus:ring-white"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-lg text-black bg-white hover:bg-gray-200 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5 mr-2" />
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}