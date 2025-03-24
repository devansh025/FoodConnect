
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";

// Pages
import HomePage from "./pages/Index";
import HowItWorks from "./pages/HowItWorks";
import Browse from "./pages/Browse";
import About from "./pages/About";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import RestaurantDashboard from "./pages/RestaurantDashboard";
import NgoDashboard from "./pages/NgoDashboard";
import FoodDetail from "./pages/FoodDetail";
import NotFound from "./pages/NotFound";

// Layout
import MainLayout from "./components/layout/MainLayout";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    console.log("App component mounted");
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AnimatePresence mode="wait">
            <MainLayout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/how-it-works" element={<HowItWorks />} />
                <Route path="/browse" element={<Browse />} />
                <Route path="/about" element={<About />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="/restaurant/dashboard" element={<RestaurantDashboard />} />
                <Route path="/ngo/dashboard" element={<NgoDashboard />} />
                <Route path="/food/:id" element={<FoodDetail />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </MainLayout>
          </AnimatePresence>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
