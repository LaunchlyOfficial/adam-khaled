import React, { useState } from 'react';

const logos = [
  {
    src: "https://cdn.prod.website-files.com/672f358b16d8e1864cc8fef2/674728dfb2d5d25c6b9507c9_amazon.svg",
    alt: "Amazon",
    opacity: "opacity-20"
  },
  {
    src: "https://raw.githubusercontent.com/AwesomeLogos/logomono/e80dc182f3d03de5710240581e4db719e45311af/logos/vodafone.svg",
    alt: "Vodafone",
    opacity: "opacity-20",
    scale: "scale-[0.6]" // 40% smaller
  },
  {
    src: "https://cdn.prod.website-files.com/672f358b16d8e1864cc8fef2/674728df2c4db80f6210becc_GM.svg",
    alt: "General Motors",
    opacity: "opacity-20"
  },
  {
    src: "https://cdn.prod.website-files.com/672f358b16d8e1864cc8fef2/674728df8a39985d4d9161e5_Sirius.svg",
    alt: "Sirius",
    opacity: "opacity-100"
  },
  {
    src: "https://cdn.prod.website-files.com/672f358b16d8e1864cc8fef2/674728df3678595c295e8c2e_Orange.svg",
    alt: "Orange",
    opacity: "opacity-20"
  },
  {
    src: "https://cdn.prod.website-files.com/672f358b16d8e1864cc8fef2/67472f31a9a6bb9f403dd0bb_STANLEY.svg",
    alt: "Stanley",
    opacity: "opacity-20"
  }
];

export default function SocialProof() {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  const handleImageLoad = (src: string) => {
    setLoadedImages(prev => new Set(prev).add(src));
  };

  const LogoGroup = () => (
    <div className="flex items-center justify-center gap-8">
      {logos.map((logo, index) => (
        <div 
          key={index} 
          className="flex items-center justify-center"
        >
          <div className="relative w-[144px] h-[144px]">
            <img 
              src={logo.src} 
              alt={logo.alt}
              onLoad={() => handleImageLoad(logo.src)}
              className={`absolute inset-0 w-full h-full transition-all duration-300 ${
                loadedImages.has(logo.src) ? logo.opacity : 'opacity-0'
              } ${logo.scale || ''}`}
              style={{ 
                objectFit: 'contain',
                filter: 'invert(1) brightness(100)'
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <section className="py-16 bg-gray-900">
      <div className="px-[10%]">
        <div className="logo-container">
          <div className="logo-track animate-scroll">
            <LogoGroup />
            <LogoGroup />
            <LogoGroup />
          </div>
        </div>
      </div>
    </section>
  );
}