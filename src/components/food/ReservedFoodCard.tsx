// import { Card } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Clock, MapPin, Utensils, Info } from "lucide-react";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";

// export interface ReservedFoodItem {
//   id: string;
//   foodItem: string;
//   restaurant: string;
//   location: string;
//   description: string;
//   quantity: string;
//   expiry: string;
//   category: string;
//   restaurant_id: string;
// }

// interface ReservedFoodCardProps {
//   food: ReservedFoodItem;
//   index?: number;
// }

// const ReservedFoodCard = ({ food, index = 0 }: ReservedFoodCardProps) => {
//   return (
//     <motion.div
//       className="mb-4"
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.4, delay: index * 0.05 }}
//     >
//       <Card className="w-full px-6 py-4 flex flex-col md:flex-row items-center justify-between border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 min-h-[110px]">
//         {/* Left Info Section */}
//         <div className="flex flex-col md:flex-row md:items-center gap-6 flex-1 w-full">
//           {/* Food Name & Restaurant */}
//           <div className="min-w-[180px]">
//             <h4 className="text-lg font-semibold">{food.foodItem}</h4>
//             <p className="text-sm text-muted-foreground">{food.restaurant}</p>
//           </div>

//           {/* Quantity */}
//           <div className="flex items-center text-sm text-muted-foreground">
//             <Utensils className="w-4 h-4 mr-1" />
//             {food.quantity}
//           </div>

//           {/* Expiry */}
//           <div className="flex items-center text-sm text-muted-foreground">
//             <Clock className="w-4 h-4 mr-1" />
//             {food.expiry}
//           </div>

//           {/* Location */}
//           <div className="flex items-center text-sm text-muted-foreground">
//             <MapPin className="w-4 h-4 mr-1" />
//             {food.location}
//           </div>

//           {/* Category */}
//           <Badge
//             className={`${
//               food.category === "Non-Veg"
//                 ? "bg-red-500 hover:bg-red-600"
//                 : "bg-connect-green-500 hover:bg-connect-green-600"
//             }`}
//           >
//             {food.category}
//           </Badge>
//         </div>

//         {/* Right Action Section */}
//         <div className="mt-4 md:mt-0 md:ml-6">
//           <Link
//             to={`/food/${food.restaurant_id}/${food.id}`}
//             className="text-sm text-connect-green-600 hover:underline flex items-center"
//           >
//             <Info className="h-4 w-4 mr-1" />
//             View Details
//           </Link>
//         </div>
//       </Card>
//     </motion.div>
//   );
// };

// export default ReservedFoodCard;
import { Card } from "@/components/ui/card";
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
      className="relative mb-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Card className="w-full p-6 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden">
        {/* Category Badge - Top Right */}
        <div className="absolute top-4 right-4 z-10">
          <Badge
            className={`${
              food.category === "Non-Veg"
                ? "bg-red-500 hover:bg-red-600"
                : "bg-connect-green-500 hover:bg-connect-green-600"
            }`}
          >
            {food.category}
          </Badge>
        </div>

        <div className="flex flex-col gap-2">
          {/* Top: Food Name & Restaurant */}
          <div>
            <h4 className="text-2xl font-bold">{food.foodItem}</h4> 
            <p className="text-sm text-muted-foreground">{food.restaurant}</p>
          </div>

          {/* Details row */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mt-2">
            <div className="flex items-center">
              <Utensils className="w-4 h-4 mr-1" />
              {food.quantity}
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {food.expiry}
            </div>
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              {food.location}
            </div>
          </div>

          {/* Bottom: View Details Link */}
          <div className="mt-3">
            <Link
              to={`/food/${food.restaurant_id}/${food.id}`}
              className="text-sm text-connect-green-600 hover:underline flex items-center"
            >
              <Info className="h-4 w-4 mr-1" />
              View Details
            </Link>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default ReservedFoodCard;
