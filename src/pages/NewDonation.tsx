import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

const NewDonation = () => {
  const [formData, setFormData] = useState({
    id: "",
    foodItem: "",
    description: "",
    quantity: "",
    expiry: "",
    category: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
  };

  return (
    <div className="max-w-xl mx-auto px-6 md:px-10 py-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <Card className="border-gray-200 dark:border-gray-800 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Add Food Item</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {Object.keys(formData).map((key) => (
                <div key={key} className="space-y-2">
                  <Label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</Label>
                  <Input id={key} name={key} placeholder={`Enter ${key}`} value={formData[key]} onChange={handleChange} />
                </div>
              ))}
              <Button type="submit" className="w-full">Submit</Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default NewDonation
;
