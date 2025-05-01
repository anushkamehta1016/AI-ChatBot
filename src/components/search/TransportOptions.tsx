
import React from 'react';
import { Plane, Ship, Train, Car, Bus, Bike } from "lucide-react";

export const transportOptions = [
  { 
    id: "flight", 
    name: "Flight", 
    icon: <Plane className="w-5 h-5" />,
    color: "from-blue-500 to-indigo-600",
    hoverColor: "from-blue-600 to-indigo-700"
  },
  { 
    id: "cruise", 
    name: "Cruise", 
    icon: <Ship className="w-5 h-5" />,
    color: "from-cyan-500 to-blue-600",
    hoverColor: "from-cyan-600 to-blue-700"
  },
  { 
    id: "train", 
    name: "Train", 
    icon: <Train className="w-5 h-5" />,
    color: "from-green-500 to-emerald-600",
    hoverColor: "from-green-600 to-emerald-700"
  },
  { 
    id: "car", 
    name: "Car Rental", 
    icon: <Car className="w-5 h-5" />,
    color: "from-orange-500 to-red-600",
    hoverColor: "from-orange-600 to-red-700"
  },
  { 
    id: "bus", 
    name: "Bus", 
    icon: <Bus className="w-5 h-5" />,
    color: "from-yellow-500 to-amber-600",
    hoverColor: "from-yellow-600 to-amber-700"
  },
  { 
    id: "bike", 
    name: "Bike Rental", 
    icon: <Bike className="w-5 h-5" />,
    color: "from-teal-500 to-emerald-600",
    hoverColor: "from-teal-600 to-emerald-700"
  },
];

export default transportOptions;
