
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { TravelCard } from '@/components/TravelCard';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Filter } from 'lucide-react';
import { getTravelRecommendations } from '@/services/api';

interface Result {
  title: string;
  description: string;
  destination: string;
  price: number;
  type: 'flight' | 'hotel' | 'activity';
  image?: string;
  date?: string;
}

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = location.state?.searchParams;
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        // If no search params are provided, get general recommendations
        const budget = searchParams?.budget || 1500;
        const transport = searchParams?.transportType || 'flight';
        
        const response = await getTravelRecommendations(budget, transport);
        
        if (response.success && response.recommendations) {
          // Ensure all results have the correct 'type' property that matches the Result interface
          const typedResults = response.recommendations.map(item => ({
            ...item,
            // Ensure type is one of the allowed values
            type: (item.type === 'flight' || item.type === 'hotel' || item.type === 'activity') 
              ? item.type 
              : 'flight' as 'flight' | 'hotel' | 'activity'
          }));
          
          setResults(typedResults);
        } else {
          // If no results or error, set empty array
          setResults([]);
        }
      } catch (error) {
        console.error("Error fetching results:", error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [searchParams]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="h-4 w-4" /> Back to Search
        </Button>
        
        <div className="text-center flex-1">
          <h1 className="text-3xl font-bold">
            {searchParams?.destination 
              ? `Travel Options for ${searchParams.destination}` 
              : 'Recommended Trips for You'}
          </h1>
        </div>
        
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" /> Filter
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((result, index) => (
            <TravelCard
              key={index}
              title={result.title}
              description={result.description}
              destination={result.destination}
              price={result.price}
              type={result.type}
              image={result.image}
              date={result.date || searchParams?.date}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold mb-4">No results found</h2>
          <p className="text-gray-600 mb-8">Try adjusting your search criteria for better results</p>
          <Button onClick={() => navigate('/')}>Back to Search</Button>
        </div>
      )}
    </div>
  );
};

export default Results;
