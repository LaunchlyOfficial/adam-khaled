import React, { useState } from 'react';
import { ArrowRight, Send } from 'lucide-react';
import { ref, push } from 'firebase/database';
import { database } from '../config/firebase';
import { useAnalytics } from '../hooks/useAnalytics';
import Calendar from './Calendar';

export default function Hero() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const { trackEvent } = useAnalytics();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      alert('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const subscribersRef = ref(database, 'subscribers');
      await push(subscribersRef, {
        email,
        timestamp: new Date().toISOString()
      });
      
      trackEvent('newsletter_subscription', { email });
      alert('Thank you for subscribing!');
      setEmail('');
    } catch (error) {
      console.error('Error saving email:', error);
      alert('There was an error subscribing. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
        
        <div className="absolute inset-0" style={{ opacity: 0.15 }}>
          <div className="absolute top-20 left-10 w-72 h-72 bg-accent-light rounded-full mix-blend-overlay filter blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-accent rounded-full mix-blend-overlay filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-20 left-1/3 w-64 h-64 bg-accent-dark rounded-full mix-blend-overlay filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div 
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        ></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-8">
              <img
                src="/src/assets/Adam.jpg"
                alt="Adam Khaled"
                className="w-20 h-20 rounded-full border-2 border-accent shadow-xl"
              />
              <div>
                <h3 className="text-xl font-semibold text-white">Adam Khaled</h3>
                <p className="text-accent-light">Business Growth Expert</p>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6 text-white">
              Independent <span className="text-accent">Earner's Digest</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300">
              Helping Solopreneurs grow to €5K-€10K/MRR with insights from +10 years in the field. Don't miss the knowledge that can drive your success and freedom from the rat race.
            </p>
            
            <div className="space-y-4 md:space-y-0 md:space-x-4 flex flex-col md:flex-row">
              <form onSubmit={handleSubscribe} className="flex-1 flex max-w-md">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 p-2 rounded-l-lg bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-accent hover:bg-accent-dark px-6 py-4 rounded-r-lg flex items-center transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5 mr-2" />
                  {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                </button>
              </form>
              
              <button 
                onClick={() => setIsCalendarOpen(true)}
                className="group bg-white text-gray-900 px-8 py-4 rounded-lg flex items-center justify-center hover:bg-gray-100 transition duration-300"
              >
                Book Free Consultation
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <Calendar isOpen={isCalendarOpen} onClose={() => setIsCalendarOpen(false)} />
    </div>
  );
}