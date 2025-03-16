"use client";
import { HeroSection, AnimatedBackground } from "@/components";
import { motion } from "framer-motion";
import { useEffect } from "react";
import confetti from "canvas-confetti";

const HomePage = () => {
  // Trigger confetti when the page loads
  useEffect(() => {
    const timer = setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 150,
        origin: { y: 0.3, x: 0.5 }
      });
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full min-h-screen overflow-x-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <AnimatedBackground variant="gradient" color="#22c55e" speed={15} />
      </div>
      
      <motion.div 
        className="relative z-10 w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <HeroSection />
      </motion.div>
    </div>
  );
};

export default HomePage;