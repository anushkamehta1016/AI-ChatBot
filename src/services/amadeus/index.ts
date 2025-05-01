
// Main export file for Amadeus services

// Re-export types
export type { HotelOption, ActivityOption } from './types';

// Re-export hotel functionality
export { 
  getHotelOptions,
  formatHotelForTravelCard 
} from './hotels';

// Re-export activity functionality
export {
  getActivityOptions,
  formatActivityForTravelCard 
} from './activities';

// Re-export utility functions if needed externally
export { getFormattedDate } from './utils';
