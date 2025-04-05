

// import { useState, useEffect } from "react";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { useNavigate } from "react-router-dom";
// import { auth, db } from "@/firebase";
// import { onAuthStateChanged } from "firebase/auth";
// import { doc, getDoc } from "firebase/firestore";

// const RestaurantDashboard = () => {
//   const [activeTab, setActiveTab] = useState("donations");
//   const [restaurantDetails, setRestaurantDetails] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchRestaurantDetails = async (restaurantId) => {
//       setLoading(true);
//       try {
//         const restaurantRef = doc(db, "restaurants", restaurantId);
//         const restaurantSnap = await getDoc(restaurantRef);

//         if (restaurantSnap.exists()) {
//           setRestaurantDetails(restaurantSnap.data());
//         } else {
//           console.log("No restaurant data found");
//         }
//       } catch (error) {
//         console.error("Error fetching restaurant details:", error);
//       }
//       setLoading(false);
//     };

//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         fetchRestaurantDetails(user.uid);
//       } else {
//         setRestaurantDetails(null);
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   const handleNewDonation = () => {
//     navigate("/NewDonation");
//   };

//   return (
//     <div className="container mx-auto px-6 py-12 max-w-6xl">
//       <h1 className="text-3xl font-bold mb-8">Restaurant Dashboard</h1>

//       <div className="flex justify-between items-center mb-6">
//         <p className="text-lg">
//           Welcome back, {loading ? "Loading..." : restaurantDetails ? restaurantDetails.name : "Restaurant"}
//         </p>
//         <Button onClick={handleNewDonation} className="bg-connect-green-500 hover:bg-connect-green-600">
//           Add New Donation
//         </Button>
//       </div>

//       <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
//         <TabsList className="grid w-full grid-cols-2 mb-8">
//           <TabsTrigger value="donations">Donations</TabsTrigger>
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

//         <TabsContent value="profile" className="space-y-6">
//           <Card>
//             <CardHeader>
//               <CardTitle>Restaurant Profile</CardTitle>
//               <CardDescription>Manage your restaurant details</CardDescription>
//             </CardHeader>
//             <CardContent>
//               {loading ? (
//                 <p className="text-center text-gray-500">Loading profile...</p>
//               ) : restaurantDetails ? (
//                 <div className="space-y-4">
//                   <div>
//                     <p className="font-medium">Restaurant Name</p>
//                     <p className="text-gray-500">{restaurantDetails.name}</p>
//                   </div>
//                   <div>
//                     <p className="font-medium">Email</p>
//                     <p className="text-gray-500">{restaurantDetails.email}</p>
//                   </div>
//                   <div>
//                     <p className="font-medium">Address</p>
//                     <p className="text-gray-500">{restaurantDetails.address}</p>
//                   </div>
//                   <div className="pt-4">
//                     <Button variant="outline">Edit Profile</Button>
//                   </div>
//                 </div>
//               ) : (
//                 <p className="text-center text-gray-500">No profile data available.</p>
//               )}
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
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

const RestaurantDashboard = () => {
  const [activeTab, setActiveTab] = useState("donations");
  const [restaurantDetails, setRestaurantDetails] = useState(null);
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRestaurantDetails = async (restaurantId) => {
      try {
        const restaurantRef = doc(db, "restaurants", restaurantId);
        const restaurantSnap = await getDoc(restaurantRef);

        if (restaurantSnap.exists()) {
          setRestaurantDetails(restaurantSnap.data());
        } else {
          console.log("No restaurant data found");
        }
      } catch (error) {
        console.error("Error fetching restaurant details:", error);
      }
    };

    const fetchFoodDonations = async (restaurantId) => {
      try {
        const donationsRef = collection(db, "restaurants", restaurantId, "food_donations");
        const donationsSnap = await getDocs(donationsRef);
        const donationList = donationsSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDonations(donationList);
      } catch (error) {
        console.error("Error fetching food donations:", error);
      } finally {
        setLoading(false);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchRestaurantDetails(user.uid);
        fetchFoodDonations(user.uid);
      } else {
        setRestaurantDetails(null);
        setDonations([]);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleNewDonation = () => {
    navigate("/NewDonation");
  };

  // Function to determine border color based on category
  const getBorderColor = (category) => {
    switch (category?.toLowerCase()) {
      case "veg":
        return "border-green-500";
      case "non-veg":
        return "border-red-500";
      case "vegan":
        return "border-emerald-500";
      default:
        return "border-gray-300";
    }
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
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="donations">Donations</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>

        {/* Donations Tab */}
        <TabsContent value="donations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Active Donations</CardTitle>
              <CardDescription>Only food names are shown below</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center text-gray-500">Loading donations...</div>
              ) : donations.length === 0 ? (
                <div className="text-center py-10 text-gray-500">
                  No active donations. Click "Add New Donation" to get started.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {donations.map((donation) => (
                    <Card
                      key={donation.id}
                      className={`border-2 shadow-sm ${getBorderColor(donation.category)}`}
                    >
                      <CardContent className="py-6 text-center font-semibold text-lg">
                        {donation.foodItem}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Profile Tab */}
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
