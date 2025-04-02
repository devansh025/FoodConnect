
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { doc, getDoc } from "firebase/firestore";
// import { db } from "../firebase";
// import { Card, CardContent } from "@/components/ui/card";
// import { Clock, MapPin, Utensils } from "lucide-react";
// import { Button } from "@/components/ui/button";

// const FoodDetails = () => {
//   const { restaurantId, foodId } = useParams();
//   const [foodDetails, setFoodDetails] = useState(null);
//   const [restaurantDetails, setRestaurantDetails] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchFoodDetails = async () => {
//       if (!restaurantId || !foodId) {
//         console.error("Invalid URL parameters!");
//         setLoading(false);
//         return;
//       }

//       try {
//         // Fetch food donation details
//         const foodDocRef = doc(db, `restaurants/${restaurantId}/food_donations/${foodId}`);
//         const foodDocSnap = await getDoc(foodDocRef);

//         if (foodDocSnap.exists()) {
//           const foodData = foodDocSnap.data();
//           setFoodDetails(foodData);

//           // Fetch restaurant details
//           const restaurantDocRef = doc(db, `restaurants/${restaurantId}`);
//           const restaurantDocSnap = await getDoc(restaurantDocRef);

//           if (restaurantDocSnap.exists()) {
//             setRestaurantDetails(restaurantDocSnap.data());
//           }
//         } else {
//           console.error("Food item not found");
//         }
//       } catch (error) {
//         console.error("Error fetching data: ", error);
//       }
//       setLoading(false);
//     };

//     fetchFoodDetails();
//   }, [restaurantId, foodId]);

//   if (loading) {
//     return <div className="flex justify-center items-center h-screen">Loading...</div>;
//   }

//   if (!foodDetails || !restaurantDetails) {
//     return <div className="text-center text-red-500">Food details not found.</div>;
//   }

//   return (
//     <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
//       <Card>
//         <CardContent>
//           <h2 className="text-2xl font-bold mb-2">{foodDetails.foodItem}</h2>
//           <p className="text-gray-600">{foodDetails.description}</p>

//           <div className="mt-4 space-y-2">
//             <div className="flex items-center">
//               <Utensils className="h-5 w-5 mr-2 text-muted-foreground" />
//               <span>{foodDetails.quantity}</span>
//             </div>
//             <div className="flex items-center">
//               <Clock className="h-5 w-5 mr-2 text-muted-foreground" />
//               <span>Expires: {foodDetails.expiry} hours</span>
//             </div>
//             <div className="flex items-center">
//               <MapPin className="h-5 w-5 mr-2 text-muted-foreground" />
//               <span>{foodDetails.location}</span>
//             </div>
//           </div>

//           <hr className="my-4" />

//           <h3 className="text-xl font-semibold">Pickup Information</h3>
//           <p><strong>Restaurant:</strong> {restaurantDetails.name}</p>
//           <p><strong>Address:</strong> {restaurantDetails.address}</p>
//           <p><strong>Contact Person:</strong> {restaurantDetails.contactPerson}</p>
//           <p><strong>Phone:</strong> {restaurantDetails.phone}</p>
//         </CardContent>
//       </Card>
//       <Button className="mt-6 bg-connect-green-500 hover:bg-connect-green-600">Reserve Now</Button>
//     </div>
//   );
// };

// export default FoodDetails;
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, MapPin, Utensils, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const FoodDetails = () => {
  const { restaurantId, foodId } = useParams();
  const [foodDetails, setFoodDetails] = useState(null);
  const [restaurantDetails, setRestaurantDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFoodDetails = async () => {
      if (!restaurantId || !foodId) {
        console.error("Invalid URL parameters!");
        setLoading(false);
        return;
      }

      try {
        const foodDocRef = doc(db, `restaurants/${restaurantId}/food_donations/${foodId}`);
        const foodDocSnap = await getDoc(foodDocRef);

        if (foodDocSnap.exists()) {
          const foodData = foodDocSnap.data();
          setFoodDetails(foodData);

          const restaurantDocRef = doc(db, `restaurants/${restaurantId}`);
          const restaurantDocSnap = await getDoc(restaurantDocRef);

          if (restaurantDocSnap.exists()) {
            setRestaurantDetails(restaurantDocSnap.data());
          }
        } else {
          console.error("Food item not found");
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
      setLoading(false);
    };

    fetchFoodDetails();
  }, [restaurantId, foodId]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!foodDetails || !restaurantDetails) {
    return <div className="text-center text-red-500">Food details not found.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="flex justify-between items-center mb-1">
        <h5 className="text-3xl font-bold">{foodDetails.foodItem}</h5>
        <Badge
          className={foodDetails.category === "Non-Veg" ? "bg-red-500 hover:bg-red-600" : "bg-connect-green-500 hover:bg-connect-green-600"}
        >
          {foodDetails.category}
        </Badge>
      </div>
      <p className="text-sm text-gray-500 mb-4">{restaurantDetails.name}</p>
      <p className="text-gray-700 mb-4">{foodDetails.description}</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card className="p-4 text-center">
          <Utensils className="h-6 w-6 mx-auto text-muted-foreground mb-2" />
          <p className="text-sm font-semibold">Quantity</p>
          <p className="text-gray-600">{foodDetails.quantity}</p>
        </Card>
        <Card className="p-4 text-center">
          <Clock className="h-6 w-6 mx-auto text-muted-foreground mb-2" />
          <p className="text-sm font-semibold">Expires At</p>
          <p className="text-gray-600">{foodDetails.expiry}</p>
        </Card>
        <Card className="p-4 text-center">
          <MapPin className="h-6 w-6 mx-auto text-muted-foreground mb-2" />
          <p className="text-sm font-semibold">Pickup Location</p>
          <p className="text-gray-600">{foodDetails.location}</p>
        </Card>
        <Card className="p-4 text-center">
          <Calendar className="h-6 w-6 mx-auto text-muted-foreground mb-2" />
          <p className="text-sm font-semibold">Posted</p>
          <p className="text-gray-600">{foodDetails.postedAt}</p>
        </Card>
      </div>

      <Card className="p-4 mb-6">
        <h3 className="text-xl font-semibold mb-2">Restaurant Information</h3>
        <p><strong>Name:</strong> {restaurantDetails.name}</p>
        <p><strong>Address:</strong> {restaurantDetails.address}</p>
        <p><strong>Contact Person:</strong> {restaurantDetails.contactPerson}</p>
        <p><strong>Phone:</strong> {restaurantDetails.phone}</p>
      </Card>

      <Card className="p-4 bg-yellow-100 border-l-4 border-yellow-500">
        <h3 className="text-lg font-semibold text-yellow-700">Important Note</h3>
        <p className="text-yellow-600">Please ensure timely pickup to avoid food wastage.</p>
      </Card>

      <Button className="mt-6 bg-connect-green-500 hover:bg-connect-green-600 w-full">Reserve Now</Button>
    </div>
  );
};

export default FoodDetails;
