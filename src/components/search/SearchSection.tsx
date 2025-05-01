
import React from 'react';
import { format } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { MapPin, CalendarIcon, Users, Search } from "lucide-react";
import { transportOptions } from '@/components/search/TransportOptions';

interface SearchSectionProps {
  destination: string;
  setDestination: (destination: string) => void;
  date: { from: Date | undefined; to: Date | undefined };
  setDate: (date: { from: Date | undefined; to: Date | undefined }) => void;
  travelers: number;
  setTravelers: (travelers: number) => void;
  budget: number;
  setBudget: (budget: number) => void;
  budgetPercentage: number;
  setBudgetPercentage: (percentage: number) => void;
  selectedTransport: string;
  setSelectedTransport: (transport: string) => void;
  handleSearch: () => void;
}

export const SearchSection = ({
  destination,
  setDestination,
  date,
  setDate,
  travelers,
  setTravelers,
  budget,
  setBudget,
  budgetPercentage,
  setBudgetPercentage,
  selectedTransport,
  setSelectedTransport,
  handleSearch
}: SearchSectionProps) => {
  return (
    <div id="search-section" className="content-area">
      <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Where Would You Like to Go?</h2>
      
      <Tabs defaultValue={selectedTransport} className="w-full">
        <TabsList className="grid grid-cols-6 mb-8 bg-card p-1 overflow-hidden">
          {transportOptions.map(option => {
            const isActive = selectedTransport === option.id;
            return (
              <TabsTrigger 
                key={option.id} 
                value={option.id}
                className={`flex items-center gap-2 py-3 font-medium transition-all ${
                  isActive ? `bg-gradient-to-r ${option.color} text-white shadow-lg` : 'hover:bg-accent/50'
                }`}
                onClick={() => setSelectedTransport(option.id)}
              >
                {option.icon}
                <span className="hidden md:inline">{option.name}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>
        
        {transportOptions.map(option => {
          const currentOption = transportOptions.find(o => o.id === option.id);
          return (
            <TabsContent key={option.id} value={option.id}>
              <Card className="border border-border/30 bg-card/70 backdrop-blur-md overflow-hidden shadow-xl">
                <CardHeader className="border-b border-border/10 bg-gradient-to-r from-black/40 to-transparent">
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <div className={`p-2 rounded-full bg-gradient-to-r ${currentOption?.color}`}>
                      {option.icon}
                    </div>
                    <span>{option.name} Search</span>
                  </CardTitle>
                  <CardDescription className="text-muted-foreground/80">
                    Find the best {option.name.toLowerCase()} options for your trip
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-blue-400" /> Destination
                      </label>
                      <div className="relative">
                        <Input 
                          value={destination} 
                          onChange={(e) => setDestination(e.target.value)} 
                          placeholder="Where to?"
                          className="pl-4 bg-background/50 border-border/30 focus:border-blue-400 transition-all focus:ring-2 focus:ring-blue-400/20"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center gap-1.5">
                        <CalendarIcon className="w-4 h-4 text-purple-400" /> Dates
                      </label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-left font-normal bg-background/50 border-border/30 hover:bg-background/70">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date.from ? (
                              date.to ? (
                                <>
                                  {format(date.from, "MMM d")} - {format(date.to, "MMM d, yyyy")}
                                </>
                              ) : (
                                format(date.from, "MMM d, yyyy")
                              )
                            ) : (
                              <span>Select dates</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 border border-border/30 bg-card shadow-xl" align="start">
                          <Calendar
                            mode="range"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                            className="rounded-md bg-card"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center gap-1.5">
                        <Users className="w-4 h-4 text-green-400" /> Travelers
                      </label>
                      <div className="relative">
                        <Input 
                          type="number" 
                          min="1"
                          value={travelers} 
                          onChange={(e) => setTravelers(parseInt(e.target.value) || 1)} 
                          className="pl-4 bg-background/50 border-border/30 focus:border-green-400 transition-all focus:ring-2 focus:ring-green-400/20"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center gap-1.5">
                        <span className="text-orange-400 font-bold">$</span> Budget
                      </label>
                      <div className="relative">
                        <Input 
                          type="number" 
                          min="0"
                          step="100"
                          value={budget} 
                          onChange={(e) => {
                            setBudget(parseInt(e.target.value) || 0);
                            setBudgetPercentage(Math.min(100, Math.max(0, parseInt(e.target.value) / 30)));
                          }} 
                          className="pl-4 bg-background/50 border-border/30 focus:border-orange-400 transition-all focus:ring-2 focus:ring-orange-400/20"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <label className="text-sm font-medium flex items-center gap-1.5">Budget Range</label>
                    <div className="budget-container mt-2">
                      <div 
                        className="budget-bar" 
                        style={{ width: `${budgetPercentage}%` }} 
                      />
                    </div>
                    <div className="flex justify-between text-xs mt-1">
                      <span className="text-green-400 font-medium">Economy</span>
                      <span className="text-yellow-400 font-medium">Comfortable</span>
                      <span className="text-red-400 font-medium">Luxury</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t border-border/10 bg-gradient-to-r from-black/20 to-transparent">
                  <Button 
                    className={`bg-gradient-to-r ${currentOption?.color} hover:${currentOption?.hoverColor} text-white w-full sm:w-auto transition-all hover:scale-105 shadow-lg`}
                    onClick={handleSearch}
                  >
                    <Search className="mr-2 h-4 w-4" />
                    Search {option.name}s
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
};

export default SearchSection;
