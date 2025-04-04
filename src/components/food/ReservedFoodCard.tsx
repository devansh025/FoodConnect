import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Utensils, Info } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export interface ReservedFoodItem {
  id: string;
  foodItem: string;
  restaurant: string;
  location: string;
  description: string;
  quantity: string;
  expiry: string;
  category: string;
  restaurant_id: string;
}

interface ReservedFoodCardProps {
  food: ReservedFoodItem;
  index?: number;
}

const ReservedFoodCard = ({ food, index = 0 }: ReservedFoodCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Card className="overflow-hidden h-full transition-all duration-300 hover:shadow-md border-gray-200 dark:border-gray-800">
        <CardHeader className="p-4 pb-2">
          <div className="flex justify-between items-center">
            <div className="flex flex-col space-y-1">
              <h4 className="font-bold text-xl leading-tight">{food.foodItem}</h4>
              <p className="text-sm text-muted-foreground">{food.restaurant}</p>
            </div>
            <Badge
              className={food.category === "Non-Veg" ? "bg-red-500 hover:bg-red-600" : "bg-connect-green-500 hover:bg-connect-green-600"}
            >
              {food.category}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-4 pt-1">
          <p className="text-sm text-muted-foreground mb-2">{food.description}</p>

          <div className="space-y-2 text-sm">
            <div className="flex items-center">
              <Utensils className="h-4 w-4 mr-2 text-muted-foreground" />
              {food.quantity}
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
              Expires: {food.expiry}
            </div>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
              {food.location}
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <Link
              to={`/food/${food.restaurant_id}/${food.id}`}
              className="text-sm text-connect-green-600 hover:underline flex items-center"
            >
              <Info className="h-4 w-4 mr-1" />
              View Details
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ReservedFoodCard;
