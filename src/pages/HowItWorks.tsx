
import { motion } from "framer-motion";

const HowItWorks = () => {
  return (
    <div className="container mx-auto px-6 py-12 max-w-5xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-10">How FoodConnect Works</h1>
        
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-connect-green-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-connect-green-600 font-bold text-xl">1</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Restaurants List Food</h3>
            <p className="text-gray-600">Restaurants list their surplus food with details about quantity, type, and expiry time.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-connect-green-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-connect-green-500 font-bold text-xl">2</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">NGOs Browse & Reserve</h3>
            <p className="text-gray-600">Local NGOs browse available food donations and reserve what they need for their communities.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-connect-green-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-connect-green-600 font-bold text-xl">3</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Pickup & Distribute</h3>
            <p className="text-gray-600">NGOs pick up the food and distribute it to those in need, completing the connection.</p>
          </div>
        </div>
        
        <div className="bg-connect-green-50 p-8 rounded-lg mb-16">
          <h2 className="text-2xl font-semibold mb-4 text-center">Why It Matters</h2>
          <p className="text-center max-w-3xl mx-auto">
            Every year, millions of tons of food go to waste while people go hungry. 
            FoodConnect bridges this gap by connecting those with excess food to those who need it most.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default HowItWorks;
