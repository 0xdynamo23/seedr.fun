"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

type Project = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  raised: number;
  contributors: number;
  category: string;
  logo: string;
  projectPics?: string[];
  links?: {
    telegram: string | null;
    x: string | null;
    discord: string | null;
    website: string | null;
  }[];
  timestamp: string;
  createdAt: string;
};

interface AboutTabProps {
  project: Project;
  showFullDescription: boolean;
  setShowFullDescription: (show: boolean) => void;
}

const AboutTab = ({ 
  project, 
  showFullDescription, 
  setShowFullDescription 
}: AboutTabProps) => {
  // Function to truncate text
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
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
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h2 
        className="text-2xl font-bold text-gray-900 mb-4"
        variants={itemVariants}
      >
        About {project.name}
      </motion.h2>
      
      <motion.div 
        className="prose prose-lg text-gray-700 w-full"
        variants={itemVariants}
      >
        {showFullDescription || project.description.length <= 300 ? (
          <motion.p
            initial={{ height: "auto" }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.5 }}
          >
            {project.description}
          </motion.p>
        ) : (
          <>
            <motion.p
              initial={{ height: "auto" }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              transition={{ duration: 0.5 }}
            >
              {truncateText(project.description, 300)}
            </motion.p>
            <motion.button 
              onClick={() => setShowFullDescription(true)}
              className="text-green-500 font-medium flex items-center mt-2 hover:text-green-600 transition-colors"
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.95 }}
              variants={itemVariants}
            >
              Read more 
              <motion.div
                animate={{ y: [0, 3, 0] }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity,
                  repeatType: "loop"
                }}
              >
                <ChevronDown className="ml-1 w-4 h-4" />
              </motion.div>
            </motion.button>
          </>
        )}
        
        {showFullDescription && project.description.length > 300 && (
          <motion.button 
            onClick={() => setShowFullDescription(false)}
            className="text-green-500 font-medium flex items-center mt-2 hover:text-green-600 transition-colors"
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            Show less 
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity,
                repeatType: "loop"
              }}
            >
              <ChevronUp className="ml-1 w-4 h-4" />
            </motion.div>
          </motion.button>
        )}
      </motion.div>
      
      <motion.div 
        className="mt-8"
        variants={itemVariants}
      >
        <h3 className="text-xl font-semibold text-gray-900 mb-3">Tags</h3>
        <div className="flex flex-wrap gap-2">
          <motion.span 
            className="px-4 py-2 bg-gray-100 text-gray-800 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors cursor-pointer"
            whileHover={{ 
              scale: 1.05, 
              backgroundColor: "#e5e7eb",
              y: -2
            }}
            whileTap={{ scale: 0.95 }}
          >
            {project.category}
          </motion.span>
        </div>
      </motion.div>
      
      <motion.div 
        className="mt-8 text-gray-500 text-sm"
        variants={itemVariants}
      >
        {project.createdAt ? (
          <div className="flex items-center">
            <motion.span 
              className="inline-block w-4 h-4 bg-gray-200 rounded-full mr-2"
              animate={{ 
                scale: [1, 1.2, 1],
                backgroundColor: ["#e5e7eb", "#d1d5db", "#e5e7eb"]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
            <span>
              Created: {new Date(project.createdAt).toLocaleString("en-US", {
                weekday: 'long',
                year: 'numeric',
                month: 'short',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
              }).replace(',', ' |')}
            </span>
          </div>
        ) : (
          <span className="text-red-500">Invalid date</span>
        )}
      </motion.div>
    </motion.div>
  );
};

export default AboutTab; 