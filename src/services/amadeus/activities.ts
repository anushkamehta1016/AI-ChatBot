
// Amadeus activities services

import { toast } from "@/components/ui/use-toast";
import { ActivityOption } from "./types";
import { getAmadeusToken, checkApiCredentials } from "./utils";

/**
 * Get activity options from Amadeus API or fallback to mock data
 */
export const getActivityOptions = async (
  destination: string,
  budget: number = 1000
): Promise<ActivityOption[]> => {
  try {
    // Check if API credentials are available
    if (!checkApiCredentials()) {
      return getMockActivityOptions(destination, budget);
    }
    
    // Add timestamp parameter for real-time data
    const timestamp = new Date().getTime();
    
    // Get access token
    const accessToken = await getAmadeusToken();
    if (!accessToken) {
      throw new Error("Could not get Amadeus access token");
    }
    
    // Use the token to fetch activities with real-time information
    // First, we need to get coordinates for the destination
    const geocodeResponse = await fetch(`https://test.api.amadeus.com/v1/reference-data/locations/cities?keyword=${encodeURIComponent(destination)}&max=1&_=${timestamp}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    
    if (!geocodeResponse.ok) {
      throw new Error(`Amadeus geocoding error: ${geocodeResponse.status}`);
    }
    
    const geocodeData = await geocodeResponse.json();
    if (!geocodeData.data || geocodeData.data.length === 0) {
      throw new Error(`Could not find coordinates for ${destination}`);
    }
    
    const city = geocodeData.data[0];
    const latitude = city.geoCode.latitude;
    const longitude = city.geoCode.longitude;
    
    // Now get points of interest with real-time information
    const poiResponse = await fetch(`https://test.api.amadeus.com/v1/reference-data/locations/pois?latitude=${latitude}&longitude=${longitude}&radius=20&page[limit]=10&_=${timestamp}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    
    if (!poiResponse.ok) {
      throw new Error(`Amadeus POI error: ${poiResponse.status}`);
    }
    
    const poiData = await poiResponse.json();
    const currentTime = new Date().toISOString();
    
    // Calculate activity budget (around 10% of total budget)
    const activityBudget = Math.round(budget * 0.1);
    
    // Transform API response to ActivityOption format with real-time information
    const activities: ActivityOption[] = poiData.data.map((poi: any, index: number) => {
      // Generate a random price within budget range
      const price = Math.round((activityBudget * 0.3) + Math.random() * (activityBudget * 0.5));
      
      return {
        id: `act-${index + 1}`,
        name: poi.name,
        description: poi.category || `Popular attraction in ${destination}`,
        location: destination,
        price: price,
        currency: 'USD',
        duration: ['1 hour', '2 hours', '3 hours', 'Half day', 'Full day'][Math.floor(Math.random() * 5)],
        rating: (3.5 + Math.random() * 1.5).toFixed(1),
        image: `https://source.unsplash.com/featured/?${poi.category?.replace(/\s+/g, '')},${destination.replace(/\s+/g, '')}&_=${timestamp}`,
        availability: 'Available today',
        lastUpdated: currentTime,
        realTimeData: true
      };
    });
    
    return activities;
    
  } catch (error) {
    console.error("Error fetching activity options:", error);
    
    toast({
      title: "Activity search error",
      description: "Could not fetch real-time activities. Using sample data instead.",
      variant: "destructive",
      duration: 3000,
    });
    
    // Return mock data as fallback
    return getMockActivityOptions(destination, budget);
  }
};

/**
 * Fallback function to generate mock activity options
 */
export const getMockActivityOptions = (
  destination: string,
  budget: number = 1000
): ActivityOption[] => {
  // Calculate activity budget (around 10% of total budget)
  const activityBudget = Math.round(budget * 0.1);
  const currentTime = new Date().toISOString();
  
  // Mock data for activities
  return [
    {
      id: 'act-1',
      name: `${destination} City Tour`,
      description: `Explore the best of ${destination} with a guided city tour.`,
      location: destination,
      price: Math.round(activityBudget * 0.4),
      currency: 'USD',
      duration: '3 hours',
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1473163311424-7f8da1b8e9f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      availability: 'Available today',
      lastUpdated: currentTime,
      realTimeData: false
    },
    {
      id: 'act-2',
      name: `${destination} Food Experience`,
      description: `Taste the local cuisine of ${destination} with a food tour.`,
      location: destination,
      price: Math.round(activityBudget * 0.5),
      currency: 'USD',
      duration: '4 hours',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1515669097368-22e68427d265?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      availability: 'Available today',
      lastUpdated: currentTime,
      realTimeData: false
    },
    {
      id: 'act-3',
      name: `${destination} Museum Pass`,
      description: `Access to the top museums in ${destination}.`,
      location: destination,
      price: Math.round(activityBudget * 0.3),
      currency: 'USD',
      duration: 'Valid for 2 days',
      rating: 4.4,
      image: 'https://images.unsplash.com/photo-1565060169187-3276a3b8e6a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      availability: 'Available today',
      lastUpdated: currentTime,
      realTimeData: false
    },
    {
      id: 'act-4',
      name: `${destination} Adventure Tour`,
      description: `Outdoor activities and adventure experiences in ${destination}.`,
      location: destination,
      price: Math.round(activityBudget * 0.7),
      currency: 'USD',
      duration: '6 hours',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1464278533981-50106e6176b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      availability: 'Available today',
      lastUpdated: currentTime,
      realTimeData: false
    },
  ];
};

/**
 * Format activity data for display in a travel card
 */
export const formatActivityForTravelCard = (activity: ActivityOption) => {
  const realTimeIndicator = activity.realTimeData 
    ? `- ${activity.availability} (Updated ${new Date(activity.lastUpdated).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})})` 
    : '';
    
  return {
    title: activity.name,
    description: `${activity.description}
Duration: ${activity.duration} - Rating: ${activity.rating}/5 ${realTimeIndicator}`,
    destination: activity.location,
    price: activity.price,
    type: 'activity' as const,
    image: activity.image,
  };
};
