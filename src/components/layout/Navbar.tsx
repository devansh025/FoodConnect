
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { UtensilsCrossed, Heart, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "How It Works", path: "/how-it-works" },
    { name: "Browse Food", path: "/browse" },
    { name: "About Us", path: "/about" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-10 py-4",
        isScrolled ? "bg-white/80 dark:bg-gray-950/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center space-x-2 transition-transform duration-300 hover:scale-105"
        >
          <Heart 
            size={28} 
            className="text-connect-green-500 transition-colors duration-300" 
            fill="rgba(72, 151, 75, 0.2)" 
          />
          <span className="text-xl font-medium tracking-tight">
            Food<span className="text-connect-green-500">Connect</span>
          </span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300",
                isActive(link.path)
                  ? "text-connect-green-500 bg-connect-green-50/50"
                  : "text-foreground/70 hover:text-connect-green-500 hover:bg-connect-green-50/30"
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>
        
        <div className="hidden md:flex items-center space-x-4">
          <Button asChild variant="outline" size="sm" className="h-9 text-sm">
            <Link to="/login">Log In</Link>
          </Button>
          <Button asChild size="sm" className="h-9 text-sm bg-connect-green-500 hover:bg-connect-green-600">
            <Link to="/signup">Sign Up</Link>
          </Button>
        </div>
        
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 md:hidden rounded-md transition-colors duration-200 hover:bg-gray-100"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-white dark:bg-gray-950 md:hidden transition-transform duration-300 ease-in-out transform pt-20",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col px-6 py-8 space-y-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "px-4 py-3 rounded-md text-base font-medium transition-colors duration-200",
                isActive(link.path)
                  ? "text-connect-green-500 bg-connect-green-50/50"
                  : "text-foreground/70 hover:text-connect-green-500 hover:bg-connect-green-50/30"
              )}
            >
              {link.name}
            </Link>
          ))}
          
          <div className="pt-6 flex flex-col space-y-4">
            <Button asChild variant="outline" className="w-full justify-center">
              <Link to="/login">Log In</Link>
            </Button>
            <Button asChild className="w-full justify-center bg-connect-green-500 hover:bg-connect-green-600">
              <Link to="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
