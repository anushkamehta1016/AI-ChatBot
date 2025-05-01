
/**
 * A utility function to calculate budget breakdown
 */
export const calculateBudgetBreakdown = (totalBudget: number, destination: string) => {
  // In a real app, these percentages would be based on destination data
  // For now, using sample percentages based on typical travel expenses
  let flightPercent, hotelPercent, foodPercent, transportPercent, sightseeingPercent;
  
  // Different allocations based on destination type
  if (['paris', 'london', 'tokyo', 'new york', 'singapore'].includes(destination.toLowerCase())) {
    // Expensive cities
    flightPercent = 35;
    hotelPercent = 35;
    foodPercent = 15;
    transportPercent = 5;
    sightseeingPercent = 10;
  } else if (['bangkok', 'mexico city', 'istanbul', 'kuala lumpur'].includes(destination.toLowerCase())) {
    // Budget-friendly international destinations
    flightPercent = 45;
    hotelPercent = 25;
    foodPercent = 10;
    transportPercent = 10;
    sightseeingPercent = 10;
  } else {
    // Default allocation
    flightPercent = 40;
    hotelPercent = 30;
    foodPercent = 15;
    transportPercent = 10;
    sightseeingPercent = 5;
  }
  
  return [
    { 
      name: 'Flight',
      amount: Math.round(totalBudget * (flightPercent / 100)),
      percentage: flightPercent,
      category: 'flight'
    },
    { 
      name: 'Hotel',
      amount: Math.round(totalBudget * (hotelPercent / 100)),
      percentage: hotelPercent,
      category: 'hotel'
    },
    { 
      name: 'Food',
      amount: Math.round(totalBudget * (foodPercent / 100)),
      percentage: foodPercent,
      category: 'food'
    },
    { 
      name: 'Transport',
      amount: Math.round(totalBudget * (transportPercent / 100)),
      percentage: transportPercent,
      category: 'transport'
    },
    { 
      name: 'Sightseeing',
      amount: Math.round(totalBudget * (sightseeingPercent / 100)),
      percentage: sightseeingPercent,
      category: 'sightseeing'
    },
  ];
};

/**
 * Parse a user message to extract travel details
 */
export const parseTravelDetails = (message: string) => {
  // In a real app, this would use NLP/AI to parse the message
  // For now, using simple regex patterns
  
  // Extract destination
  const destinationMatch = message.match(/(?:to|in) ([A-Za-z\s]+?)(?:\s+(?:in|for|from|under|with|\$|€|£|\d)|\s*$)/i);
  const destination = destinationMatch ? destinationMatch[1].trim() : null;
  
  // Extract duration
  const durationMatch = message.match(/(?:for|stay(?:ing)?\s+(?:for)?) (\d+) (?:days|nights|weeks)/i);
  const duration = durationMatch ? parseInt(durationMatch[1], 10) : null;
  
  // Extract budget
  const budgetMatch = message.match(/(?:under|with|budget of|for|only) (?:\$|€|£)?(\d+(?:\,\d+)?)/i);
  const budget = budgetMatch ? parseInt(budgetMatch[1].replace(',', ''), 10) : null;
  
  // Extract date/month
  const months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
  const monthPattern = months.join('|');
  const dateMatch = message.match(new RegExp(`(?:in|during) (${monthPattern})`, 'i'));
  const month = dateMatch ? dateMatch[1] : null;
  
  return {
    destination,
    duration,
    budget,
    month
  };
};

// This function is kept for backwards compatibility but is now just a placeholder
// Real data will come from our API services
export const generateMockTravelData = (
  destination: string, 
  budget: number, 
  duration: number = 5
) => {
  return {
    flights: [],
    hotels: [],
    activities: []
  };
};

/**
 * Generate AI response based on travel details - used as a fallback
 */
export const generateResponse = (
  destination: string | null, 
  budget: number | null, 
  duration: number | null, 
  month: string | null
) => {
  if (!destination || !budget) {
    return `I'd love to help plan your trip! Could you please provide more details about your destination and budget?`;
  }
  
  const durationText = duration ? `${duration} days in` : 'a trip to';
  const monthText = month ? `in ${month}` : '';
  const budgetText = `$${budget.toLocaleString()}`;
  
  return `Thanks for sharing your travel plans! I've analyzed your request for ${durationText} ${destination} ${monthText} with a budget of ${budgetText}.

Based on your budget, I've prepared a recommended breakdown of expenses and some options for flights, accommodations, and activities that fit within your budget.

You can view the suggested budget allocation below, and I've highlighted some travel options that provide good value. Would you like me to refine these recommendations or provide more specific details about any aspect of your trip?`;
};
