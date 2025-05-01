// Utility functions for Gemini service

import { toast } from "@/components/ui/use-toast";

/**
 * Returns the Gemini API key
 * @returns The API key
 */
export const getApiKey = (): string => {
  // Replace this with your actual Gemini API key
  return "AIzaSyDmXXERElsYaL1D8kk5Kwi15LuLPNdM2yo";
};

/**
 * Creates a prompt for the Gemini model based on travel details
 */
export const createTravelPrompt = (travelDetails: any): string => {
  return `
    Act as an AI travel advisor. The user is planning a trip with these details:
    
    ${travelDetails.destination ? `Destination: ${travelDetails.destination}` : 'No destination specified'}
    ${travelDetails.budget ? `Budget: $${travelDetails.budget}` : 'No budget specified'}
    ${travelDetails.duration ? `Duration: ${travelDetails.duration} days` : 'No duration specified'}
    ${travelDetails.month ? `Month: ${travelDetails.month}` : 'No travel month specified'}
    
    Based on these details, provide friendly travel advice focusing on budget allocation and travel recommendations.
    Keep your response conversational and helpful.
    Include real-time information about current travel conditions, exchange rates, and seasonal considerations.
  `;
};

/**
 * Handles errors from Gemini API calls
 */
export const handleApiError = (error: unknown): string => {
  const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
  console.error("Error calling Gemini API:", errorMessage);

  let userMessage = "I'm sorry, I'm having trouble connecting to my travel database right now. ";
  let toastMessage = "Could not connect to Gemini.";
  
  if (errorMessage.includes('API_KEY_MISSING')) {
    userMessage = "I'm unable to access the travel database due to missing authentication. Please contact support.";
    toastMessage = "API key is missing. Please configure the API key.";
  } else if (errorMessage.includes('INVALID_API_KEY')) {
    userMessage = "I'm unable to access the travel database due to authentication issues. Please contact support.";
    toastMessage = "Invalid API key. Please check your API key configuration.";
  } else if (errorMessage.includes('RATE_LIMIT')) {
    userMessage = "I'm receiving too many requests right now. Please wait a moment and try again.";
    toastMessage = "Rate limit exceeded. Please try again later.";
  }

  toast({
    title: "API Error",
    description: toastMessage,
    variant: "destructive",
  });
  
  return userMessage;
}; 