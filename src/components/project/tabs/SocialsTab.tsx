"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChevronRight, Globe } from "lucide-react";
import { FaDiscord, FaGlobe, FaTelegram, FaXTwitter } from "react-icons/fa6";

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

interface SocialsTabProps {
  project: Project;
}

const SocialsTab = ({ project }: SocialsTabProps) => {
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
        className="text-2xl font-bold text-gray-900 mb-6"
        variants={itemVariants}
      >
        Connect with {project.name}
      </motion.h2>
      
      {project.links && project.links.length > 0 ? (
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          variants={containerVariants}
        >
          {project.links.map((link, index) => (
            <React.Fragment key={index}>
              {link.telegram && (
                <motion.a 
                  href={`https://t.me/${link.telegram}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-300 relative overflow-hidden group"
                  variants={itemVariants}
                  whileHover={{ 
                    y: -5, 
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Background gradient that appears on hover */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-blue-50 to-blue-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  />
                  
                  <motion.div 
                    className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center relative z-10"
                    whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <FaTelegram className="w-6 h-6 text-blue-500" />
                  </motion.div>
                  
                  <div className="relative z-10">
                    <h3 className="font-medium text-gray-900">Telegram</h3>
                    <p className="text-sm text-gray-500">@{link.telegram}</p>
                  </div>
                  
                  <motion.div
                    className="ml-auto relative z-10"
                    animate={{ x: 0 }}
                    whileHover={{ x: 3 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                  </motion.div>
                </motion.a>
              )}
              
              {link.discord && (
                <motion.a 
                  href={link.discord} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-300 relative overflow-hidden group"
                  variants={itemVariants}
                  whileHover={{ 
                    y: -5, 
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Background gradient that appears on hover */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-indigo-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  />
                  
                  <motion.div 
                    className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center relative z-10"
                    whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <FaDiscord className="w-6 h-6 text-indigo-500" />
                  </motion.div>
                  
                  <div className="relative z-10">
                    <h3 className="font-medium text-gray-900">Discord</h3>
                    <p className="text-sm text-gray-500">Join the community</p>
                  </div>
                  
                  <motion.div
                    className="ml-auto relative z-10"
                    animate={{ x: 0 }}
                    whileHover={{ x: 3 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-indigo-500 transition-colors" />
                  </motion.div>
                </motion.a>
              )}
              
              {link.website && (
                <motion.a 
                  href={link.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-300 relative overflow-hidden group"
                  variants={itemVariants}
                  whileHover={{ 
                    y: -5, 
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Background gradient that appears on hover */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-green-50 to-green-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  />
                  
                  <motion.div 
                    className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center relative z-10"
                    whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <FaGlobe className="w-6 h-6 text-green-500" />
                  </motion.div>
                  
                  <div className="relative z-10">
                    <h3 className="font-medium text-gray-900">Website</h3>
                    <p className="text-sm text-gray-500 truncate max-w-[150px]">{link.website}</p>
                  </div>
                  
                  <motion.div
                    className="ml-auto relative z-10"
                    animate={{ x: 0 }}
                    whileHover={{ x: 3 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-green-500 transition-colors" />
                  </motion.div>
                </motion.a>
              )}
              
              {link.x && (
                <motion.a 
                  href={`https://x.com/${link.x}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-300 relative overflow-hidden group"
                  variants={itemVariants}
                  whileHover={{ 
                    y: -5, 
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Background gradient that appears on hover */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-gray-50 to-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  />
                  
                  <motion.div 
                    className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center relative z-10"
                    whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <FaXTwitter className="w-6 h-6 text-white" />
                  </motion.div>
                  
                  <div className="relative z-10">
                    <h3 className="font-medium text-gray-900">X (Twitter)</h3>
                    <p className="text-sm text-gray-500">@{link.x}</p>
                  </div>
                  
                  <motion.div
                    className="ml-auto relative z-10"
                    animate={{ x: 0 }}
                    whileHover={{ x: 3 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-700 transition-colors" />
                  </motion.div>
                </motion.a>
              )}
            </React.Fragment>
          ))}
        </motion.div>
      ) : (
        <motion.div 
          className="text-center py-12 bg-gray-50 rounded-xl"
          variants={itemVariants}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.3
            }}
          >
            <Globe className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          </motion.div>
          <motion.p 
            className="text-gray-500 text-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            No social links available for this project.
          </motion.p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default SocialsTab; 