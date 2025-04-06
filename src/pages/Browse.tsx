
// import { useState, useEffect } from "react";
// import { collectionGroup, onSnapshot } from "firebase/firestore";
// import { db } from "@/firebase";
// import FoodCard, { FoodItem } from "@/components/food/FoodCard";

// const Browse = () => {
//   const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // ✅ Fetch food donations from all restaurants using collectionGroup
//     const foodCollection = collectionGroup(db, "food_donations");

//     const unsubscribe = onSnapshot(foodCollection, (snapshot) => {
//       const updatedFood = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...(doc.data() as FoodItem),
//       }));

//       setFoodItems(updatedFood);
//       setLoading(false);
//     });

//     return () => unsubscribe();
//   }, []); // No dependency on user, fetches all food items

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">Available Food Donations</h2>
//       {loading ? (
//         <p>Loading food items...</p>
//       ) : foodItems.length === 0 ? (
//         <p>No food available for donation at the moment.</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {foodItems.map((food, index) => (
//             <FoodCard key={food.id} food={food} index={index} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Browse;


import { useState, useEffect } from "react";
import { collectionGroup, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase"; // ✅ Ensure correct Firebase import
import FoodCard, { FoodItem } from "@/components/food/FoodCard";

const Browse = () => {
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ✅ Use collectionGroup to listen to all food donations across restaurants
    const unsubscribe = onSnapshot(collectionGroup(db, "food_donations"), (snapshot) => {
      const updatedFood = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as FoodItem), // type assertion
      }));

      setFoodItems(updatedFood);
      setLoading(false);
    });

    return () => unsubscribe(); // Clean up listener
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Available Food Donations</h2>
      {loading ? (
        <p>Loading food items...</p>
      ) : foodItems.length === 0 ? (
        <p>No food available for donation at the moment.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {foodItems.map((food, index) => (
            <FoodCard key={food.id} food={food} index={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Browse;
