// Gemini API client implementation

import type { GeminiRequestOptions } from "./types";
import { getApiKey, handleApiError } from "./utils";

const SYSTEM_MESSAGE = `You are a helpful travel budget planning assistant. Your task is to analyze the user's travel plans and provide detailed budget suggestions. 
Please structure your response with the following sections:
1. **Budget Overview**: Summarize the key budget points from the user's request
2. **Cost Breakdown**: Provide a detailed breakdown of estimated costs
3. **Money-Saving Tips**: Offer specific tips to stay within budget
4. **Alternative Options**: Suggest budget-friendly alternatives if applicable

Format your response using markdown for better readability.`;

/**
 * Makes an API call to Gemini chat completions endpoint
 */
export const callGemini = async (
  prompt: string,
  options: GeminiRequestOptions = {}
): Promise<string> => {
  try {
    const apiKey = getApiKey();
    
    if (!apiKey) {
      throw new Error("API_KEY_MISSING");
    }

    const requestBody = {
      contents: [{
        parts: [{
          text: `${SYSTEM_MESSAGE}\n\nUser Query: ${prompt}`
        }]
      }],
      generationConfig: {
        temperature: options.temperature || 0.7,
        maxOutputTokens: options.maxOutputTokens || 800,
      }
    };

    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey
      },
      body: JSON.stringify(requestBody)
    });

    const responseData = await response.json();

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('INVALID_API_KEY');
      } else if (response.status === 429) {
        throw new Error('RATE_LIMIT');
      } else {
        throw new Error(`API_ERROR: ${response.status}`);
      }
    }

    if (!responseData.candidates?.[0]?.content?.parts?.[0]?.text) {
      throw new Error('INVALID_RESPONSE_FORMAT');
    }

    return responseData.candidates[0].content.parts[0].text;

  } catch (error) {
    return handleApiError(error);
  }
}; 