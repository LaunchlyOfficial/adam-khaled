import React from 'react';
import { X } from 'lucide-react';

interface CalendarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Calendar({ isOpen, onClose }: CalendarProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-full h-full md:rounded-lg md:p-6 md:w-[90%] md:max-w-4xl md:h-auto md:max-h-[90vh] relative">
        <button 
          onClick={onClose} 
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 z-10"
        >
          <X className="w-6 h-6" />
        </button>
        <iframe 
          src="https://koalendar.com/e/30-mins-free-consulation?embed=true" 
          width="100%" 
          height="100%" 
          frameBorder="0"
          title="Book a consultation"
          className="w-full h-screen md:h-[800px] md:rounded-lg"
        />
      </div>
    </div>
  );
}