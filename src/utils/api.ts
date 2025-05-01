
import axios from 'axios';

/**
 * Fetches destination details for travel budget planning
 */
export const fetchDestinationDetails = async (destination: string) => {
  try {
    // In a real implementation, this would point to your actual API
    // For now, we'll simulate a response with more detailed mock data
    console.log(`Fetching details for: ${destination}`);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    // Destination-specific data
    const destinationMap: Record<string, any> = {
      paris: {
        averageCost: {
          accommodation: 150,
          food: 45,
          transportation: 15,
          activities: 60,
        },
        bestTimeToVisit: ['April', 'May', 'June', 'September', 'October'],
        currency: 'EUR',
        language: 'French',
        topAttractions: [
          'Eiffel Tower',
          'Louvre Museum',
          'Notre-Dame Cathedral',
          'Champs-Élysées',
          'Arc de Triomphe'
        ]
      },
      london: {
        averageCost: {
          accommodation: 170,
          food: 50,
          transportation: 18,
          activities: 65,
        },
        bestTimeToVisit: ['May', 'June', 'July', 'September'],
        currency: 'GBP',
        language: 'English',
        topAttractions: [
          'Tower of London',
          'British Museum',
          'Buckingham Palace',
          'London Eye',
          'Westminster Abbey'
        ]
      },
      tokyo: {
        averageCost: {
          accommodation: 130,
          food: 40,
          transportation: 12,
          activities: 50,
        },
        bestTimeToVisit: ['March', 'April', 'October', 'November'],
        currency: 'JPY',
        language: 'Japanese',
        topAttractions: [
          'Tokyo Skytree',
          'Meiji Shrine',
          'Senso-ji Temple',
          'Shinjuku Gyoen National Garden',
          'Tokyo Disneyland'
        ]
      },
      rome: {
        averageCost: {
          accommodation: 120,
          food: 35,
          transportation: 10,
          activities: 45,
        },
        bestTimeToVisit: ['April', 'May', 'September', 'October'],
        currency: 'EUR',
        language: 'Italian',
        topAttractions: [
          'Colosseum',
          'Vatican Museums',
          'Roman Forum',
          'Trevi Fountain',
          'Pantheon'
        ]
      },
      'new york': {
        averageCost: {
          accommodation: 250,
          food: 60,
          transportation: 25,
          activities: 80,
        },
        bestTimeToVisit: ['April', 'May', 'September', 'November'],
        currency: 'USD',
        language: 'English',
        topAttractions: [
          'Times Square',
          'Central Park',
          'Statue of Liberty',
          'Empire State Building',
          'Metropolitan Museum of Art'
        ]
      },
    };
    
    // Normalize destination name for lookup
    const normalizedDestination = destination.toLowerCase();
    
    // Find the closest match or use default random data
    let destinationData;
    
    // Check if we have specific data for this destination
    for (const key in destinationMap) {
      if (normalizedDestination.includes(key) || key.includes(normalizedDestination)) {
        destinationData = {
          destination,
          ...destinationMap[key]
        };
        break;
      }
    }
    
    // If no match found, generate random data
    if (!destinationData) {
      destinationData = {
        destination,
        averageCost: {
          accommodation: Math.floor(Math.random() * 200) + 50,
          food: Math.floor(Math.random() * 50) + 20,
          transportation: Math.floor(Math.random() * 30) + 10,
          activities: Math.floor(Math.random() * 100) + 30,
        },
        bestTimeToVisit: ['June', 'July', 'August'],
        currency: 'USD',
        language: 'English',
        topAttractions: [
          'Local Landmark 1',
          'Famous Museum',
          'Popular District',
          'Historical Site',
          'Cultural Center'
        ]
      };
    }
    
    return destinationData;
  } catch (error) {
    console.error('Error fetching destination details:', error);
    throw error;
  }
};
