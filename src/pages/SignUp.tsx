import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/firebase.ts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { AtSign, Building, Lock, User, MapPin, Phone, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";

const SignUp = () => {
  const [userType, setUserType] = useState("restaurant");
  const [formData, setFormData] = useState({
    name: "",
    contactPerson: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    phone: "",
    agreeTerms: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.contactPerson || !formData.email || !formData.password || !formData.address || !formData.phone) {
      toast({ title: "Error", description: "Please fill in all required fields.", variant: "destructive" });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({ title: "Error", description: "Passwords do not match.", variant: "destructive" });
      return;
    }

    if (!formData.agreeTerms) {
      toast({ title: "Error", description: "You must agree to the terms and conditions.", variant: "destructive" });
      return;
    }

    setIsLoading(true);

    try {
      // Firebase authentication
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      // Store user details in Firestore
      const userCollection = userType === "restaurant" ? "restaurants" : "ngos";
      await setDoc(doc(db, userCollection, user.uid), {
        name: formData.name,
        contactPerson: formData.contactPerson,
        email: formData.email,
        address: formData.address,
        phone: formData.phone,
        userType: userType,
        createdAt: new Date(),
      });

      toast({ title: "Account created!", description: "Welcome to FoodConnect. You can now sign in." });
      navigate("/login");
    } catch (error) {
      toast({ title: "Error", description: error instanceof Error ? error.message : "An unknown error occurred", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-6 md:px-10 py-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <Card className="border-gray-200 dark:border-gray-800 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
            <CardDescription>Join FoodConnect and start making a difference</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="restaurant" onValueChange={setUserType}>
              <TabsList className="grid grid-cols-2">
                <TabsTrigger value="restaurant">Restaurant</TabsTrigger>
                <TabsTrigger value="ngo">NGO</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>{userType === "restaurant" ? "Restaurant Name" : "Organization Name"}</Label>
                <Input name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label>Contact Person</Label>
                <Input name="contactPerson" placeholder="Full Name" value={formData.contactPerson} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input name="email" type="email" placeholder="your@email.com" value={formData.email} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label>Password</Label>
                <Input name="password" type="password" value={formData.password} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label>Confirm Password</Label>
                <Input name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label>Address</Label>
                <Input name="address" placeholder="Full address" value={formData.address} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label>Phone Number</Label>
                <Input name="phone" placeholder="Phone number" value={formData.phone} onChange={handleChange} />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="agreeTerms" name="agreeTerms" checked={formData.agreeTerms} onCheckedChange={(checked) => setFormData({ ...formData, agreeTerms: checked as boolean })} />
                <label htmlFor="agreeTerms" className="text-sm">
                  I agree to the <Link to="/terms" className="underline">terms of service</Link> and <Link to="/privacy" className="underline">privacy policy</Link>.
                </label>
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>{isLoading ? "Creating account..." : "Create Account"}</Button>
            </form>
          </CardContent>
          <CardFooter className="justify-center">
            <p className="text-sm">Already have an account? <Link to="/login" className="underline">Sign in</Link></p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default SignUp;
