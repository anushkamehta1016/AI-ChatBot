
// Utility functions for Amadeus API services

import { toast } from "@/components/ui/use-toast";

/**
 * Helper function to get formatted dates for hotel availability
 */
export const getFormattedDate = (daysFromNow: number): string => {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return date.toISOString().split('T')[0];
};

/**
 * Helper function to get Amadeus access token
 */
export const getAmadeusToken = async (): Promise<string | null> => {
  try {
    const apiKey = import.meta.env.VITE_AMADEUS_API_KEY;
    const apiSecret = import.meta.env.VITE_AMADEUS_API_SECRET;
    
    if (!apiKey || !apiSecret) {
      console.warn("Amadeus API credentials not found");
      return null;
    }
    
    // Get an access token
    const tokenResponse = await fetch('https://test.api.amadeus.com/v1/security/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `grant_type=client_credentials&client_id=${apiKey}&client_secret=${apiSecret}`
    });
    
    if (!tokenResponse.ok) {
      throw new Error(`Amadeus authentication error: ${tokenResponse.status}`);
    }
    
    const tokenData = await tokenResponse.json();
    return tokenData.access_token;
    
  } catch (error) {
    console.error("Error fetching Amadeus token:", error);
    return null;
  }
};

/**
 * Check API credentials and show toast if missing
 */
export const checkApiCredentials = (): boolean => {
  const apiKey = import.meta.env.VITE_AMADEUS_API_KEY;
  const apiSecret = import.meta.env.VITE_AMADEUS_API_SECRET;
  
  if (!apiKey || !apiSecret) {
    console.warn("Amadeus API credentials not found, using mock data");
    toast({
      title: "Using mock data",
      description: "Amadeus API not configured. Using sample options.",
      duration: 3000,
    });
    return false;
  }
  
  return true;
};
