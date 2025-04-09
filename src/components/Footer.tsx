import React from 'react';
import { Instagram, Youtube, Linkedin } from 'lucide-react';

const XLogo = () => (
  <svg 
    viewBox="0 0 24 24" 
    className="w-6 h-6"
    fill="currentColor"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const SubstackLogo = () => (
  <svg
    viewBox="0 0 24 24"
    className="w-6 h-6"
    fill="currentColor"
  >
    <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z"/>
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-8 md:mb-0">
            <img 
              src="https://cdn.prod.website-files.com/672f358b16d8e1864cc8fef2/672f3d48c03d722c786a4f5d_webclip.jpg"
              alt="Logo"
              className="h-12 w-auto mb-2"
            />
            <p className="text-gray-400">Empowering entrepreneurs to achieve freedom</p>
          </div>

          <div className="flex space-x-6">
            <a 
              href="https://x.com/khaledvision" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-gray-400 transition-colors"
            >
              <XLogo />
            </a>
            <a 
              href="https://www.instagram.com/adamcitoo/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-gray-400 transition-colors"
            >
              <Instagram className="w-6 h-6" />
            </a>
            <a 
              href="https://www.linkedin.com/in/adam-ahmed-khaled-81aa26108/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-gray-400 transition-colors"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a 
              href="https://www.youtube.com/@adamcitoo" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-gray-400 transition-colors"
            >
              <Youtube className="w-6 h-6" />
            </a>
            <a 
              href="https://adamkhaled.substack.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-gray-400 transition-colors"
            >
              <SubstackLogo />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}