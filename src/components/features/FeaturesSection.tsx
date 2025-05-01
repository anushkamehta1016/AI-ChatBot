
import React from 'react';
import { Button } from "@/components/ui/button";
import { TrendingUp, Users, Star, Globe, Shield, CreditCard } from "lucide-react";

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

interface FeaturesSectionProps {
  features: Feature[];
}

export const featuresData = [
  { 
    title: "Smart Recommendations", 
    description: "Get personalized travel suggestions based on your preferences and budget constraints.", 
    icon: <TrendingUp className="w-8 h-8" />,
    color: "from-blue-500 to-indigo-600"
  },
  { 
    title: "Budget Tracking", 
    description: "Keep track of your expenses and stay within your travel budget with our intelligent management tools.", 
    icon: <CreditCard className="w-8 h-8" />,
    color: "from-green-500 to-emerald-600" 
  },
  { 
    title: "Top-rated Experiences", 
    description: "Discover the highest-rated activities and attractions at your destination backed by real traveler reviews.", 
    icon: <Star className="w-8 h-8" />,
    color: "from-yellow-500 to-amber-600" 
  },
  { 
    title: "Global Coverage", 
    description: "Explore destinations worldwide with our comprehensive database of cities, attractions and hidden gems.", 
    icon: <Globe className="w-8 h-8" />,
    color: "from-purple-500 to-pink-600" 
  },
  { 
    title: "Travel Community", 
    description: "Connect with fellow travelers, share experiences and get advice from our global community of adventurers.", 
    icon: <Users className="w-8 h-8" />,
    color: "from-red-500 to-rose-600" 
  },
  { 
    title: "Secure Planning", 
    description: "Plan with confidence knowing your data and payments are protected with bank-level security standards.", 
    icon: <Shield className="w-8 h-8" />,
    color: "from-cyan-500 to-blue-600" 
  },
];

export const FeaturesSection = ({ features }: FeaturesSectionProps) => {
  return (
    <div className="content-area">
      <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">Why Choose Our Service</h2>
      <p className="text-lg text-muted-foreground mb-8">We make travel planning simple, enjoyable and affordable</p>
      
      <div className="features-section">
        {features.map((feature, index) => (
          <div key={index} className="feature-item bg-card/60 backdrop-blur-sm">
            <div className={`feature-icon bg-gradient-to-r ${feature.color}`}>
              {feature.icon}
              <div className="absolute inset-0 rounded-full bg-white/10"></div>
            </div>
            <h3 className="text-xl font-semibold mt-4 mb-2">{feature.title}</h3>
            <p className="text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>
      
      <div className="mt-12 text-center">
        <Button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-lg px-8 py-6 rounded-full transform transition-all hover:scale-105 shadow-xl shadow-orange-900/20">
          Start Your Journey Today
        </Button>
      </div>
    </div>
  );
};

export default FeaturesSection;
