// Main Gemini service for making API calls

import { GeminiResponse } from "./types";
import { callGemini } from "./api";

// Re-export the types for external usage
export type { GeminiResponse } from "./types";

/**
 * Gets a response from Gemini based on the user's travel query
 */
export const getGeminiResponse = async (message: string): Promise<GeminiResponse> => {
  try {
    const aiResponse = await callGemini(message);
    return {
      text: aiResponse
    };
  } catch (error) {
    return {
      text: "I'm sorry, I encountered an error while processing your request. Please try again."
    };
  }
}; 