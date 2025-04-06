// import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Clock, MapPin, Utensils, Info } from "lucide-react";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";

// export interface FoodItem {
//   id: string;
//   foodItem: string;
//   restaurant: string;
//   location: string;
//   description: string;
//   quantity: string;
//   expiry: string;
//   category: string;
//   restaurant_id: string; // Ensure the restaurant_id is added here
// }

// interface FoodCardProps {
//   food: FoodItem;
//   index?: number;
// }

// const FoodCard = ({ food, index = 0 }: FoodCardProps) => {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.4, delay: index * 0.05 }}
//     >
//       <Card className="overflow-hidden h-full transition-all duration-300 hover:shadow-md border-gray-200 dark:border-gray-800">
//         <CardHeader className="p-4 pb-2">
//           <div className="flex justify-between items-center">
//             <div className="flex flex-col space-y-1">
//               <h4 className="font-bold text-xl leading-tight">{food.foodItem}</h4>
//               <p className="text-sm text-muted-foreground">{food.restaurant}</p>
//             </div>
//             <Badge
//               className={food.category === "Non-Veg" ? "bg-red-500 hover:bg-red-600" : "bg-connect-green-500 hover:bg-connect-green-600"}
//             >
//               {food.category}
//             </Badge>
//           </div>
//         </CardHeader>

//         <CardContent className="p-4 pt-1 pb-2">
//           <p className="text-sm text-muted-foreground mb-2">{food.description}</p>

//           <div className="space-y-2">
//             <div className="flex items-center text-sm">
//               <Utensils className="h-4 w-4 mr-2 text-muted-foreground" />
//               <span>{food.quantity}</span>
//             </div>
//             <div className="flex items-center text-sm">
//               <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
//               <span>Expires: {food.expiry}</span>
//             </div>
//             <div className="flex items-center text-sm">
//               <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
//               <span className="truncate">{food.location}</span>
//             </div>
//           </div>
//         </CardContent>

//         <CardFooter className="p-4 pt-2 flex items-center justify-between">
//           {/* Link to Food Detail Page */}
//           <Button asChild variant="outline" size="sm">
//             <Link to={`/food/${food.restaurant_id}/${food.id}`} className="flex items-center">
//               <Info className="h-4 w-4 mr-1" />
//               Details
//             </Link>
//           </Button>

//           {/* Link to Reserve Page */}
//           <Button asChild size="sm" className="bg-connect-green-500 hover:bg-connect-green-600">
//             <Link to={`/food/${food.restaurant_id}/${food.id}`}>Reserve</Link>
//           </Button>
//         </CardFooter>
//       </Card>
//     </motion.div>
//   );
// };

// export default FoodCard;

import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Utensils, Info } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase"; // Your Firebase config

export interface FoodItem {
  id: string;
  foodItem: string;
  restaurant: string;
  location: string;
  description: string;
  quantity: string;
  expiry: string;
  category: string;
  restaurant_id: string;
  postedAt?: string;
}

interface FoodCardProps {
  food: FoodItem;
  index?: number;
}

const FoodCard = ({ food, index = 0 }: FoodCardProps) => {
  const [postedAt, setPostedAt] = useState<string>("");

  useEffect(() => {
    const fetchPostedAt = async () => {
      try {
        const foodDocRef = doc(db, "restaurants", food.restaurant_id, "food_donations", food.id);
        const foodDocSnap = await getDoc(foodDocRef);
        if (foodDocSnap.exists()) {
          const data = foodDocSnap.data();
          if (data.postedAt) {
            const dateObj = new Date(data.postedAt);
            setPostedAt(`${dateObj.toLocaleString()} hrs`);
          }
        }
      } catch (error) {
        console.error("Error fetching postedAt:", error);
      }
    };

    fetchPostedAt();
  }, [food.id, food.restaurant_id]);

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

        <CardContent className="p-4 pt-1 pb-2">
          <p className="text-sm text-muted-foreground mb-2">{food.description}</p>

          <div className="space-y-2">
            <div className="flex items-center text-sm">
              <Utensils className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>{food.quantity}</span>
            </div>
            <div className="flex items-center text-sm">
              <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>Expires in: {food.expiry} hrs</span>
            </div>
            {postedAt && (
              <div className="flex items-center text-sm">
                <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>Posted At: {postedAt}</span>
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-2 flex items-center justify-between">
          <Button asChild variant="outline" size="sm">
            <Link to={`/food/${food.restaurant_id}/${food.id}`} className="flex items-center">
              <Info className="h-4 w-4 mr-1" />
              Details
            </Link>
          </Button>

          <Button asChild size="sm" className="bg-connect-green-500 hover:bg-connect-green-600">
            <Link to={`/food/${food.restaurant_id}/${food.id}`}>Reserve</Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default FoodCard;

