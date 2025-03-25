import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/firebase";
import { getAuth } from "firebase/auth";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const NewDonation = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  const [formData, setFormData] = useState({
    foodItem: "",
    description: "",
    quantity: "",
    expiry: "", // Expiry in hours
    category: "Veg",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!auth.currentUser) {
      alert("You must be logged in as a restaurant to add a donation!");
      return;
    }

    if (isNaN(formData.expiry) || formData.expiry <= 0) {
      alert("Please enter a valid number of hours for expiry.");
      return;
    }

    setLoading(true);

    const donationData = {
      ...formData,
      restaurant_id: auth.currentUser.uid,
      createdAt: serverTimestamp(),
    };

    try {
      await addDoc(collection(db, "food_donations"), donationData);
      alert("Donation added successfully!");
      navigate("/restaurant/dashboard");
    } catch (err) {
      console.error("🔥 Error adding donation:", err);
      alert(`❌ Failed to add donation: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-6 md:px-10 py-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <Card className="border-gray-200 dark:border-gray-800 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Add Food Donation</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {Object.keys(formData).map((key) => (
                key === "category" ? (
                  <div key={key} className="space-y-2">
                    <Label htmlFor={key}>Category</Label>
                    <select id={key} name={key} value={formData[key]} onChange={handleChange} className="w-full p-2 border rounded">
                      <option value="Veg">Veg</option>
                      <option value="Non-Veg">Non-Veg</option>
                    </select>
                  </div>
                ) : key === "expiry" ? (
                  <div key={key} className="space-y-2">
                    <Label htmlFor={key}>Expiry (Hours)</Label>
                    <Input id={key} name={key} type="number" min="1" placeholder="Enter expiry in hours" value={formData[key]} onChange={handleChange} required />
                  </div>
                ) : (
                  <div key={key} className="space-y-2">
                    <Label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</Label>
                    <Input id={key} name={key} placeholder={`Enter ${key}`} value={formData[key]} onChange={handleChange} required />
                  </div>
                )
              ))}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Submitting..." : "Submit"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default NewDonation;