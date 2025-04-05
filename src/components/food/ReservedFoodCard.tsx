import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export interface ReservedFoodItem {
  id: string;
  foodItem: string;
  category: string;
  // The rest of the fields are not needed for display anymore
}

interface ReservedFoodCardProps {
  food: ReservedFoodItem;
  index?: number;
}

// Function to determine border color based on category
const getBorderColor = (category: string) => {
  switch (category?.toLowerCase()) {
    case "veg":
      return "border-green-500";
    case "non-veg":
      return "border-red-500";
    case "vegan":
      return "border-emerald-500";
    default:
      return "border-gray-300";
  }
};

const ReservedFoodCard = ({ food, index = 0 }: ReservedFoodCardProps) => {
  return (
    <motion.div
      className="relative mb-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Card className={`border-2 shadow-sm ${getBorderColor(food.category)}`}>
        <CardContent className="py-6 text-center font-semibold text-lg">
          {food.foodItem}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ReservedFoodCard;
