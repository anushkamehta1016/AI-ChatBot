// Types for Gemini API services

export interface GeminiRequestOptions {
  temperature?: number;
  maxOutputTokens?: number;
}

export interface GeminiResponse {
  text: string;
} 