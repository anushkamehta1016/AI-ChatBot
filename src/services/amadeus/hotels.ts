
// Amadeus hotel services

import { toast } from "@/components/ui/use-toast";
import { HotelOption } from "./types";
import { getFormattedDate, getAmadeusToken, checkApiCredentials } from "./utils";

/**
 * Get hotel options from Amadeus API or fallback to mock data
 */
export const getHotelOptions = async (
  destination: string,
  budget: number = 1000,
  duration: number = 5
): Promise<HotelOption[]> => {
  try {
    // Check if API credentials are available
    if (!checkApiCredentials()) {
      return getMockHotelOptions(destination, budget, duration);
    }
    
    // Add timestamp parameter for real-time data
    const timestamp = new Date().getTime();
    
    // Get access token
    const accessToken = await getAmadeusToken();
    if (!accessToken) {
      throw new Error("Could not get Amadeus access token");
    }
    
    // Use the token to fetch hotel options with real-time availability
    // Note: In a real implementation, you would need to get cityCode for the destination first
    // This is a simplified example
    const response = await fetch(`https://test.api.amadeus.com/v3/shopping/hotel-offers?cityCode=${encodeURIComponent(destination)}&adults=1&checkInDate=${getFormattedDate(0)}&checkOutDate=${getFormattedDate(duration)}&_=${timestamp}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    
    if (!response.ok) {
      throw new Error(`Amadeus API error: ${response.status}`);
    }
    
    const data = await response.json();
    const currentTime = new Date().toISOString();
    
    // Transform API response to HotelOption format with real-time availability
    const hotels: HotelOption[] = data.data.map((hotelOffer: any, index: number) => {
      const hotel = hotelOffer.hotel;
      const offer = hotelOffer.offers[0];
      const price = parseFloat(offer.price.total);
      
      // Check if the hotel fits within budget
      const totalCost = price * duration;
      if (totalCost > budget * 0.5) {
        return null; // Skip hotels that are too expensive
      }
      
      // Check real-time availability
      const availability = offer.available ? 'Available now' : 'Limited availability';
      
      return {
        id: `hotel-${index + 1}`,
        name: hotel.name,
        rating: hotel.rating || 4.0,
        address: hotel.address.lines.join(', '),
        city: destination,
        pricePerNight: price,
        currency: offer.price.currency || 'USD',
        amenities: hotel.amenities || ['Wi-Fi', 'Air conditioning'],
        image: `https://source.unsplash.com/featured/?hotel,${destination.replace(/\s+/g, '')}&_=${timestamp}`,
        availability: availability,
        lastUpdated: currentTime,
        realTimeData: true
      };
    }).filter(Boolean);
    
    return hotels;
    
  } catch (error) {
    console.error("Error fetching hotel options:", error);
    
    toast({
      title: "Hotel search error",
      description: "Could not fetch real-time hotel options. Using sample data instead.",
      variant: "destructive",
      duration: 3000,
    });
    
    // Return mock data as fallback
    return getMockHotelOptions(destination, budget, duration);
  }
};

/**
 * Fallback function to generate mock hotel options
 */
export const getMockHotelOptions = (
  destination: string,
  budget: number = 1000,
  duration: number = 5
): HotelOption[] => {
  // Calculate per-night budget (around 30% of total budget divided by days)
  const nightlyBudget = Math.round((budget * 0.3) / duration);
  const currentTime = new Date().toISOString();
  
  // Mock data for hotels
  return [
    {
      id: 'hotel-1',
      name: `${destination} Grand Hotel`,
      rating: 4.5,
      address: `123 Main Street, ${destination}`,
      city: destination,
      pricePerNight: Math.round(nightlyBudget * 1.2),
      currency: 'USD',
      amenities: ['Free WiFi', 'Swimming Pool', 'Fitness Center', 'Restaurant'],
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      availability: 'High availability',
      lastUpdated: currentTime,
      realTimeData: false
    },
    {
      id: 'hotel-2',
      name: `${destination} Boutique Inn`,
      rating: 4.2,
      address: `456 Park Avenue, ${destination}`,
      city: destination,
      pricePerNight: Math.round(nightlyBudget * 0.9),
      currency: 'USD',
      amenities: ['Free WiFi', 'Breakfast Included', 'Central Location'],
      image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      availability: 'Limited availability',
      lastUpdated: currentTime,
      realTimeData: false
    },
    {
      id: 'hotel-3',
      name: `${destination} Luxury Resort`,
      rating: 4.8,
      address: `789 Ocean Drive, ${destination}`,
      city: destination,
      pricePerNight: Math.round(nightlyBudget * 1.5),
      currency: 'USD',
      amenities: ['Free WiFi', 'Swimming Pool', 'Spa', 'Beachfront', '24/7 Room Service'],
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      availability: 'Available now',
      lastUpdated: currentTime,
      realTimeData: false
    },
    {
      id: 'hotel-4',
      name: `${destination} Budget Stay`,
      rating: 3.8,
      address: `101 Budget Road, ${destination}`,
      city: destination,
      pricePerNight: Math.round(nightlyBudget * 0.7),
      currency: 'USD',
      amenities: ['Free WiFi', 'Air Conditioning', 'TV'],
      image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      availability: 'Limited availability',
      lastUpdated: currentTime,
      realTimeData: false
    },
  ];
};

/**
 * Format hotel data for display in a travel card
 */
export const formatHotelForTravelCard = (hotel: HotelOption, duration: number) => {
  const realTimeIndicator = hotel.realTimeData 
    ? `- ${hotel.availability} (Updated ${new Date(hotel.lastUpdated).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})})` 
    : '';
    
  return {
    title: hotel.name,
    description: `${hotel.rating}/5 stars - ${hotel.amenities.slice(0, 3).join(', ')}
${duration} nights at $${hotel.pricePerNight}/night ${realTimeIndicator}`,
    destination: hotel.city,
    price: hotel.pricePerNight * duration,
    type: 'hotel' as const,
    image: hotel.image,
  };
};
