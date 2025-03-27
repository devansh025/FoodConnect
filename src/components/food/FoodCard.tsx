
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, Utensils, Info } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export interface FoodItem {
  id: string;
  title: string;
  restaurant: string;
  location: string;
  description: string;
  quantity: string;
  expiry: string;
  category: string;
  imageUrl: string;
}

interface FoodCardProps {
  food: FoodItem;
  index?: number;
}

const FoodCard = ({ food, index = 0 }: FoodCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Card className="overflow-hidden h-full transition-all duration-300 hover:shadow-md border-gray-200 dark:border-gray-800">
        <div className="relative h-48 w-full">
          <img
            src={food.imageUrl}
            alt={food.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute top-3 right-3">
            <Badge className="bg-connect-green-500 hover:bg-connect-green-600">{food.category}</Badge>
          </div>
        </div>
        
        <CardHeader className="p-4 pb-2">
          <div className="flex flex-col space-y-1">
            <h3 className="font-semibold text-lg leading-tight">{food.title}</h3>
            <p className="text-sm text-muted-foreground">{food.restaurant}</p>
          </div>
        </CardHeader>
        
        <CardContent className="p-4 pt-2 pb-2">
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {food.description}
          </p>
          
          <div className="space-y-2">
            <div className="flex items-center text-sm">
              <Utensils className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>{food.quantity}</span>
            </div>
            <div className="flex items-center text-sm">
              <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>Expires: {food.expiry}</span>
            </div>
            <div className="flex items-center text-sm">
              <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="truncate">{food.location}</span>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="p-4 pt-2 flex items-center justify-between">
          <Button asChild variant="outline" size="sm">
            <Link to={`/food/${food.id}`} className="flex items-center">
              <Info className="h-4 w-4 mr-1" /> 
              Details
            </Link>
          </Button>
          <Button asChild size="sm" className="bg-connect-green-500 hover:bg-connect-green-600">
            <Link to={`/food/${food.id}`}>
              Reserve
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default FoodCard;
