import React from 'react';
import Hero from './components/Hero';
import SocialProof from './components/SocialProof';
import Benefits from './components/Benefits';
import Reviews from './components/Reviews';
import FAQ from './components/FAQ';
import AIPrompts from './components/AIPrompts';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';

function App() {
  return (
    <div className="min-h-screen">
      <Hero />
      <SocialProof />
      <Benefits />
      <Reviews />
      <FAQ />
      <AIPrompts />
      <Contact />
      <Footer />
      <ChatBot />
    </div>
  );
}

export default App;