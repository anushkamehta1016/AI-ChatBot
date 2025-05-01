
import { toast } from "sonner";

// Interface for search parameters
export interface SearchParams {
  destination: string;
  dateFrom: Date;
  dateTo: Date;
  travelers: number;
  budget: number;
  transportType: string;
}

// Function to handle search requests
export const submitSearch = async (params: SearchParams) => {
  try {
    console.log("Submitting search to backend:", params);
    
    // In a real application, this would be an API call to your backend
    // For now, we'll simulate a successful response
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Return a success response
    return {
      success: true,
      message: "Search submitted successfully",
      results: [
        {
          id: "result-1",
          destination: params.destination || "Paris",
          price: params.budget * 0.8,
          date: `${params.dateFrom.toLocaleDateString()} - ${params.dateTo.toLocaleDateString()}`,
          transport: params.transportType
        }
      ]
    };
  } catch (error) {
    console.error("Error submitting search:", error);
    toast.error("Failed to submit search. Please try again.");
    return { success: false, message: "Failed to submit search" };
  }
};

// Function to handle newsletter subscriptions
export const subscribeToNewsletter = async (email: string) => {
  try {
    console.log("Subscribing to newsletter:", email);
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return { success: false, message: "Invalid email format" };
    }
    
    // Simulate API call to backend
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Return success response
    toast.success("Successfully subscribed to newsletter!");
    return { success: true, message: "Successfully subscribed to newsletter" };
  } catch (error) {
    console.error("Error subscribing to newsletter:", error);
    toast.error("Failed to subscribe. Please try again.");
    return { success: false, message: "Failed to subscribe" };
  }
};

// Function to get travel recommendations
export const getTravelRecommendations = async (budget?: number, preferredTransport?: string) => {
  try {
    console.log("Getting travel recommendations:", { budget, preferredTransport });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    // Return mock recommendations
    return {
      success: true,
      recommendations: [
        {
          title: "Weekend in Paris",
          description: "Experience the city of lights",
          destination: "Paris, France",
          price: 1200,
          type: "flight",
          image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&auto=format&fit=crop"
        },
        {
          title: "Beach getaway in Bali",
          description: "Relax in paradise",
          destination: "Bali, Indonesia",
          price: 1800,
          type: "flight",
          image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=600&auto=format&fit=crop"
        },
        {
          title: "Mountain retreat in Switzerland",
          description: "Breathtaking alpine views",
          destination: "Lucerne, Switzerland",
          price: 1500,
          type: "train",
          image: "https://images.unsplash.com/photo-1508188609395-d257fdd599c4?w=600&auto=format&fit=crop"
        }
      ]
    };
  } catch (error) {
    console.error("Error getting travel recommendations:", error);
    return { 
      success: false, 
      message: "Failed to load recommendations",
      recommendations: [] 
    };
  }
};
