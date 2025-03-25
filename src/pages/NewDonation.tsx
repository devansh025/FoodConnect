// // import React, { useState } from "react";
// // import { Button } from "@/components/ui/button";
// // import { Input } from "@/components/ui/input";
// // import { Label } from "@/components/ui/label";
// // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// // import { motion } from "framer-motion";




// // const NewDonation = () => {
// //   const [formData, setFormData] = useState({
// //     foodItem: "",
// //     description: "",
// //     quantity: "",
// //     expiry: "",
// //     category: "",
// //   });


// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData({
// //       ...formData,
// //       [name]: value,
// //     });
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     console.log("Submitted Data:", formData);
// //   };

// //   return (
// //     <div className="max-w-xl mx-auto px-6 md:px-10 py-16">
// //       <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
// //         <Card className="border-gray-200 dark:border-gray-800 shadow-lg">
// //           <CardHeader className="text-center">
// //             <CardTitle className="text-2xl font-bold">Add Food Item</CardTitle>
// //           </CardHeader>
// //           <CardContent>
// //             <form onSubmit={handleSubmit} className="space-y-4">
// //               {Object.keys(formData).map((key) => (
// //                 <div key={key} className="space-y-2">
// //                   <Label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</Label>
// //                   <Input id={key} name={key} placeholder={`Enter ${key}`} value={formData[key]} onChange={handleChange} />
// //                 </div>
// //               ))}
// //               <Button type="submit" className="w-full">Submit</Button>
// //             </form>
// //           </CardContent>
// //         </Card>
// //       </motion.div>
// //     </div>
// //   );
// // };

// // export default NewDonation
// // ;


// import React, { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { motion } from "framer-motion";
// import { db } from "@/firebase"; // Import Firestore database
// import { collection, addDoc, serverTimestamp } from "firebase/firestore";

// const NewDonation = () => {
//   const [formData, setFormData] = useState({
//     foodItem: "",
//     description: "",
//     quantity: "",
//     expiry: "",
//     category: "",
//   });

//   const [loading, setLoading] = useState(false); // Loading state
//   const [message, setMessage] = useState(""); // Success/Error message

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");

//     try {
//       await addDoc(collection(db, "donations"), {
//         ...formData,
//         createdAt: serverTimestamp(),
//       });

//       setMessage("Food item added successfully!");
//       setFormData({
//         foodItem: "",
//         description: "",
//         quantity: "",
//         expiry: "",
//         category: "",
//       });
//     } catch (error) {
//       console.error("Error adding donation:", error);
//       setMessage("Failed to add donation. Try again!");
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="max-w-xl mx-auto px-6 md:px-10 py-16">
//       <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
//         <Card className="border-gray-200 dark:border-gray-800 shadow-lg">
//           <CardHeader className="text-center">
//             <CardTitle className="text-2xl font-bold">Add Food Item</CardTitle>
//           </CardHeader>
//           <CardContent>
//             {message && (
//               <p className={`text-center mb-4 ${message.includes("successfully") ? "text-green-500" : "text-red-500"}`}>
//                 {message}
//               </p>
//             )}
//             <form onSubmit={handleSubmit} className="space-y-4">
//               {Object.keys(formData).map((key) => (
//                 <div key={key} className="space-y-2">
//                   <Label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</Label>
//                   <Input
//                     id={key}
//                     name={key}
//                     placeholder={`Enter ${key}`}
//                     value={formData[key]}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//               ))}
//               <Button type="submit" className="w-full" disabled={loading}>
//                 {loading ? "Submitting..." : "Submit"}
//               </Button>
//             </form>
//           </CardContent>
//         </Card>
//       </motion.div>
//     </div>
//   );
// };

// export default NewDonation;



import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/firebase"; // Firestore instance
import { getAuth } from "firebase/auth";
import { collection, addDoc, serverTimestamp } from "firebase/firestore"; // ✅ FIXED: Import serverTimestamp

const NewDonation = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  const [formData, setFormData] = useState({
    foodItem: "",
    description: "",
    quantity: "",
    expiry: "",
    category: "",
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

    setLoading(true);

    // Construct the donation data
    const donationData = {
      ...formData,
      restaurant_id: auth.currentUser.uid, // Ensure Firestore rule compliance
      createdAt: serverTimestamp(), // ✅ FIXED: Correct usage of Firestore timestamp
    };

    console.log("Submitting Donation Data:", donationData); // Debugging

    try {
      await addDoc(collection(db, "food_donations"), donationData);
      alert("Donation added successfully!");
      navigate("/restaurant/dashboard"); // Redirect after submission
    } catch (err) {
      console.error("🔥 Error adding donation:", err); // Improved error logging
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
                <div key={key} className="space-y-2">
                  <Label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</Label>
                  <Input id={key} name={key} placeholder={`Enter ${key}`} value={formData[key]} onChange={handleChange} required />
                </div>
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

