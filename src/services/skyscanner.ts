
// Skyscanner API service

import { toast } from "@/components/ui/use-toast";

interface FlightOption {
  id: string;
  airline: string;
  flightNumber: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  origin: string;
  destination: string;
  price: number;
  currency: string;
  direct: boolean;
  stops: number;
  image: string;
  realTimeData: boolean; // Flag to indicate if this is real-time data or mock
  lastUpdated: string; // Timestamp when the data was last updated
}

// Define image URLs for airlines
const airlineImages = {
  delta: 'https://images.unsplash.com/photo-1521727857535-28d2047619e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
  united: 'https://images.unsplash.com/photo-1540339832862-474599807836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
  lufthansa: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  emirates: 'https://images.unsplash.com/photo-1542296332-2e4b708bff8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
};

// Map airline codes to image URLs
const getAirlineImage = (airlineCode: string): string => {
  const airlineMap: Record<string, keyof typeof airlineImages> = {
    'DL': 'delta',
    'UA': 'united',
    'LH': 'lufthansa',
    'EK': 'emirates',
  };
  
  const imageKey = airlineMap[airlineCode] || 'delta';
  return airlineImages[imageKey];
};

export const getFlightOptions = async (
  origin: string = 'Any',
  destination: string,
  date: string = 'anytime',
  budget: number = 1000
): Promise<FlightOption[]> => {
  try {
    const apiKey = import.meta.env.VITE_SKYSCANNER_API_KEY;
    
    if (!apiKey) {
      console.warn("Skyscanner API key not found, using mock data");
      toast({
        title: "Using mock flight data",
        description: "Skyscanner API key not configured. Using sample flight options.",
        duration: 3000,
      });
      return getMockFlightOptions(origin, destination, budget);
    }
    
    // Format the destination and origin for the API
    const formattedDestination = destination.trim();
    const formattedOrigin = origin === 'Any' ? 'anywhere' : origin.trim();
    
    // Format the date (this is a simplified version, in reality would need proper formatting)
    const formattedDate = date === 'anytime' ? 'anytime' : date;
    
    // Add cache-busting parameter to ensure we get fresh data
    const cacheBuster = new Date().getTime();
    
    // Prepare the request to the Skyscanner API
    const response = await fetch(`https://partners.api.skyscanner.net/apiservices/v3/flights/live/search?_=${cacheBuster}`, {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: {
          market: 'US',
          locale: 'en-US',
          currency: 'USD',
          queryLegs: [{
            originPlaceId: { iata: formattedOrigin },
            destinationPlaceId: { iata: formattedDestination },
            date: formattedDate
          }],
          adults: 1,
          childrenAges: [],
          cabinClass: 'CABIN_CLASS_ECONOMY'
        }
      })
    });
    
    if (!response.ok) {
      throw new Error(`Skyscanner API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Transform API response to FlightOption format
    // Note: This is a placeholder - actual transformation depends on the API response structure
    const flights: FlightOption[] = data.itineraries.map((itinerary: any, index: number) => {
      const leg = itinerary.legs[0];
      const segment = leg.segments[0];
      const price = itinerary.pricingOptions[0].price.amount;
      
      return {
        id: `fl-${index + 1}`,
        airline: segment.marketingCarrier.name,
        flightNumber: `${segment.marketingCarrier.code}${segment.marketingCarrierFlightNumber}`,
        departureTime: new Date(segment.departureDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        arrivalTime: new Date(segment.arrivalDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        duration: formatDuration(leg.durationInMinutes),
        origin: leg.originPlaceId.iata,
        destination: leg.destinationPlaceId.iata,
        price: price,
        currency: 'USD',
        direct: leg.segments.length === 1,
        stops: leg.segments.length - 1,
        image: getAirlineImage(segment.marketingCarrier.code),
        realTimeData: true,
        lastUpdated: new Date().toISOString()
      };
    });
    
    // Filter flights by budget if needed
    return flights.filter(flight => flight.price <= budget);
    
  } catch (error) {
    console.error("Error fetching flight options:", error);
    
    toast({
      title: "Flight search error",
      description: "Could not fetch real-time flight options. Using sample data instead.",
      variant: "destructive",
      duration: 3000,
    });
    
    // Return mock data as fallback
    return getMockFlightOptions(origin, destination, budget);
  }
};

// Helper function to format duration in minutes to hours and minutes format
const formatDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
};

// Fallback function to generate mock flight options
const getMockFlightOptions = (origin: string, destination: string, budget: number): FlightOption[] => {
  // Calculate prices based on budget
  const economyPrice = Math.round(budget * 0.35);
  const businessPrice = Math.round(budget * 0.5);
  const currentTime = new Date().toISOString();
  
  // Generate mock flight options
  return [
    {
      id: 'fl-1',
      airline: 'Delta Airlines',
      flightNumber: 'DL1234',
      departureTime: '08:00 AM',
      arrivalTime: '11:30 AM',
      duration: '3h 30m',
      origin: origin,
      destination: destination,
      price: economyPrice,
      currency: 'USD',
      direct: true,
      stops: 0,
      image: airlineImages.delta,
      realTimeData: false,
      lastUpdated: currentTime
    },
    {
      id: 'fl-2',
      airline: 'United Airlines',
      flightNumber: 'UA5678',
      departureTime: '12:45 PM',
      arrivalTime: '04:30 PM',
      duration: '3h 45m',
      origin: origin,
      destination: destination,
      price: economyPrice - 50,
      currency: 'USD',
      direct: false,
      stops: 1,
      image: airlineImages.united,
      realTimeData: false,
      lastUpdated: currentTime
    },
    {
      id: 'fl-3',
      airline: 'Lufthansa',
      flightNumber: 'LH7890',
      departureTime: '07:30 PM',
      arrivalTime: '05:45 AM',
      duration: '10h 15m',
      origin: origin,
      destination: destination,
      price: businessPrice,
      currency: 'USD',
      direct: true,
      stops: 0,
      image: airlineImages.lufthansa,
      realTimeData: false,
      lastUpdated: currentTime
    },
    {
      id: 'fl-4',
      airline: 'Emirates',
      flightNumber: 'EK2020',
      departureTime: '09:15 PM',
      arrivalTime: '02:30 PM',
      duration: '17h 15m',
      origin: origin,
      destination: destination,
      price: businessPrice + 150,
      currency: 'USD',
      direct: false,
      stops: 1,
      image: airlineImages.emirates,
      realTimeData: false,
      lastUpdated: currentTime
    },
  ];
};

export const formatFlightForTravelCard = (flight: FlightOption) => {
  const realTimeIndicator = flight.realTimeData 
    ? `- Real-time data as of ${new Date(flight.lastUpdated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` 
    : '';
    
  return {
    title: `${flight.airline} - ${flight.flightNumber}`,
    description: `${flight.origin} to ${flight.destination} - ${flight.duration} ${flight.direct ? '(Direct)' : `(${flight.stops} stop)`}
Departure: ${flight.departureTime} - Arrival: ${flight.arrivalTime} ${realTimeIndicator}`,
    destination: flight.destination,
    price: flight.price,
    type: 'flight' as const,
    image: flight.image,
  };
};
