// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { doc, getDoc, deleteDoc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";
// import { getAuth } from "firebase/auth";
// import { db } from "../firebase";
// import { Card } from "@/components/ui/card";
// import { Clock, MapPin, Utensils, Calendar } from "lucide-react";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import Swal from "sweetalert2";
// import "sweetalert2/src/sweetalert2.scss";

// const FoodDetails = () => {
//   const { restaurantId, foodId } = useParams();
//   const [foodDetails, setFoodDetails] = useState(null);
//   const [restaurantDetails, setRestaurantDetails] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const auth = getAuth();

//   useEffect(() => {
//     const fetchFoodDetails = async () => {
//       if (!restaurantId || !foodId) {
//         console.error("❌ Missing restaurantId or foodId");
//         setLoading(false);
//         return;
//       }

//       try {
//         const foodRef = doc(db, `restaurants/${restaurantId}/food_donations/${foodId}`);
//         const foodSnap = await getDoc(foodRef);

//         if (foodSnap.exists()) {
//           setFoodDetails(foodSnap.data());

//           const restRef = doc(db, `restaurants/${restaurantId}`);
//           const restSnap = await getDoc(restRef);
//           if (restSnap.exists()) setRestaurantDetails(restSnap.data());
//         } else {
//           console.error("❌ Food not found");
//         }
//       } catch (error) {
//         console.error("🔥 Error fetching data:", error);
//       }
//       setLoading(false);
//     };

//     fetchFoodDetails();
//   }, [restaurantId, foodId]);

//   const handleReserve = async () => {
//     if (!auth.currentUser || !foodDetails) {
//       Swal.fire({
//         icon: "warning",
//         title: "Login Required!",
//         text: "You must be logged in to reserve food.",
//         confirmButtonColor: "#22c55e",
//       });
//       return;
//     }

//     try {
//       const ngoId = auth.currentUser.uid;
//       const timestamp = Date.now();
//       const formattedName = foodDetails.foodItem.replace(/\s+/g, "_");
//       const reservationId = `reserved_${formattedName}_${timestamp}`;

//       const reservationData = {
//         ...foodDetails,
//         reservedBy: ngoId,
//         reservationTime: new Date().toISOString(),
//       };

//       // Step 1: Mark the food as reserved (this triggers security rule check)
//       await updateDoc(doc(db, `restaurants/${restaurantId}/food_donations/${foodId}`), {
//         reserved_by: ngoId,
//         reserved_at: serverTimestamp(),
//       });

//       // Step 2: Add to NGO's reservation subcollection
//       await setDoc(doc(db, `ngos/${ngoId}/food_reservations/${reservationId}`), reservationData);

//       // Step 3: Delete from original food_donations list
//       await deleteDoc(doc(db, `restaurants/${restaurantId}/food_donations/${foodId}`));

//       // Success Alert
//       Swal.fire({
//         title: "🍽 Reserved!",
//         text: "You have successfully reserved the food.",
//         icon: "success",
//         confirmButtonText: "OK",
//         confirmButtonColor: "#22c55e",
//         background: "#ffffff",
//         color: "#14532d",
//         customClass: {
//           popup: "rounded-2xl shadow-lg p-6",
//         },
//       });
//     } catch (error) {
//       console.error("🔥 Reservation Error:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Reservation Failed",
//         text: error?.message || "Please try again later.",
//         confirmButtonColor: "#22c55e",
//       });
//     }
//   };

//   if (loading) return <div className="text-center mt-10">Loading...</div>;
//   if (!foodDetails || !restaurantDetails)
//     return <div className="text-red-500 text-center">Food details not found.</div>;

//   return (
//     <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
//       <div className="flex justify-between items-center mb-1">
//         <h5 className="text-3xl font-bold">{foodDetails.foodItem}</h5>
//         <Badge
//           className={
//             foodDetails.category === "Non-Veg"
//               ? "bg-red-500 hover:bg-red-600"
//               : "bg-connect-green-500 hover:bg-connect-green-600"
//           }
//         >
//           {foodDetails.category}
//         </Badge>
//       </div>
//       <p className="text-sm text-gray-500 mb-4">{restaurantDetails.name}</p>
//       <p className="text-gray-700 mb-4">{foodDetails.description}</p>

//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
//         <Card className="p-4 text-center">
//           <Utensils className="h-6 w-6 mx-auto text-muted-foreground mb-2" />
//           <p className="text-sm font-semibold">Quantity</p>
//           <p className="text-gray-600">{foodDetails.quantity}</p>
//         </Card>
//         <Card className="p-4 text-center">
//           <Clock className="h-6 w-6 mx-auto text-muted-foreground mb-2" />
//           <p className="text-sm font-semibold">Expires At</p>
//           <p className="text-gray-600">{foodDetails.expiry}</p>
//         </Card>
//         <Card className="p-4 text-center">
//           <MapPin className="h-6 w-6 mx-auto text-muted-foreground mb-2" />
//           <p className="text-sm font-semibold">Pickup Location</p>
//           <p className="text-gray-600">{foodDetails.location}</p>
//         </Card>
//         <Card className="p-4 text-center">
//           <Calendar className="h-6 w-6 mx-auto text-muted-foreground mb-2" />
//           <p className="text-sm font-semibold">Posted</p>
//           <p className="text-gray-600">{foodDetails.postedAt}</p>
//         </Card>
//       </div>

//       <Card className="p-4 mb-6">
//         <h3 className="text-xl font-semibold mb-2">Restaurant Info</h3>
//         <p><strong>Name:</strong> {restaurantDetails.name}</p>
//         <p><strong>Address:</strong> {restaurantDetails.address}</p>
//         <p><strong>Contact Person:</strong> {restaurantDetails.contactPerson}</p>
//         <p><strong>Phone:</strong> {restaurantDetails.phone}</p>
//       </Card>

//       <Card className="p-4 bg-yellow-100 border-l-4 border-yellow-500">
//         <h3 className="text-lg font-semibold text-yellow-700">Note</h3>
//         <p className="text-yellow-600">
//           Please ensure timely pickup to avoid food wastage.
//         </p>
//       </Card>

//       <Button
//         className="mt-6 bg-connect-green-500 hover:bg-connect-green-600 w-full"
//         onClick={handleReserve}
//       >
//         Reserve Now
//       </Button>
//     </div>
//   );
// };

// export default FoodDetails;




import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  doc,
  getDoc,
  runTransaction,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../firebase";
import { Card } from "@/components/ui/card";
import { Clock, MapPin, Utensils, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";

const FoodDetails = () => {
  const { restaurantId, foodId } = useParams();
  const [foodDetails, setFoodDetails] = useState(null);
  const [restaurantDetails, setRestaurantDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();

  useEffect(() => {
    const fetchFoodDetails = async () => {
      if (!restaurantId || !foodId) {
        console.error("❌ Missing restaurantId or foodId");
        setLoading(false);
        return;
      }

      try {
        const foodRef = doc(
          db,
          `restaurants/${restaurantId}/food_donations/${foodId}`
        );
        const foodSnap = await getDoc(foodRef);

        if (foodSnap.exists()) {
          setFoodDetails(foodSnap.data());

          const restRef = doc(db, `restaurants/${restaurantId}`);
          const restSnap = await getDoc(restRef);
          if (restSnap.exists()) setRestaurantDetails(restSnap.data());
        } else {
          console.error("❌ Food not found");
        }
      } catch (error) {
        console.error("🔥 Error fetching data:", error);
      }
      setLoading(false);
    };

    fetchFoodDetails();
  }, [restaurantId, foodId]);

  const handleReserve = async () => {
    if (!auth.currentUser || !foodDetails) {
      Swal.fire({
        icon: "warning",
        title: "Login Required!",
        text: "You must be logged in to reserve food.",
        confirmButtonColor: "#22c55e",
      });
      return;
    }

    const ngoId = auth.currentUser.uid;
    const timestamp = Date.now();
    const formattedName = foodDetails.foodItem.replace(/\s+/g, "_");
    const reservationId = `reserved_${formattedName}_${timestamp}`;

    const foodRef = doc(
      db,
      `restaurants/${restaurantId}/food_donations/${foodId}`
    );
    const ngoReservationRef = doc(
      db,
      `ngos/${ngoId}/food_reservations/${reservationId}`
    );

    try {
      await runTransaction(db, async (transaction) => {
        const foodSnap = await transaction.get(foodRef);

        if (!foodSnap.exists()) {
          throw new Error("Food item already reserved or no longer exists.");
        }

        const foodData = foodSnap.data();

        if (foodData.reserved_by) {
          throw new Error("This food has already been reserved.");
        }

        // Mark as reserved
        transaction.update(foodRef, {
          reserved_by: ngoId,
          reserved_at: serverTimestamp(),
        });

        // Add to NGO reservation subcollection
        transaction.set(ngoReservationRef, {
          ...foodData,
          reservedBy: ngoId,
          reservationTime: new Date().toISOString(),
        });

        // Delete from original food_donations
        transaction.delete(foodRef);
      });

      Swal.fire({
        title: "🍽 Reserved!",
        text: "You have successfully reserved the food.",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#22c55e",
        background: "#ffffff",
        color: "#14532d",
        customClass: {
          popup: "rounded-2xl shadow-lg p-6",
        },
      });
    } catch (error) {
      console.error("🔥 Reservation Error:", error);
      Swal.fire({
        icon: "error",
        title: "Reservation Failed",
        text: error?.message || "Please try again later.",
        confirmButtonColor: "#22c55e",
      });
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (!foodDetails || !restaurantDetails)
    return <div className="text-red-500 text-center">Food details not found.</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="flex justify-between items-center mb-1">
        <h5 className="text-3xl font-bold">{foodDetails.foodItem}</h5>
        <Badge
          className={
            foodDetails.category === "Non-Veg"
              ? "bg-red-500 hover:bg-red-600"
              : "bg-connect-green-500 hover:bg-connect-green-600"
          }
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
        <h3 className="text-xl font-semibold mb-2">Restaurant Info</h3>
        <p><strong>Name:</strong> {restaurantDetails.name}</p>
        <p><strong>Address:</strong> {restaurantDetails.address}</p>
        <p><strong>Contact Person:</strong> {restaurantDetails.contactPerson}</p>
        <p><strong>Phone:</strong> {restaurantDetails.phone}</p>
      </Card>

      <Card className="p-4 bg-yellow-100 border-l-4 border-yellow-500">
        <h3 className="text-lg font-semibold text-yellow-700">Note</h3>
        <p className="text-yellow-600">
          Please ensure timely pickup to avoid food wastage.
        </p>
      </Card>

      <Button
        className="mt-6 bg-connect-green-500 hover:bg-connect-green-600 w-full"
        onClick={handleReserve}
      >
        Reserve Now
      </Button>
    </div>
  );
};

export default FoodDetails;
