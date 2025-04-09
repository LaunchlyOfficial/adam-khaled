import React from 'react';
import { Sparkles, Brain, Zap, Target, Rocket, Crown } from 'lucide-react';

const prompts = [
  {
    icon: Brain,
    title: "Strategic Thinking",
    prompt: "Act as a strategic advisor analyzing my business model. Consider market trends, competitive advantages, and growth opportunities."
  },
  {
    icon: Zap,
    title: "Productivity Boost",
    prompt: "Help me optimize my daily schedule for maximum productivity. Consider energy levels, priority tasks, and time-blocking techniques."
  },
  {
    icon: Target,
    title: "Goal Setting",
    prompt: "Guide me through setting SMART goals for my business. Focus on revenue targets, market expansion, and personal development."
  },
  {
    icon: Rocket,
    title: "Growth Hacking",
    prompt: "Suggest innovative growth strategies for my business. Consider viral loops, referral systems, and customer acquisition channels."
  },
  {
    icon: Crown,
    title: "Leadership",
    prompt: "Coach me on developing strong leadership skills. Focus on team management, delegation, and effective communication."
  }
];

export default function AIPrompts() {
  return (
    <section className="py-24 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="w-8 h-8 text-gray-400 mr-2" />
            <h2 className="text-4xl font-bold">
              AI Prompts for Success
            </h2>
          </div>
          <p className="text-xl text-gray-400">
            Leverage AI to enhance your entrepreneurial journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {prompts.map((item, index) => (
            <div 
              key={index}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-6 hover:bg-white/20 transition-colors"
            >
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-6">
                <item.icon className="w-6 h-6 text-black" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                {item.title}
              </h3>
              <p className="text-gray-400 mb-4">
                {item.prompt}
              </p>
              <button className="w-full bg-white text-black hover:bg-gray-200 py-2 px-4 rounded-lg transition-colors">
                Copy Prompt
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}