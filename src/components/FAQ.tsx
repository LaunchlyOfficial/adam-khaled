import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: "How does the free consultation work?",
    answer: "The consultation is a 30-minute video call where we'll discuss your business goals, current challenges, and how I can help you achieve breakthrough results. You'll leave with actionable insights and a clear path forward."
  },
  {
    question: "What types of businesses do you work with?",
    answer: "I specialize in working with online businesses, including e-commerce, digital products, coaching, consulting, and content creators. If you're committed to growing your online presence and income, we're a good fit."
  },
  {
    question: "How long does it typically take to see results?",
    answer: "While results vary, most clients see significant improvements within 90 days of implementing our systems. Some achieve breakthrough results in as little as 30 days with dedicated execution."
  },
  {
    question: "What makes your coaching different?",
    answer: "My approach combines proven business systems with mindset transformation. You'll get personalized strategies, accountability, and access to a network of successful entrepreneurs. I focus on sustainable growth, not quick fixes."
  },
  {
    question: "Do you offer ongoing support?",
    answer: "Yes, I provide various coaching programs with ongoing support, including 1-on-1 coaching, group programs, and a private community for continuous learning and networking."
  },
  {
    question: "What investment is required?",
    answer: "Investment varies based on your needs and chosen program. We'll discuss the options during your free consultation to find the best fit for your goals and budget."
  },
  {
    question: "How do I know if I'm ready for coaching?",
    answer: "If you're committed to growing your business, willing to implement new strategies, and ready to invest in your success, you're ready. The free consultation will help us determine if we're the right fit."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-400">
            Everything you need to know about working together
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="border border-gray-700 rounded-lg bg-gray-800"
            >
              <button
                className="w-full px-6 py-4 flex justify-between items-center hover:bg-gray-700 transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-medium text-left text-white">
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 py-4 text-gray-300 bg-gray-800/50">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}