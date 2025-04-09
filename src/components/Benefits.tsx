import React from 'react';
import { Target, Rocket, Brain, Clock, BarChart, Users } from 'lucide-react';

const benefits = [
  {
    icon: Target,
    title: "Strategic Direction",
    description: "Get clarity on your business goals and create an actionable roadmap to achieve them."
  },
  {
    icon: Rocket,
    title: "Rapid Growth Framework",
    description: "Access proven strategies to scale your business faster while maintaining sustainability."
  },
  {
    icon: Brain,
    title: "Mindset Transformation",
    description: "Develop the psychology of successful entrepreneurs and overcome limiting beliefs."
  },
  {
    icon: Clock,
    title: "Time Liberation",
    description: "Learn systems and automation to free up your time while growing your income."
  },
  {
    icon: BarChart,
    title: "Revenue Optimization",
    description: "Identify and capitalize on hidden revenue opportunities in your business."
  },
  {
    icon: Users,
    title: "Network Effect",
    description: "Join a community of ambitious entrepreneurs and expand your network."
  }
];

export default function Benefits() {
  return (
    <section className="py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Transform Your Business Journey
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Book your free consultation and unlock these game-changing benefits
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="p-8 rounded-xl bg-gray-800/50 hover:bg-gray-800 border border-accent/10 hover:border-accent/20 transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <benefit.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {benefit.title}
              </h3>
              <p className="text-gray-400">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}