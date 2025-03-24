
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="container mx-auto px-6 py-12 max-w-5xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-10">About FoodConnect</h1>
        
        <div className="prose prose-lg max-w-none mb-12">
          <p>
            FoodConnect was founded with a simple mission: to reduce food waste and hunger 
            by connecting restaurants with excess food to NGOs that serve communities in need.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Our Mission</h2>
          <p>
            We believe that no good food should go to waste when there are people who need it. 
            By creating a seamless platform for food donation and distribution, we're working to create 
            a more sustainable and equitable food system.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Our Impact</h2>
          <p>
            Since our founding, FoodConnect has helped redirect thousands of meals from 
            landfills to people's plates. We've partnered with hundreds of restaurants and NGOs 
            across the country, making a meaningful difference in our communities.
          </p>
        </div>
        
        <div className="bg-gray-50 p-8 rounded-lg mb-16">
          <h2 className="text-2xl font-semibold mb-6 text-center">Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <h3 className="font-medium">Jane Doe</h3>
              <p className="text-sm text-gray-600">Founder & CEO</p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <h3 className="font-medium">John Smith</h3>
              <p className="text-sm text-gray-600">CTO</p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <h3 className="font-medium">Sarah Johnson</h3>
              <p className="text-sm text-gray-600">Community Director</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default About;
