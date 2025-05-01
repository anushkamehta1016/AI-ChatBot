import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlaneIcon, BedDoubleIcon, CalendarIcon, DollarSignIcon } from "lucide-react";

interface TravelCardProps {
  title: string;
  description: string;
  destination: string;
  price: number;
  currency?: string;
  date?: string;
  type: 'flight' | 'hotel' | 'activity';
  image?: string;
}

export const TravelCard = ({
  title,
  description,
  destination,
  price,
  currency = 'USD',
  date,
  type,
  image
}: TravelCardProps) => {
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  const getIcon = () => {
    switch (type) {
      case 'flight':
        return <PlaneIcon className="h-5 w-5" />;
      case 'hotel':
        return <BedDoubleIcon className="h-5 w-5" />;
      case 'activity':
        return <CalendarIcon className="h-5 w-5" />;
      default:
        return <DollarSignIcon className="h-5 w-5" />;
    }
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105">
      {image && (
        <div className="h-48 w-full overflow-hidden relative">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      )}
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription className="text-sm">{destination}</CardDescription>
          </div>
          <Badge 
            variant="outline" 
            className={`
              flex items-center gap-1 font-medium px-2 py-1
              ${type === 'flight' ? 'bg-travel-blue/10 text-travel-blue border-travel-blue/20' : ''}
              ${type === 'hotel' ? 'bg-travel-orange/10 text-travel-orange border-travel-orange/20' : ''}
              ${type === 'activity' ? 'bg-green-500/10 text-green-600 border-green-500/20' : ''}
            `}
          >
            {getIcon()}
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{description}</p>
        {date && (
          <div className="flex items-center gap-1 text-sm text-muted-foreground mt-2">
            <CalendarIcon className="h-4 w-4" />
            {date}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <div className="font-bold text-travel-navy">{formatCurrency(price)}</div>
        <Button variant="outline" size="sm">View Details</Button>
      </CardFooter>
    </Card>
  );
};
