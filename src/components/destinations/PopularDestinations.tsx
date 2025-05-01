
import React from 'react';
import { Star } from "lucide-react";

interface Destination {
  id: number;
  name: string;
  image: string;
  tag: string;
  rating: number;
}

interface PopularDestinationsProps {
  destinations: Destination[];
}

// Updated with real unsplash images
export const popularDestinationsData = [
  { 
    id: 1, 
    name: "Bali, Indonesia", 
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=500&h=300&auto=format&fit=crop", 
    tag: "Beach", 
    rating: 4.8 
  },
  { 
    id: 2, 
    name: "Paris, France", 
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=500&h=300&auto=format&fit=crop", 
    tag: "City", 
    rating: 4.7 
  },
  { 
    id: 3, 
    name: "Tokyo, Japan", 
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=500&h=300&auto=format&fit=crop", 
    tag: "City", 
    rating: 4.9 
  },
  { 
    id: 4, 
    name: "Santorini, Greece", 
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=500&h=300&auto=format&fit=crop", 
    tag: "Island", 
    rating: 4.8 
  },
  { 
    id: 5, 
    name: "New York, USA", 
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=500&h=300&auto=format&fit=crop", 
    tag: "City", 
    rating: 4.6 
  },
  { 
    id: 6, 
    name: "Machu Picchu, Peru", 
    image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=500&h=300&auto=format&fit=crop", 
    tag: "Adventure", 
    rating: 4.9 
  },
];

export const PopularDestinations = ({ destinations }: PopularDestinationsProps) => {
  return (
    <div className="content-area">
      <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Popular Destinations</h2>
      <p className="text-lg text-muted-foreground mb-8">Explore top-rated places loved by travelers worldwide</p>
      
      <div className="destination-grid">
        {destinations.map(destination => (
          <div key={destination.id} className="destination-card group">
            <div className="relative h-[200px] overflow-hidden">
              <img 
                src={destination.image} 
                alt={destination.name} 
                className="destination-image w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="destination-tag">{destination.tag}</div>
            <div className="destination-info">
              <h3 className="text-xl font-semibold">{destination.name}</h3>
              <div className="flex items-center mt-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < Math.floor(destination.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'}`}
                    />
                  ))}
                </div>
                <span className="ml-2 font-medium">{destination.rating}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularDestinations;
