
import { Card, CardContent } from "@/components/ui/card";
import { GlobeIcon, SparklesIcon } from "lucide-react";

export const WelcomeBanner = () => {
  const backgroundImages = [
    'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb', // Starry night
    'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb', // River between mountains
    'https://images.unsplash.com/photo-1500673922987-e212871fec22', // Body of water
  ];

  const randomBackgroundImage = backgroundImages[Math.floor(Math.random() * backgroundImages.length)];

  return (
    <Card className="overflow-hidden border-none relative group">
      <div 
        className="absolute inset-0 bg-gradient-to-r from-travel-blue via-blue-500 to-travel-dark-orange opacity-90 z-0"
      />
      <div 
        className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-40 z-[-1] transition-transform duration-10000 group-hover:scale-110" 
        style={{ 
          backgroundImage: `url('${randomBackgroundImage}')`,
          backgroundSize: 'cover'
        }}
      />
      
      <CardContent className="flex flex-col md:flex-row items-center p-8 space-y-4 md:space-y-0 md:space-x-6 relative z-10">
        <div className="bg-white/30 backdrop-blur-md p-4 rounded-full transform transition-transform group-hover:rotate-12">
          <GlobeIcon size={32} className="text-white" />
        </div>
        <div className="space-y-3 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-3">
            <h2 className="text-2xl md:text-3xl font-bold text-white">AI Travel Budget Planner</h2>
            <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-3 py-1.5 text-sm">
              <SparklesIcon size={14} className="mr-1.5 animate-pulse" /> <span className="font-medium text-white">AI-Powered</span>
            </div>
          </div>
          <p className="text-white/95 text-lg max-w-2xl">
            Tell me your destination, dates, and budget, and I'll help you plan your perfect trip with real-time flight, hotel, and activity recommendations!
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
