
// // import { useState, useEffect } from "react";
// // import { Button } from "@/components/ui/button";
// // import { Input } from "@/components/ui/input";
// // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// // import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// // import { Search, SlidersHorizontal, X } from "lucide-react";
// // import FoodCard, { FoodItem } from "@/components/food/FoodCard";
// // import { motion } from "framer-motion";

// // // Placeholder data
// // const foodItems: FoodItem[] = [
// //   {
// //     id: "1",
// //     title: "Fresh Pasta & Salad",
// //     restaurant: "Bella Italian",
// //     location: "123 Main St, City Center",
// //     description: "Delicious pasta with homemade tomato sauce and fresh garden salad with balsamic dressing.",
// //     quantity: "5 servings",
// //     expiry: "Today, 8:00 PM",
// //     category: "Italian",
// //   },
// //   {
// //     id: "2",
// //     title: "Vegetable Curry",
// //     restaurant: "Spice Garden",
// //     location: "45 Park Ave, East Side",
// //     description: "Aromatic vegetable curry with basmati rice. Mild spice level, suitable for most palates.",
// //     quantity: "3 kg",
// //     expiry: "Today, 9:30 PM",
// //     category: "Indian",
// //   },
// //   {
// //     id: "3",
// //     title: "Assorted Pastries",
// //     restaurant: "Morning Bakery",
// //     location: "78 Baker Street, Westside",
// //     description: "Mix of croissants, danishes, and pain au chocolat. Freshly baked this morning.",
// //     quantity: "20 pieces",
// //     expiry: "Tomorrow, 10:00 AM",
// //     category: "Bakery",
// //   },
// //   {
// //     id: "4",
// //     title: "Sushi Platter",
// //     restaurant: "Oceanside Sushi",
// //     location: "56 Harbor View, Marina District",
// //     description: "Assorted sushi rolls and nigiri with soy sauce, wasabi, and pickled ginger.",
// //     quantity: "30 pieces",
// //     expiry: "Today, 10:00 PM",
// //     category: "Japanese",
// //   },
// //   {
// //     id: "5",
// //     title: "Sandwich Platter",
// //     restaurant: "Urban Deli",
// //     location: "90 Broadway, Downtown",
// //     description: "Assorted deli sandwiches with turkey, ham, roast beef, and vegetarian options.",
// //     quantity: "10 sandwiches",
// //     expiry: "Today, 7:00 PM",
// //     category: "Deli",
// //   },
// //   {
// //     id: "6",
// //     title: "Fruit Salad",
// //     restaurant: "Fresh & Healthy",
// //     location: "123 Greens Rd, Southside",
// //     description: "Mix of seasonal fruits including strawberries, blueberries, melon, and pineapple.",
// //     quantity: "4 kg",
// //     expiry: "Tomorrow, 12:00 PM",
// //     category: "Healthy",
// //   },
// // ];

// // const Browse = () => {
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [selectedCategory, setSelectedCategory] = useState<string>("");
// //   const [selectedExpiry, setSelectedExpiry] = useState<string>("");
// //   const [filteredItems, setFilteredItems] = useState<FoodItem[]>(foodItems);
// //   const [showFilters, setShowFilters] = useState(false);
  
// //   useEffect(() => {
// //     filterItems();
// //   }, [searchTerm, selectedCategory, selectedExpiry]);
  
// //   const filterItems = () => {
// //     let filtered = foodItems;
    
// //     if (searchTerm) {
// //       filtered = filtered.filter(
// //         (item) =>
// //           item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //           item.restaurant.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //           item.description.toLowerCase().includes(searchTerm.toLowerCase())
// //       );
// //     }
    
// //     if (selectedCategory) {
// //       filtered = filtered.filter((item) => item.category === selectedCategory);
// //     }
    
// //     if (selectedExpiry) {
// //       // This is simplified; in a real app, you'd do proper date comparison
// //       if (selectedExpiry === "today") {
// //         filtered = filtered.filter((item) => item.expiry.includes("Today"));
// //       } else if (selectedExpiry === "tomorrow") {
// //         filtered = filtered.filter((item) => item.expiry.includes("Tomorrow"));
// //       }
// //     }
    
// //     setFilteredItems(filtered);
// //   };
  
// //   const clearFilters = () => {
// //     setSearchTerm("");
// //     setSelectedCategory("");
// //     setSelectedExpiry("");
// //   };
  
// //   return (
// //     <div className="max-w-7xl mx-auto px-6 md:px-10 py-10">
// //       <div className="mb-10">
// //         <h1 className="text-3xl font-bold mb-4">Browse Available Food</h1>
// //         <p className="text-lg text-muted-foreground">
// //           Discover surplus food from local restaurants that you can claim for your organization.
// //         </p>
// //       </div>
      
// //       <div className="mb-8">
// //         <Tabs defaultValue="all" className="w-full">
// //           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
// //             <TabsList>
// //               <TabsTrigger value="all">All</TabsTrigger>
// //               <TabsTrigger value="nearby">Nearby</TabsTrigger>
// //               <TabsTrigger value="expiring">Expiring Soon</TabsTrigger>
// //             </TabsList>
            
// //             <div className="flex items-center gap-2">
// //               <Button 
// //                 variant="outline" 
// //                 size="sm" 
// //                 onClick={() => setShowFilters(!showFilters)}
// //                 className="h-9"
// //               >
// //                 <SlidersHorizontal size={16} className="mr-2" />
// //                 Filters
// //               </Button>
              
// //               {(searchTerm || selectedCategory || selectedExpiry) && (
// //                 <Button 
// //                   variant="ghost" 
// //                   size="sm" 
// //                   onClick={clearFilters}
// //                   className="h-9 text-muted-foreground"
// //                 >
// //                   <X size={16} className="mr-2" />
// //                   Clear
// //                 </Button>
// //               )}
// //             </div>
// //           </div>
          
// //           {showFilters && (
// //             <motion.div
// //               initial={{ opacity: 0, height: 0 }}
// //               animate={{ opacity: 1, height: "auto" }}
// //               exit={{ opacity: 0, height: 0 }}
// //               transition={{ duration: 0.3 }}
// //               className="mb-6 p-4 border rounded-lg bg-gray-50 dark:bg-gray-900/50"
// //             >
// //               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// //                 <div>
// //                   <label htmlFor="category" className="block text-sm font-medium mb-1">
// //                     Category
// //                   </label>
// //                   <Select value={selectedCategory} onValueChange={setSelectedCategory}>
// //                     <SelectTrigger>
// //                       <SelectValue placeholder="All Categories" />
// //                     </SelectTrigger>
// //                     <SelectContent>
// //                       <SelectItem value="">All Categories</SelectItem>
// //                       <SelectItem value="Italian">Italian</SelectItem>
// //                       <SelectItem value="Indian">Indian</SelectItem>
// //                       <SelectItem value="Japanese">Japanese</SelectItem>
// //                       <SelectItem value="Bakery">Bakery</SelectItem>
// //                       <SelectItem value="Deli">Deli</SelectItem>
// //                       <SelectItem value="Healthy">Healthy</SelectItem>
// //                     </SelectContent>
// //                   </Select>
// //                 </div>
                
// //                 <div>
// //                   <label htmlFor="expiry" className="block text-sm font-medium mb-1">
// //                     Expiry
// //                   </label>
// //                   <Select value={selectedExpiry} onValueChange={setSelectedExpiry}>
// //                     <SelectTrigger>
// //                       <SelectValue placeholder="Any Time" />
// //                     </SelectTrigger>
// //                     <SelectContent>
// //                       <SelectItem value="">Any Time</SelectItem>
// //                       <SelectItem value="today">Today</SelectItem>
// //                       <SelectItem value="tomorrow">Tomorrow</SelectItem>
// //                     </SelectContent>
// //                   </Select>
// //                 </div>
                
// //                 <div>
// //                   <label htmlFor="search" className="block text-sm font-medium mb-1">
// //                     Search
// //                   </label>
// //                   <div className="relative">
// //                     <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
// //                     <Input
// //                       id="search"
// //                       type="text"
// //                       placeholder="Search by name, restaurant..."
// //                       className="pl-9"
// //                       value={searchTerm}
// //                       onChange={(e) => setSearchTerm(e.target.value)}
// //                     />
// //                   </div>
// //                 </div>
// //               </div>
// //             </motion.div>
// //           )}
          
// //           <TabsContent value="all" className="mt-0">
// //             {filteredItems.length > 0 ? (
// //               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
// //                 {filteredItems.map((food, index) => (
// //                   <FoodCard key={food.id} food={food} index={index} />
// //                 ))}
// //               </div>
// //             ) : (
// //               <div className="text-center py-12">
// //                 <h3 className="text-lg font-semibold mb-2">No items found</h3>
// //                 <p className="text-muted-foreground">
// //                   Try changing your search criteria or check back later.
// //                 </p>
// //               </div>
// //             )}
// //           </TabsContent>
          
// //           <TabsContent value="nearby" className="mt-0">
// //             <div className="text-center py-12">
// //               <h3 className="text-lg font-semibold mb-2">Coming Soon</h3>
// //               <p className="text-muted-foreground">
// //                 We're working on location-based features. Check back soon!
// //               </p>
// //             </div>
// //           </TabsContent>
          
// //           <TabsContent value="expiring" className="mt-0">
// //             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
// //               {foodItems
// //                 .filter((food) => food.expiry.includes("Today"))
// //                 .map((food, index) => (
// //                   <FoodCard key={food.id} food={food} index={index} />
// //                 ))}
// //             </div>
// //           </TabsContent>
// //         </Tabs>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Browse;


import { useState, useEffect } from "react";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "@/firebase"; // ✅ Ensure correct Firebase import
import FoodCard, { FoodItem } from "@/components/food/FoodCard";

const Browse = () => {
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ✅ Firestore real-time listener for food donations
    const foodCollection = collection(db, "food_donations");
    const q = query(foodCollection); // Modify query if filtering is needed

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const updatedFood = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as FoodItem), // Explicitly type doc.data()
      }));

      setFoodItems(updatedFood);
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup listener when component unmounts
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

