import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";

const FoodDetailsPage = () => {
  const { restaurantId, foodId } = useParams();
  const [foodData, setFoodData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const foodRef = doc(db, "restaurants", restaurantId, "food_items", foodId);
        const foodSnap = await getDoc(foodRef);
        if (foodSnap.exists()) {
          setFoodData(foodSnap.data());
        }
      } catch (err) {
        console.error("Error fetching food details:", err);
      }
    };

    fetchData();
  }, [restaurantId, foodId]);

  if (!foodData) {
    return <div className="p-6">Loading food details...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">{foodData.foodItem}</h1>
      <p className="text-lg mb-2">Description: {foodData.description}</p>
      <p className="text-lg mb-2">Quantity: {foodData.quantity}</p>
      <p className="text-lg mb-2">Location: {foodData.location}</p>
      <p className="text-lg mb-2">Expiry: {foodData.expiry}</p>
      <p className="text-lg mb-2">Category: {foodData.category}</p>
    </div>
  );
};

export default FoodDetailsPage;
