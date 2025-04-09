import React from 'react';
import { Star } from 'lucide-react';

const reviews = [
  {
    name: "Sarah Johnson",
    role: "E-commerce Founder",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80",
    content: "Adam's guidance helped me scale my e-commerce business from $5k to $50k monthly revenue in just 6 months. His systems are game-changing!",
    rating: 5
  },
  {
    name: "Michael Chen",
    role: "Digital Marketing Consultant",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80",
    content: "The mindset transformation I experienced through Adam's coaching was incredible. My consulting business has tripled in size.",
    rating: 5
  },
  {
    name: "Emma Davis",
    role: "Course Creator",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80",
    content: "Adam helped me turn my expertise into a thriving online course business. I'm now making more impact and income than ever before.",
    rating: 5
  },
  {
    name: "James Wilson",
    role: "SaaS Founder",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80",
    content: "The systems and frameworks Adam taught me have been instrumental in growing my SaaS startup. Highly recommended!",
    rating: 5
  },
  {
    name: "Lisa Zhang",
    role: "Freelance Designer",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80",
    content: "Thanks to Adam's coaching, I've transformed my freelance work into a profitable agency. The ROI has been incredible.",
    rating: 5
  },
  {
    name: "David Brown",
    role: "Content Creator",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80",
    content: "Adam's strategies helped me monetize my content and build multiple income streams. I'm finally living life on my own terms.",
    rating: 5
  }
];

export default function Reviews() {
  return (
    <section className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Success Stories
          </h2>
          <p className="text-xl text-gray-400">
            Join hundreds of entrepreneurs who have transformed their businesses
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div 
              key={index}
              className="bg-gray-900 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-800"
            >
              <div className="flex items-center mb-6">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h3 className="font-semibold text-white">{review.name}</h3>
                  <p className="text-gray-400 text-sm">{review.role}</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-300">{review.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}