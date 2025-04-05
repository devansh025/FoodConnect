

// import { useState, useEffect } from "react";
// import {
//   Tabs,
//   TabsContent,
//   TabsList,
//   TabsTrigger,
// } from "@/components/ui/tabs";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { useToast } from "@/hooks/use-toast";
// import { auth, db } from "@/firebase";
// import { onAuthStateChanged } from "firebase/auth";
// import {
//   collection,
//   doc,
//   getDoc,
//   getDocs,
// } from "firebase/firestore";
// import ReservedFoodCard from "@/components/food/ReservedFoodCard";

// const NgoDashboard = () => {
//   const { toast } = useToast();
//   const [activeTab, setActiveTab] = useState("reserved");
//   const [ngoDetails, setNgoDetails] = useState(null);
//   const [reservedFood, setReservedFood] = useState([]);

//   useEffect(() => {
//     const fetchNgoDetailsAndReservedFood = async (uid: string) => {
//       try {
//         const ngoRef = doc(db, "ngos", uid);
//         const ngoSnap = await getDoc(ngoRef);

//         if (ngoSnap.exists()) {
//           const ngoData = ngoSnap.data();
//           setNgoDetails(ngoData);

//           // Fetch from subcollection: ngos/{uid}/food_reservations
//           const reservationsRef = collection(db, "ngos", uid, "food_reservations");
//           const snapshot = await getDocs(reservationsRef);

//           const foodItems = await Promise.all(
//             snapshot.docs.map(async (docSnap) => {
//               const foodData = docSnap.data();
//               let restaurantName = "Unknown Restaurant";

//               try {
//                 const restaurantRef = doc(db, "restaurants", foodData.restaurant_id);
//                 const restaurantSnap = await getDoc(restaurantRef);
//                 if (restaurantSnap.exists()) {
//                   const restaurantData = restaurantSnap.data();
//                   restaurantName = restaurantData.name || "Unnamed Restaurant";
//                 }
//               } catch (err) {
//                 console.error("Error fetching restaurant name:", err);
//               }

//               return {
//                 id: docSnap.id,
//                 ...foodData,
//                 restaurant: restaurantName, // Add restaurant name here
//               };
//             })
//           );

//           setReservedFood(foodItems);
//         } else {
//           console.log("No NGO data found");
//         }
//       } catch (error) {
//         console.error("Error fetching NGO details or reserved food:", error);
//       }
//     };

//     onAuthStateChanged(auth, (user) => {
//       if (user) {
//         fetchNgoDetailsAndReservedFood(user.uid);
//       }
//     });
//   }, []);

//   return (
//     <div className="container mx-auto px-6 py-12 max-w-6xl">
//       <h1 className="text-3xl font-bold mb-8">NGO Dashboard</h1>

//       <div className="flex justify-between items-center mb-6">
//         <p className="text-lg">
//           Welcome back, {ngoDetails ? ngoDetails.name : "NGO"}
//         </p>
//         <Button
//           onClick={() => (window.location.href = "/browse")}
//           className="bg-connect-green-500 hover:bg-connect-green-600"
//         >
//           Browse Available Food
//         </Button>
//       </div>

//       <Tabs
//         defaultValue={activeTab}
//         onValueChange={setActiveTab}
//         className="w-full"
//       >
//         <TabsList className="grid w-full grid-cols-3 mb-8">
//           <TabsTrigger value="reserved">Reserved</TabsTrigger>
//           <TabsTrigger value="history">History</TabsTrigger>
//           <TabsTrigger value="profile">Profile</TabsTrigger>
//         </TabsList>

//         {/* Reserved Tab */}
//         <TabsContent value="reserved" className="space-y-6">
//           <Card>
//             <CardHeader>
//               <CardTitle>Reserved Donations</CardTitle>
//               <CardDescription>
//                 Food donations you have reserved for pickup
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               {reservedFood.length > 0 ? (
//                 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//                   {reservedFood.map((food, index) => (
//                     <ReservedFoodCard key={food.id} food={food} index={index} />
//                   ))}
//                 </div>
//               ) : (
//                 <div className="text-center py-10 text-gray-500">
//                   No reserved donations yet.
//                 </div>
//               )}
//             </CardContent>
//           </Card>
//         </TabsContent>

//         {/* History Tab */}
//         <TabsContent value="history" className="space-y-6">
//           <Card>
//             <CardHeader>
//               <CardTitle>Donation History</CardTitle>
//               <CardDescription>
//                 Past donations that have been successfully picked up
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="text-center py-10 text-gray-500">
//                 No past donations recorded yet.
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>

//         {/* Profile Tab */}
//         <TabsContent value="profile" className="space-y-6">
//           <Card>
//             <CardHeader>
//               <CardTitle>NGO Profile</CardTitle>
//               <CardDescription>Manage your organization details</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 <div>
//                   <p className="font-medium">Organization Name</p>
//                   <p className="text-gray-500">
//                     {ngoDetails ? ngoDetails.name : "Loading..."}
//                   </p>
//                 </div>
//                 <div>
//                   <p className="font-medium">Email</p>
//                   <p className="text-gray-500">
//                     {ngoDetails ? ngoDetails.email : "Loading..."}
//                   </p>
//                 </div>
//                 <div>
//                   <p className="font-medium">Address</p>
//                   <p className="text-gray-500">
//                     {ngoDetails ? ngoDetails.address : "Loading..."}
//                   </p>
//                 </div>
//                 <div className="pt-4">
//                   <Button variant="outline">Edit Profile</Button>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// };

// export default NgoDashboard;

import { useState, useEffect } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { auth, db } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import ReservedFoodCard from "@/components/food/ReservedFoodCard";

const NgoDashboard = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("reserved");
  const [ngoDetails, setNgoDetails] = useState(null);
  const [reservedFood, setReservedFood] = useState([]);

  useEffect(() => {
    const fetchNgoDetailsAndReservedFood = async (uid: string) => {
      try {
        const ngoRef = doc(db, "ngos", uid);
        const ngoSnap = await getDoc(ngoRef);

        if (ngoSnap.exists()) {
          const ngoData = ngoSnap.data();
          setNgoDetails(ngoData);

          const reservationsRef = collection(db, "ngos", uid, "food_reservations");
          const snapshot = await getDocs(reservationsRef);

          const foodItems = await Promise.all(
            snapshot.docs.map(async (docSnap) => {
              const foodData = docSnap.data();
              let restaurantName = "Unknown Restaurant";

              try {
                const restaurantRef = doc(db, "restaurants", foodData.restaurant_id);
                const restaurantSnap = await getDoc(restaurantRef);
                if (restaurantSnap.exists()) {
                  const restaurantData = restaurantSnap.data();
                  restaurantName = restaurantData.name || "Unnamed Restaurant";
                }
              } catch (err) {
                console.error("Error fetching restaurant name:", err);
              }

              return {
                id: docSnap.id,
                ...foodData,
                restaurant: restaurantName,
              };
            })
          );

          setReservedFood(foodItems);
        } else {
          console.log("No NGO data found");
        }
      } catch (error) {
        console.error("Error fetching NGO details or reserved food:", error);
      }
    };

    onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchNgoDetailsAndReservedFood(user.uid);
      }
    });
  }, []);

  return (
    <div className="container mx-auto px-6 py-12 max-w-6xl">
      <h1 className="text-3xl font-bold mb-8">NGO Dashboard</h1>

      <div className="flex justify-between items-center mb-6">
        <p className="text-lg">
          Welcome back, {ngoDetails ? ngoDetails.name : "NGO"}
        </p>
        <Button
          onClick={() => (window.location.href = "/browse")}
          className="bg-connect-green-500 hover:bg-connect-green-600"
        >
          Browse Available Food
        </Button>
      </div>

      <Tabs
        defaultValue={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="reserved">Reserved</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>

        {/* Reserved Tab */}
        <TabsContent value="reserved" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Reserved Donations</CardTitle>
              <CardDescription>
                Food donations you have reserved for pickup
              </CardDescription>
            </CardHeader>
            <CardContent>
              {reservedFood.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {reservedFood.map((food, index) => (
                    <ReservedFoodCard key={food.id} food={food} index={index} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 text-gray-500">
                  No reserved donations yet.
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>NGO Profile</CardTitle>
              <CardDescription>Manage your organization details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="font-medium">Organization Name</p>
                  <p className="text-gray-500">
                    {ngoDetails ? ngoDetails.name : "Loading..."}
                  </p>
                </div>
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-gray-500">
                    {ngoDetails ? ngoDetails.email : "Loading..."}
                  </p>
                </div>
                <div>
                  <p className="font-medium">Address</p>
                  <p className="text-gray-500">
                    {ngoDetails ? ngoDetails.address : "Loading..."}
                  </p>
                </div>
                <div className="pt-4">
                  <Button variant="outline">Edit Profile</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NgoDashboard;
