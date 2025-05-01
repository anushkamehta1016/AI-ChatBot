
// Types for Amadeus API services

export interface HotelOption {
  id: string;
  name: string;
  rating: number;
  address: string;
  city: string;
  pricePerNight: number;
  currency: string;
  amenities: string[];
  image: string;
  availability: string;
  lastUpdated: string;
  realTimeData: boolean;
}

export interface ActivityOption {
  id: string;
  name: string;
  description: string;
  location: string;
  price: number;
  currency: string;
  duration: string;
  rating: number;
  image: string;
  availability: string;
  lastUpdated: string;
  realTimeData: boolean;
}
