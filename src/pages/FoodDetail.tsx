


// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { doc, getDoc } from "firebase/firestore";
// import { db } from "@/firebase";
// import { Clock, MapPin, Utensils } from "lucide-react";
// import { Button } from "@/components/ui/button";

// interface FoodItem {
//   id: string;
//   title: string;
//   restaurant: string;
//   location: string;
//   description: string;
//   quantity: string;
//   expiry: string;
//   category: string;
// }

// const FoodDetails = () => {
//   const { id } = useParams();
//   const [food, setFood] = useState<FoodItem | null>(null);

//   useEffect(() => {
//     const fetchFood = async () => {
//       if (!id) return;
//       const foodRef = doc(db, "food_donations", id);
//       const foodSnap = await getDoc(foodRef);

//       if (foodSnap.exists()) {
//         setFood({ id: foodSnap.id, ...foodSnap.data() } as FoodItem);
//       }
//     };

//     fetchFood();
//   }, [id]);

//   if (!food) return <p className="text-gray-500">Food details not found.</p>;

//   return (
//     <div className="container mx-auto py-8 px-4">
//       <h2 className="text-2xl font-semibold">{food.title}</h2>
//       <p className="text-gray-600">{food.restaurant}</p>
//       <p className="mt-4">{food.description}</p>

//       <div className="mt-4 space-y-2">
//         <div className="flex items-center">
//           <Utensils className="h-5 w-5 mr-2 text-muted-foreground" />
//           <span>{food.quantity}</span>
//         </div>
//         <div className="flex items-center">
//           <Clock className="h-5 w-5 mr-2 text-muted-foreground" />
//           <span>Expires: {food.expiry}</span>
//         </div>
//         <div className="flex items-center">
//           <MapPin className="h-5 w-5 mr-2 text-muted-foreground" />
//           <span>{food.location}</span>
//         </div>
//       </div>

//       <Button className="mt-6 bg-connect-green-500 hover:bg-connect-green-600">
//         Reserve Now
//       </Button>
//     </div>
//   );
// };

// export default FoodDetails;

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { Clock, MapPin, Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FoodItem {
  id: string;
  title: string;
  restaurant: string;
  location: string;
  description: string;
  quantity: string;
  expiry: string;
  category: string;
}

const FoodDetails = () => {
  const { restaurantId, donationId } = useParams(); // ✅ Extract restaurantId & donationId
  const [food, setFood] = useState<FoodItem | null>(null);

  useEffect(() => {
    const fetchFood = async () => {
      if (!restaurantId || !donationId) return;

      // ✅ Fetch food details from subcollection path
      const foodRef = doc(db, `restaurants/${restaurantId}/food_donations/${donationId}`);
      const foodSnap = await getDoc(foodRef);

      if (foodSnap.exists()) {
        setFood({ id: foodSnap.id, ...foodSnap.data() } as FoodItem);
      }
    };

    fetchFood();
  }, [restaurantId, donationId]);

  if (!food) return <p className="text-gray-500">Food details not found.</p>;

  return (
    <div className="container mx-auto py-8 px-4">
      <h2 className="text-2xl font-semibold">{food.title}</h2>
      <p className="text-gray-600">{food.restaurant}</p>
      <p className="mt-4">{food.description}</p>

      <div className="mt-4 space-y-2">
        <div className="flex items-center">
          <Utensils className="h-5 w-5 mr-2 text-muted-foreground" />
          <span>{food.quantity}</span>
        </div>
        <div className="flex items-center">
          <Clock className="h-5 w-5 mr-2 text-muted-foreground" />
          <span>Expires: {food.expiry}</span>
        </div>
        <div className="flex items-center">
          <MapPin className="h-5 w-5 mr-2 text-muted-foreground" />
          <span>{food.location}</span>
        </div>
      </div>

      <Button className="mt-6 bg-connect-green-500 hover:bg-connect-green-600">
        Reserve Now
      </Button>
    </div>
  );
};

export default FoodDetails;




