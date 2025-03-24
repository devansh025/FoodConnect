
import { Link } from "react-router-dom";
import { Heart, Instagram, Twitter, Facebook, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-20">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center space-x-2">
              <Heart size={24} className="text-connect-green-500" fill="rgba(72, 151, 75, 0.2)" />
              <span className="text-lg font-medium tracking-tight">
                Food<span className="text-connect-green-500">Connect</span>
              </span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Bridging the gap between excess food and those in need. Together, we can make a difference.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gray-400 hover:text-connect-green-500 transition-colors duration-200">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-connect-green-500 transition-colors duration-200">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-connect-green-500 transition-colors duration-200">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-connect-green-500 transition-colors duration-200">
                <Linkedin size={20} />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Platform
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link to="/" className="text-sm text-gray-600 dark:text-gray-300 hover:text-connect-green-500 transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-sm text-gray-600 dark:text-gray-300 hover:text-connect-green-500 transition-colors duration-200">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/browse" className="text-sm text-gray-600 dark:text-gray-300 hover:text-connect-green-500 transition-colors duration-200">
                  Browse Food
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-sm text-gray-600 dark:text-gray-300 hover:text-connect-green-500 transition-colors duration-200">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Company
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link to="/about" className="text-sm text-gray-600 dark:text-gray-300 hover:text-connect-green-500 transition-colors duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-gray-600 dark:text-gray-300 hover:text-connect-green-500 transition-colors duration-200">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-gray-600 dark:text-gray-300 hover:text-connect-green-500 transition-colors duration-200">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm text-gray-600 dark:text-gray-300 hover:text-connect-green-500 transition-colors duration-200">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Get in Touch
            </h3>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
              Have questions or suggestions?
            </p>
            <div className="mt-4">
              <a 
                href="mailto:contact@foodconnect.org" 
                className="inline-flex items-center space-x-2 text-connect-green-500 hover:text-connect-green-600 transition-colors duration-200"
              >
                <Mail size={16} />
                <span className="text-sm">contact@foodconnect.org</span>
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-center text-xs text-gray-500 dark:text-gray-400">
            &copy; {currentYear} FoodConnect. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
