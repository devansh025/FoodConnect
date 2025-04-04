// import { useState } from "react";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { useNavigate } from "react-router-dom";

// const RestaurantDashboard = () => {
//   const [activeTab, setActiveTab] = useState("donations");
//   const navigate = useNavigate();

//   const handleNewDonation = () => {
//     navigate("/NewDonation");
//   };

//   return (
//     <div className="container mx-auto px-6 py-12 max-w-6xl">
//       <h1 className="text-3xl font-bold mb-8">Restaurant Dashboard</h1>

//       <div className="flex justify-between items-center mb-6">
//         <p className="text-lg">Welcome back, Restaurant Name</p>
//         <Button onClick={handleNewDonation} className="bg-connect-green-500 hover:bg-connect-green-600">
//           Add New Donation
//         </Button>
//       </div>

//       <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
//         <TabsList className="grid w-full grid-cols-3 mb-8">
//           <TabsTrigger value="donations">Donations</TabsTrigger>
//           <TabsTrigger value="history">History</TabsTrigger>
//           <TabsTrigger value="profile">Profile</TabsTrigger>
//         </TabsList>

//         <TabsContent value="donations" className="space-y-6">
//           <Card>
//             <CardHeader>
//               <CardTitle>Active Donations</CardTitle>
//               <CardDescription>Manage your current food donations</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="text-center py-10 text-gray-500">
//                 No active donations. Click "Add New Donation" to get started.
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>

//         <TabsContent value="history" className="space-y-6">
//           <Card>
//             <CardHeader>
//               <CardTitle>Donation History</CardTitle>
//               <CardDescription>Review your past donations</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="text-center py-10 text-gray-500">No donation history yet.</div>
//             </CardContent>
//           </Card>
//         </TabsContent>

//         <TabsContent value="profile" className="space-y-6">
//           <Card>
//             <CardHeader>
//               <CardTitle>Restaurant Profile</CardTitle>
//               <CardDescription>Manage your restaurant details</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 <div>
//                   <p className="font-medium">Restaurant Name</p>
//                   <p className="text-gray-500">Your Restaurant Name</p>
//                 </div>
//                 <div>
//                   <p className="font-medium">Email</p>
//                   <p className="text-gray-500">restaurant@example.com</p>
//                 </div>
//                 <div>
//                   <p className="font-medium">Address</p>
//                   <p className="text-gray-500">123 Food Street, City, Country</p>
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

// export default RestaurantDashboard;

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { auth, db } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const RestaurantDashboard = () => {
  const [activeTab, setActiveTab] = useState("donations");
  const [restaurantDetails, setRestaurantDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Function to fetch restaurant details from Firestore
  useEffect(() => {
    const fetchRestaurantDetails = async (restaurantId) => {
      setLoading(true);
      try {
        const restaurantRef = doc(db, "restaurants", restaurantId); // Fetch from /restaurants/{restaurantId}
        const restaurantSnap = await getDoc(restaurantRef);

        if (restaurantSnap.exists()) {
          setRestaurantDetails(restaurantSnap.data()); // Store restaurant data in state
        } else {
          console.log("No restaurant data found");
        }
      } catch (error) {
        console.error("Error fetching restaurant details:", error);
      }
      setLoading(false);
    };

    // Get the logged-in restaurant UID and fetch data
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchRestaurantDetails(user.uid); // Use UID as restaurant ID
      } else {
        setRestaurantDetails(null);
      }
    });

    return () => unsubscribe(); // Cleanup subscription
  }, []);

  const handleNewDonation = () => {
    navigate("/NewDonation");
  };

  return (
    <div className="container mx-auto px-6 py-12 max-w-6xl">
      <h1 className="text-3xl font-bold mb-8">Restaurant Dashboard</h1>

      <div className="flex justify-between items-center mb-6">
        <p className="text-lg">
          Welcome back, {loading ? "Loading..." : restaurantDetails ? restaurantDetails.name : "Restaurant"}
        </p>
        <Button onClick={handleNewDonation} className="bg-connect-green-500 hover:bg-connect-green-600">
          Add New Donation
        </Button>
      </div>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="donations">Donations</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>

        <TabsContent value="donations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Active Donations</CardTitle>
              <CardDescription>Manage your current food donations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-10 text-gray-500">
                No active donations. Click "Add New Donation" to get started.
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Donation History</CardTitle>
              <CardDescription>Review your past donations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-10 text-gray-500">No donation history yet.</div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Restaurant Profile</CardTitle>
              <CardDescription>Manage your restaurant details</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p className="text-center text-gray-500">Loading profile...</p>
              ) : restaurantDetails ? (
                <div className="space-y-4">
                  <div>
                    <p className="font-medium">Restaurant Name</p>
                    <p className="text-gray-500">{restaurantDetails.name}</p>
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-gray-500">{restaurantDetails.email}</p>
                  </div>
                  <div>
                    <p className="font-medium">Address</p>
                    <p className="text-gray-500">{restaurantDetails.address}</p>
                  </div>
                  <div className="pt-4">
                    <Button variant="outline">Edit Profile</Button>
                  </div>
                </div>
              ) : (
                <p className="text-center text-gray-500">No profile data available.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RestaurantDashboard;
