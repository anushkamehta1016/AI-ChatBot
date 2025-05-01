
import React from 'react';
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  onStartClick: () => void;
}

export const HeroSection = ({ onStartClick }: HeroSectionProps) => {
  return (
    <div className="hero-section relative h-[70vh] max-h-[700px] rounded-lg overflow-hidden mb-8" 
         style={{backgroundImage: "url('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1200&h=600&auto=format&fit=crop')"}}
    >
      <div className="hero-overlay bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
      <div className="hero-content z-10 relative text-center md:text-left md:max-w-2xl">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-white drop-shadow-lg animate-fade-in">
          <span className="bg-gradient-to-r from-blue-500 via-purple-400 to-pink-500 bg-clip-text text-transparent">Discover</span> Your Perfect Trip
        </h1>
        <p className="text-xl md:text-2xl mb-10 text-white/90 drop-shadow-md max-w-xl animate-fade-in [animation-delay:300ms]">
          Plan, organize, and enjoy your dream vacation with our AI-powered travel assistant
        </p>
        <Button 
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-lg px-10 py-7 hover:from-blue-700 hover:to-purple-700 hover:scale-105 transition-all shadow-xl shadow-blue-900/20 font-semibold animate-fade-in [animation-delay:500ms]" 
          onClick={onStartClick}
        >
          Start Planning
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;
