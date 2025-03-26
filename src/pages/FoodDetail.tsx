
// import { useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
// import { Textarea } from "@/components/ui/textarea";
// import { useToast } from "@/hooks/use-toast";
// import { Clock, MapPin, Utensils, User, Store, ChevronLeft, Calendar, Phone, MessageSquare, Check, AlertTriangle } from "lucide-react";
// import { motion } from "framer-motion";

// // Placeholder data (in a real app, this would come from an API)
// const foodItems = [
//   {
//     id: "1",
//     title: "Fresh Pasta & Salad",
//     restaurant: "Bella Italian",
//     restaurantInfo: {
//       name: "Bella Italian",
//       address: "123 Main St, City Center",
//       contact: "+1 (555) 123-4567",
//       owner: "Marco Rossi",
//     },
//     location: "123 Main St, City Center",
//     description: "Delicious pasta with homemade tomato sauce and fresh garden salad with balsamic dressing. Perfect for a quick meal or event. Contains gluten and dairy. Food was prepared today and has been properly stored. We have more than we can use and want to make sure it goes to people who can enjoy it!",
//     quantity: "5 servings",
//     expiry: "Today, 8:00 PM",
//     category: "Italian",
//     postedAt: "Today, 2:30 PM",
//     dietaryInfo: ["Contains gluten", "Contains dairy"],
//     imageUrl: "https://images.unsplash.com/photo-1546549032-9571cd6b27df?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//   },
//   {
//     id: "2",
//     title: "Vegetable Curry",
//     restaurant: "Spice Garden",
//     restaurantInfo: {
//       name: "Spice Garden",
//       address: "45 Park Ave, East Side",
//       contact: "+1 (555) 987-6543",
//       owner: "Priya Sharma",
//     },
//     location: "45 Park Ave, East Side",
//     description: "Aromatic vegetable curry with basmati rice. Mild spice level, suitable for most palates. Vegan-friendly and made with fresh, local ingredients. Can be easily reheated. We made too much for our dinner service and would hate to see it go to waste.",
//     quantity: "3 kg",
//     expiry: "Today, 9:30 PM",
//     category: "Indian",
//     postedAt: "Today, 3:45 PM",
//     dietaryInfo: ["Vegan", "Gluten-free"],
//     imageUrl: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//   },
//   // Add more food items as in the Browse page
// ];

// const FoodDetail = () => {
//   const { id } = useParams<{ id: string }>();
//   const { toast } = useToast();
//   const [reservationNotes, setReservationNotes] = useState("");
//   const [isReserving, setIsReserving] = useState(false);
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
  
//   // Find the food item by ID
//   const foodItem = foodItems.find((item) => item.id === id);
  
//   if (!foodItem) {
//     return (
//       <div className="max-w-7xl mx-auto px-6 md:px-10 py-20 text-center">
//         <h2 className="text-2xl font-bold mb-4">Food Item Not Found</h2>
//         <p className="mb-6">The food item you're looking for is not available or has been removed.</p>
//         <Button asChild>
//           <Link to="/browse">Back to Browse</Link>
//         </Button>
//       </div>
//     );
//   }
  
//   const handleReserve = () => {
//     setIsReserving(true);
    
//     // Simulate API call
//     setTimeout(() => {
//       setIsReserving(false);
//       setIsDialogOpen(false);
      
//       toast({
//         title: "Reservation Successful!",
//         description: "You've successfully reserved this food. The restaurant has been notified.",
//         variant: "default",
//       });
//     }, 1500);
//   };
  
//   return (
//     <div className="max-w-7xl mx-auto px-6 md:px-10 py-10">
//       <div className="mb-6">
//         <Button asChild variant="ghost" className="mb-4">
//           <Link to="/browse" className="flex items-center">
//             <ChevronLeft size={16} className="mr-1" />
//             Back to Browse
//           </Link>
//         </Button>
//       </div>
      
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         <div className="lg:col-span-2">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.4 }}
//             className="space-y-8"
//           >
//             <div className="relative h-[300px] md:h-[400px] w-full rounded-xl overflow-hidden">
//               <img
//                 src={foodItem.imageUrl}
//                 alt={foodItem.title}
//                 className="absolute inset-0 w-full h-full object-cover"
//               />
//               <div className="absolute top-4 right-4">
//                 <Badge className="bg-connect-green-500 text-white">{foodItem.category}</Badge>
//               </div>
//             </div>
            
//             <div>
//               <h1 className="text-3xl font-bold mb-2">{foodItem.title}</h1>
//               <div className="flex items-center text-muted-foreground mb-4">
//                 <Store size={16} className="mr-1" />
//                 <span>{foodItem.restaurant}</span>
//               </div>
              
//               <p className="text-lg mb-6">{foodItem.description}</p>
              
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//                 <Card>
//                   <CardContent className="p-4">
//                     <div className="flex items-center mb-3">
//                       <Utensils className="h-5 w-5 mr-2 text-connect-green-500" />
//                       <h3 className="font-medium">Quantity</h3>
//                     </div>
//                     <p>{foodItem.quantity}</p>
//                   </CardContent>
//                 </Card>
                
//                 <Card>
//                   <CardContent className="p-4">
//                     <div className="flex items-center mb-3">
//                       <Clock className="h-5 w-5 mr-2 text-connect-green-500" />
//                       <h3 className="font-medium">Expires At</h3>
//                     </div>
//                     <p>{foodItem.expiry}</p>
//                   </CardContent>
//                 </Card>
                
//                 <Card>
//                   <CardContent className="p-4">
//                     <div className="flex items-center mb-3">
//                       <MapPin className="h-5 w-5 mr-2 text-connect-green-500" />
//                       <h3 className="font-medium">Pickup Location</h3>
//                     </div>
//                     <p>{foodItem.location}</p>
//                   </CardContent>
//                 </Card>
                
//                 <Card>
//                   <CardContent className="p-4">
//                     <div className="flex items-center mb-3">
//                       <Calendar className="h-5 w-5 mr-2 text-connect-green-500" />
//                       <h3 className="font-medium">Posted</h3>
//                     </div>
//                     <p>{foodItem.postedAt}</p>
//                   </CardContent>
//                 </Card>
//               </div>
              
//               {foodItem.dietaryInfo && foodItem.dietaryInfo.length > 0 && (
//                 <div className="mb-6">
//                   <h3 className="font-medium mb-2">Dietary Information</h3>
//                   <div className="flex flex-wrap gap-2">
//                     {foodItem.dietaryInfo.map((info, index) => (
//                       <Badge key={index} variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-200">
//                         {info}
//                       </Badge>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//           </motion.div>
//         </div>
        
//         <div className="lg:col-span-1">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.4, delay: 0.2 }}
//           >
//             <Card className="sticky top-24">
//               <CardContent className="p-6">
//                 <h3 className="text-xl font-semibold mb-4">Restaurant Information</h3>
                
//                 <div className="space-y-4 mb-6">
//                   <div className="flex items-start">
//                     <Store className="h-5 w-5 mr-3 mt-0.5 text-connect-green-500" />
//                     <div>
//                       <p className="font-medium">{foodItem.restaurantInfo.name}</p>
//                       <p className="text-sm text-muted-foreground">{foodItem.restaurantInfo.address}</p>
//                     </div>
//                   </div>
                  
//                   <div className="flex items-start">
//                     <User className="h-5 w-5 mr-3 mt-0.5 text-connect-green-500" />
//                     <div>
//                       <p className="font-medium">Contact Person</p>
//                       <p className="text-sm text-muted-foreground">{foodItem.restaurantInfo.owner}</p>
//                     </div>
//                   </div>
                  
//                   <div className="flex items-start">
//                     <Phone className="h-5 w-5 mr-3 mt-0.5 text-connect-green-500" />
//                     <div>
//                       <p className="font-medium">Phone</p>
//                       <p className="text-sm text-muted-foreground">{foodItem.restaurantInfo.contact}</p>
//                     </div>
//                   </div>
//                 </div>
                
//                 <div className="bg-connect-green-50 dark:bg-connect-green-900/20 p-4 rounded-lg mb-6">
//                   <div className="flex items-start">
//                     <AlertTriangle className="h-5 w-5 mr-3 mt-0.5 text-connect-green-600" />
//                     <div>
//                       <p className="font-medium">Important Note</p>
//                       <p className="text-sm text-muted-foreground">
//                         Please reserve only if you can pick up before the expiry time. This ensures food doesn't go to waste.
//                       </p>
//                     </div>
//                   </div>
//                 </div>
                
//                 <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//                   <DialogTrigger asChild>
//                     <Button className="w-full bg-connect-green-500 hover:bg-connect-green-600">
//                       Reserve This Food
//                     </Button>
//                   </DialogTrigger>
//                   <DialogContent>
//                     <DialogHeader>
//                       <DialogTitle>Reserve Food</DialogTitle>
//                       <DialogDescription>
//                         You are about to reserve "{foodItem.title}" from {foodItem.restaurant}.
//                         Please add any notes for the restaurant.
//                       </DialogDescription>
//                     </DialogHeader>
                    
//                     <div className="space-y-4 py-4">
//                       <div className="space-y-2">
//                         <label htmlFor="notes" className="text-sm font-medium">
//                           Reservation Notes (Optional)
//                         </label>
//                         <Textarea
//                           id="notes"
//                           placeholder="Any special instructions for pickup..."
//                           value={reservationNotes}
//                           onChange={(e) => setReservationNotes(e.target.value)}
//                         />
//                       </div>
                      
//                       <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-md">
//                         <div className="flex items-start">
//                           <Check className="h-5 w-5 mr-2 mt-0.5 text-connect-green-500" />
//                           <p className="text-sm">
//                             By reserving, you agree to pick up the food before {foodItem.expiry}.
//                           </p>
//                         </div>
//                       </div>
//                     </div>
                    
//                     <DialogFooter>
//                       <Button
//                         variant="outline"
//                         onClick={() => setIsDialogOpen(false)}
//                         disabled={isReserving}
//                       >
//                         Cancel
//                       </Button>
//                       <Button
//                         onClick={handleReserve}
//                         disabled={isReserving}
//                         className="bg-connect-green-500 hover:bg-connect-green-600"
//                       >
//                         {isReserving ? "Reserving..." : "Confirm Reservation"}
//                       </Button>
//                     </DialogFooter>
//                   </DialogContent>
//                 </Dialog>
                
//                 <div className="mt-4">
//                   <Button variant="outline" className="w-full" asChild>
//                     <Link to={`/message/${foodItem.id}`} className="flex items-center justify-center">
//                       <MessageSquare className="h-4 w-4 mr-2" />
//                       Message Restaurant
//                     </Link>
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default FoodDetail;






// used to display the details of a specific food donation and allow NGOs to reserve the food.
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { db } from "@/lib/firebase"; // Ensure Firebase is initialized properly
import { doc, getDoc, addDoc, collection } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

const FoodDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [foodItem, setFoodItem] = useState(null);
  const [reservationNotes, setReservationNotes] = useState("");
  const [isReserving, setIsReserving] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const fetchFoodItem = async () => {
      try {
        const foodRef = doc(db, "food_listings", id);
        const foodSnap = await getDoc(foodRef);

        if (foodSnap.exists()) {
          setFoodItem(foodSnap.data());
        } else {
          setFoodItem(null);
        }
      } catch (error) {
        console.error("Error fetching food item:", error);
        setFoodItem(null);
      }
    };

    fetchFoodItem();
  }, [id]);

  const handleReserve = async () => {
    if (!foodItem) return;
    setIsReserving(true);

    try {
      await addDoc(collection(db, "food_reservations"), {
        foodId: id,
        restaurant: foodItem.restaurant,
        title: foodItem.title,
        quantity: foodItem.quantity,
        expiry: foodItem.expiry,
        pickupLocation: foodItem.location,
        reservationNotes,
        timestamp: new Date(),
      });
      
      setIsReserving(false);
      setIsDialogOpen(false);
      toast({
        title: "Reservation Successful!",
        description: "You've successfully reserved this food. The restaurant has been notified.",
        variant: "default",
      });
    } catch (error) {
      console.error("Error reserving food:", error);
      toast({ title: "Reservation Failed", description: "An error occurred while reserving the food.", variant: "destructive" });
      setIsReserving(false);
    }
  };

  if (!foodItem) {
    return (
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Food Item Not Found</h2>
        <p className="mb-6">The food item you're looking for is not available or has been removed.</p>
        <Button asChild>
          <Link to="/browse">Back to Browse</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-10 py-10">
      <Button asChild variant="ghost" className="mb-4">
        <Link to="/browse">Back to Browse</Link>
      </Button>
      <Card>
        <CardContent className="p-6">
          <h1 className="text-3xl font-bold mb-2">{foodItem.title}</h1>
          <p>{foodItem.description}</p>
          <p className="mt-2 font-semibold">Quantity: {foodItem.quantity}</p>
          <p className="mt-2 font-semibold">Expires At: {foodItem.expiry}</p>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="mt-4 bg-green-500 hover:bg-green-600">Reserve This Food</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Reserve Food</DialogTitle>
                <DialogDescription>
                  You are about to reserve "{foodItem.title}" from {foodItem.restaurant}.
                </DialogDescription>
              </DialogHeader>
              <Textarea
                placeholder="Any special instructions for pickup..."
                value={reservationNotes}
                onChange={(e) => setReservationNotes(e.target.value)}
              />
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)} disabled={isReserving}>Cancel</Button>
                <Button onClick={handleReserve} disabled={isReserving} className="bg-green-500 hover:bg-green-600">
                  {isReserving ? "Reserving..." : "Confirm Reservation"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );
};

export default FoodDetail;
