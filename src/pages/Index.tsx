
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { HeroSection } from "@/components/layout/HeroSection";
import { SearchSection } from "@/components/search/SearchSection";
import { PopularDestinations, popularDestinationsData } from "@/components/destinations/PopularDestinations";
import { FeaturesSection, featuresData } from "@/components/features/FeaturesSection";
import { Footer } from "@/components/layout/Footer";
import ChatButton from "@/components/layout/ChatButton";
import { SearchParams, submitSearch } from "@/services/api";
import { useNavigate } from "react-router-dom";
import { WelcomeBanner } from "@/components/WelcomeBanner";
import NewsletterSection from "@/components/newsletter/NewsletterSection";
import { toast } from "sonner";

export default function Index() {
  const navigate = useNavigate();
  const [destination, setDestination] = useState<string>("");
  const [date, setDate] = useState<{ from: Date; to: Date }>({
    from: new Date(),
    to: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });
  const [travelers, setTravelers] = useState<number>(1);
  const [budget, setBudget] = useState<number>(1500);
  const [budgetPercentage, setBudgetPercentage] = useState<number>(50);
  const [selectedTransport, setSelectedTransport] = useState<string>("flight");
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const handleSearch = async () => {
    setIsSearching(true);
    
    try {
      console.log("Searching for:", {
        destination,
        date,
        travelers,
        budget,
        selectedTransport,
      });

      const searchParams: SearchParams = {
        destination,
        dateFrom: date.from,
        dateTo: date.to,
        travelers,
        budget,
        transportType: selectedTransport,
      };

      const response = await submitSearch(searchParams);
      
      if (response.success) {
        toast.success("Search successful!");
        navigate("/results", { state: { searchParams } });
      } else {
        toast.error("Search failed. Please try again.");
      }
    } catch (error) {
      console.error("Search error:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSearching(false);
    }
  };

  const handleStartPlanning = () => {
    navigate('/chat');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section with Search */}
      <div className="bg-slate-900 text-white">
        <WelcomeBanner />
        <HeroSection onStartClick={handleStartPlanning} />
        <div className="container mx-auto px-4 pb-12">
          <SearchSection 
            destination={destination}
            setDestination={setDestination}
            date={date}
            setDate={setDate}
            travelers={travelers}
            setTravelers={setTravelers}
            budget={budget}
            setBudget={setBudget}
            budgetPercentage={budgetPercentage}
            setBudgetPercentage={setBudgetPercentage}
            selectedTransport={selectedTransport}
            setSelectedTransport={setSelectedTransport}
            handleSearch={handleSearch}
          />
        </div>
      </div>

      {/* Main content */}
      <div className="flex-grow">
        <PopularDestinations destinations={popularDestinationsData} />
        <FeaturesSection features={featuresData} />
        <NewsletterSection />
      </div>

      {/* Chat button */}
      <ChatButton />

      {/* Footer */}
      <Footer />
    </div>
  );
}
