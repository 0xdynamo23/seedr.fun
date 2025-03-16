"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaDollarSign } from "react-icons/fa";
import { BiBookmark, BiSolidBookmark } from "react-icons/bi";
import { Share2 } from "lucide-react";

interface ProjectActionsProps {
  isBookmarked: boolean;
  onBelieveClick: () => void;
  onBookmarkClick: () => void;
  onShareClick?: () => void;
}

const ProjectActions = ({
  isBookmarked,
  onBelieveClick,
  onBookmarkClick,
  onShareClick = () => {},
}: ProjectActionsProps) => {
  // Staggered animation for buttons
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
      },
    },
  };

  return (
    <motion.div 
      className="flex flex-wrap gap-3 mb-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.button
        onClick={onBelieveClick}
        className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-400 text-white rounded-full font-medium shadow-lg shadow-green-500/20 relative overflow-hidden"
        variants={itemVariants}
        whileHover={{ 
          scale: 1.03, 
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
        }}
        whileTap={{ scale: 0.97 }}
      >
        {/* Animated gradient background */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-300 opacity-0"
          animate={{ 
            x: ["0%", "100%", "0%"],
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear"
          }}
        />
        
        {/* Animated dollar icon */}
        <motion.div
          animate={{ 
            rotate: [0, 5, 0, -5, 0],
            scale: [1, 1.1, 1, 1.1, 1]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            repeatType: "loop"
          }}
        >
          <FaDollarSign className="text-xl" />
        </motion.div>
        
        <span className="relative z-10">Believe</span>
        
        {/* Subtle particle effects */}
        <motion.div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-white/40"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{ 
                y: [0, -10, 0],
                opacity: [0, 0.5, 0],
                scale: [0, 1, 0],
              }}
              transition={{ 
                duration: 1 + Math.random() * 1,
                repeat: Infinity,
                repeatDelay: Math.random() * 2,
                ease: "easeOut"
              }}
            />
          ))}
        </motion.div>
      </motion.button>
      
      <motion.button
        onClick={onBookmarkClick}
        className={`flex items-center gap-2 px-4 py-3 rounded-full font-medium border transition-all duration-300 ${
          isBookmarked 
            ? "bg-gray-100 border-gray-200 text-gray-800" 
            : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
        }`}
        variants={itemVariants}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
      >
        <motion.div
          animate={isBookmarked ? { 
            scale: [1, 1.2, 1],
            rotate: [0, -5, 5, 0],
          } : {}}
          transition={{ 
            duration: 0.4,
            ease: "easeInOut"
          }}
        >
          {isBookmarked ? (
            <BiSolidBookmark className="text-xl text-gray-700" />
          ) : (
            <BiBookmark className="text-xl" />
          )}
        </motion.div>
        <span>{isBookmarked ? "Bookmarked" : "Bookmark"}</span>
      </motion.button>
      
      <motion.button
        onClick={onShareClick}
        className="flex items-center gap-2 px-4 py-3 rounded-full font-medium bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 relative overflow-hidden"
        variants={itemVariants}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
      >
        <motion.div
          whileHover={{ 
            rotate: [0, 15, -15, 0],
          }}
          transition={{ duration: 0.5 }}
        >
          <Share2 className="w-5 h-5" />
        </motion.div>
        <span>Share</span>
      </motion.button>
    </motion.div>
  );
};

export default ProjectActions; 