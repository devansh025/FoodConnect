import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Heart, Menu, X } from "lucide-react";
import { auth, db } from "@/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        console.log("✅ Current User UID:", currentUser.uid);

        let userDoc;
        let userRef = doc(db, "ngos", currentUser.uid);
        userDoc = await getDoc(userRef);

        if (!userDoc.exists()) {
          userRef = doc(db, "restaurants", currentUser.uid);
          userDoc = await getDoc(userRef);
        }

        if (userDoc.exists()) {
          const fetchedUserType = userDoc.data().userType;
          setUserType(fetchedUserType);
          console.log("✅ Fetched userType:", fetchedUserType);
        } else {
          console.log("❌ No userType found in Firestore.");
        }
      } else {
        console.log("❌ No authenticated user.");
        setUserType(null);
      }
    });

    setIsMobileMenuOpen(false);

    return () => unsubscribe();
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      setUser(null);  // Clear user immediately
      setUserType(null);  // Clear userType immediately
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

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
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 hover:scale-105 transition-transform">
          <Heart size={28} className="text-connect-green-500" fill="rgba(72, 151, 75, 0.2)" />
          <span className="text-xl font-medium">
            Food<span className="text-connect-green-500">Connect</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium",
                location.pathname === link.path ? "text-connect-green-500 bg-connect-green-50/50" : "hover:text-connect-green-500"
              )}
            >
              {link.name}
            </Link>
          ))}

          {/* Dashboard Button (Only Shows When userType is Loaded) */}
          {userType && (
            <Link
              to={userType === "ngo" ? "/ngo/dashboard" : "/restaurant/dashboard"}
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium",
                location.pathname === (userType === "ngo" ? "/ngo/dashboard" : "/restaurant/dashboard")
                  ? "text-connect-green-500 bg-connect-green-50/50"
                  : "hover:text-connect-green-500"
              )}
            >
              Dashboard
            </Link>
          )}

          {/* Authentication Buttons */}
          {user ? (
            <Button onClick={handleLogout} className="text-sm bg-connect-green-500 text-white hover:bg-connect-green-600">
              Logout
            </Button>
          ) : (
            <>
              <Button asChild variant="outline" className="text-sm">
                <Link to="/login">Log In</Link>
              </Button>
              <Button asChild className="text-sm bg-connect-green-500 hover:bg-connect-green-600">
                <Link to="/signup">Sign Up</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2">
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
