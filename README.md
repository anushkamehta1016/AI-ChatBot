# AI Travel Budget Planner

A web-based AI chatbot that helps users plan travel itineraries based on their budget and preferences. The application uses natural language processing to understand user queries and provides personalized travel recommendations.

## Features

- Natural language input processing with Google's Gemini API
- Budget breakdown visualization
- Travel recommendations (flights, hotels, activities)
- Responsive design that works on all devices
- Real-time data from travel APIs (simulated for demo)

## API Integrations

This project integrates with the following APIs:

1. **Google Gemini API** - For natural language processing and travel advice
2. **Skyscanner API** (simulated) - For flight options and pricing
3. **Amadeus API** (simulated) - For hotel and activity recommendations

> Note: In this demo version, the travel APIs are simulated with realistic mock data. In a production environment, you would connect to the actual APIs.

## How to Use

1. Enter your travel details in the chat, including:
   - Destination
   - Travel dates/month
   - Duration of stay
   - Budget

Example queries:
- "I want to travel to Paris in June for 5 days under $1000"
- "Plan a trip to Tokyo in April with a budget of $2500 for 7 days"

2. View the AI's recommendations including:
   - Budget allocation across different categories
   - Flight options
   - Hotel options
   - Activity suggestions

## Technical Implementation

This project is built using:
- React with TypeScript
- Tailwind CSS for styling
- shadcn/ui component library
- Google Gemini API for natural language processing
- Mock implementations of travel APIs (Skyscanner, Amadeus)

## Setup and Configuration

To use the Gemini API, you need to:

1. Set up your Gemini API key in the utils.ts file:
   - Replace "YOUR_GEMINI_API_KEY" in src/services/gemini/utils.ts with your actual API key
   - You can get an API key from the Google AI Studio (https://makersuite.google.com/app/apikey)

## Future Enhancements

- Integration with real travel APIs (Skyscanner, Amadeus)
- User authentication for saving travel plans
- Additional filters for specific preferences (travel style, accessibility needs)
- Multi-destination trip planning
- Itinerary generation with day-by-day planning
