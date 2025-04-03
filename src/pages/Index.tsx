import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { UtensilsCrossed, Building, Heart, ArrowRight, CheckCircle } from "lucide-react";
import { db } from "@/firebase"; // Make sure the path is correct
import { collectionGroup, getDocs } from "firebase/firestore";

// Define TypeScript interface for FoodDonation data
interface FoodDonation {
  id: string;
  foodItem: string;
  quantity: string;
  expiry: string;
  restaurants: string;
}

const HomePage: React.FC = () => {
  const [foodDonations, setFoodDonations] = useState<FoodDonation[]>([]);

  useEffect(() => {
    const fetchFoodDonations = async () => {
      try {
        const foodCollection = collectionGroup(db, "food_donations");
        const foodSnapshot = await getDocs(foodCollection);
        const foodList = foodSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as FoodDonation[];
        setFoodDonations(foodList);
      } catch (error) {
        console.error("Error fetching food donations: ", error);
      }
    };

    fetchFoodDonations();
  }, []);
  return (
    <div className="w-full overflow-hidden">
      {/* Hero Section */}
      <section className="relative pb-20 pt-24 md:pt-32 md:pb-28 px-6 md:px-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-connect-green-50/40 to-white/0 dark:from-gray-900/40 dark:to-gray-950/0 -z-10" />
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center lg:text-left"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="inline-flex items-center px-3 py-1 rounded-full bg-connect-green-50 dark:bg-connect-green-900/20 text-connect-green-600 dark:text-connect-green-400 text-sm font-medium mb-6"
              >
                <Heart size={14} className="mr-1.5" /> Reducing Food Waste Together
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance mb-6"
              >
                Connecting Excess Food with{" "}
                <span className="text-connect-green-500">Those in Need</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0"
              >
                FoodConnect bridges the gap between restaurants with surplus food and NGOs
                committed to hunger relief in our communities.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <Button asChild size="lg" className="bg-connect-green-500 hover:bg-connect-green-600 rounded-full text-white px-8">
                  <Link to="/signup">
                    Join FoodConnect <ArrowRight size={18} className="ml-2" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full px-8">
                  <Link to="/how-it-works">How It Works</Link>
                </Button>
              </motion.div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="relative lg:h-[500px] flex justify-center"
            >
              <div className="relative w-full max-w-lg">
                <div className="absolute top-0 -left-4 w-72 h-72 bg-connect-blue-200 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-float" />
                <div className="absolute top-20 -right-10 w-72 h-72 bg-connect-green-200 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-float" style={{animationDelay: '2s'}} />
                
                <div className="relative glass-panel rounded-2xl overflow-hidden shadow-xl">
                  <div className="p-8">
                    <h3 className="text-xl font-semibold mb-4">Recently Added</h3>
                    <div className="space-y-4">
                  {foodDonations.length > 0 ? (
                    foodDonations.slice(0, 3).map((item, i) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.7 + i * 0.1 }}
                        className="flex items-start p-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-300"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium">{item.foodItem}</p> {/* Display Food Name */}
                          <p className="text-xs text-muted-foreground">{item.restaurants}</p>
                          <div className="mt-1 flex items-center space-x-2">
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-connect-green-100 text-connect-green-800">
                              {item.quantity} servings
                            </span>
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              Expires: {item.expiry}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">No food available right now.</p>
                  )}
                </div>


                    {/* <div className="space-y-4">
                      {[
                        {
                          name: "Fresh Pasta & Salad",
                          restaurant: "Bella Italian",
                          quantity: "5 servings",
                          expires: "Today, 8:00 PM",
                        },
                        {
                          name: "Vegetable Curry",
                          restaurant: "Spice Garden",
                          quantity: "3 kg",
                          expires: "Today, 9:30 PM",
                        },
                        {
                          name: "Assorted Pastries",
                          restaurant: "Morning Bakery",
                          quantity: "20 pieces",
                          expires: "Tomorrow, 10:00 AM",
                        },
                      ].map((item, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.7 + (i * 0.1) }}
                          className="flex items-start p-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-300"
                        >
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium">{item.name}</p>
                            <p className="text-xs text-muted-foreground">{item.restaurant}</p>
                            <div className="mt-1 flex items-center space-x-2">
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-connect-green-100 text-connect-green-800">
                                {item.quantity}
                              </span>
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                Expires: {item.expires}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div> */}
                    
                    <div className="mt-6 text-center">
                      <Button asChild variant="outline" size="sm" className="rounded-full">
                        <Link to="/browse">View All Available Food</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Process Section */}
      <section className="py-20 px-6 md:px-10 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How FoodConnect Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our platform makes it easy to connect surplus food with those who need it most.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <UtensilsCrossed className="h-10 w-10 text-connect-green-500" />,
                title: "Restaurants Share",
                description: "Restaurants post details about their surplus food, including type, quantity, and pickup time.",
                delay: 0.2,
              },
              {
                icon: <Building className="h-10 w-10 text-connect-green-500" />,
                title: "NGOs Connect",
                description: "Local NGOs browse available food donations and reserve what they need for their programs.",
                delay: 0.4,
              },
              {
                icon: <Heart className="h-10 w-10 text-connect-green-500" />,
                title: "Communities Benefit",
                description: "Food reaches people in need, reducing waste and supporting our communities.",
                delay: 0.6,
              },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: step.delay }}
                className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700"
              >
                <div className="h-16 w-16 rounded-full bg-connect-green-50 dark:bg-connect-green-900/20 flex items-center justify-center mb-4">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-14 text-center">
            <Button asChild className="bg-connect-green-500 hover:bg-connect-green-600 rounded-full px-8">
              <Link to="/how-it-works">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Impact Section */}
      <section className="py-20 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Making a Difference Together</h2>
              <p className="text-lg text-muted-foreground mb-8">
                FoodConnect is more than just a platform—it's a movement to reduce food waste
                and address hunger in our communities.
              </p>
              
              <div className="space-y-4">
                {[
                  "Reduce food waste by connecting surplus food to those who need it",
                  "Support local restaurants by providing a simple solution for excess food",
                  "Help NGOs access fresh, quality food for their programs",
                  "Strengthen community connections and support sustainability",
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 + (i * 0.1) }}
                    className="flex items-start"
                  >
                    <CheckCircle className="h-5 w-5 text-connect-green-500 mt-0.5 mr-3 flex-shrink-0" />
                    <p>{item}</p>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-10">
                <Button asChild variant="outline" className="rounded-full px-8">
                  <Link to="/about">About Our Mission</Link>
                </Button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative rounded-xl overflow-hidden shadow-lg h-[400px]"
            >
              <img
                src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="People sharing food"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-gray-900/10 flex flex-col justify-end p-8">
                <div className="space-y-2 text-white">
                  <div className="flex space-x-4">
                    <div className="text-center">
                      <p className="text-3xl font-bold">1,200+</p>
                      <p className="text-sm text-gray-300">Meals Shared</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-bold">85+</p>
                      <p className="text-sm text-gray-300">Restaurants</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-bold">40+</p>
                      <p className="text-sm text-gray-300">NGO Partners</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-6 md:px-10 bg-connect-green-500">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-white mb-6"
          >
            Join Us in Making a Difference
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-white/90 mb-10 max-w-2xl mx-auto"
          >
            Whether you're a restaurant with surplus food or an NGO helping those in need,
            FoodConnect is here to help you make a positive impact.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button asChild size="lg" variant="secondary" className="rounded-full px-8 bg-white text-connect-green-600 hover:bg-gray-100">
              <Link to="/signup">Sign Up as Restaurant</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full px-8 text-white border-white hover:bg-white/10">
              <Link to="/signup">Sign Up as NGO</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;


