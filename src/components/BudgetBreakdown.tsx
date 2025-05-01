
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaneIcon, BedDoubleIcon, UtensilsIcon, CarIcon, LandmarkIcon } from "lucide-react";

interface BudgetCategory {
  name: string;
  amount: number;
  percentage: number;
  icon: React.ReactNode;
  color: string;
}

interface BudgetBreakdownProps {
  budget: number;
  currency: string;
  categories: BudgetCategory[];
}

export const BudgetBreakdown = ({ budget, currency, categories }: BudgetBreakdownProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <Card className="w-full mt-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex justify-between">
          <span>Budget Breakdown</span>
          <span className="font-bold text-travel-navy">{formatCurrency(budget)}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-1 h-3 mb-4 w-full rounded-full overflow-hidden">
          {categories.map((category, index) => (
            <div 
              key={index} 
              className="budget-bar" 
              style={{ 
                width: `${category.percentage}%`, 
                backgroundColor: category.color 
              }} 
            />
          ))}
        </div>

        <div className="space-y-3">
          {categories.map((category, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-full" style={{ backgroundColor: category.color }}>
                  {category.icon}
                </div>
                <span>{category.name}</span>
              </div>
              <div className="font-medium text-travel-navy">
                {formatCurrency(category.amount)} ({category.percentage}%)
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// Predefined icons and colors for budget categories
export const budgetIcons = {
  flight: <PlaneIcon size={16} className="text-white" />,
  hotel: <BedDoubleIcon size={16} className="text-white" />,
  food: <UtensilsIcon size={16} className="text-white" />,
  transport: <CarIcon size={16} className="text-white" />,
  sightseeing: <LandmarkIcon size={16} className="text-white" />
};

export const budgetColors = {
  flight: '#4EAAE0', // travel-blue
  hotel: '#FF7A59', // travel-orange
  food: '#34C759', // green
  transport: '#AF52DE', // purple
  sightseeing: '#FF9500' // orange
};
