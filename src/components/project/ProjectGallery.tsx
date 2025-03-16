"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

interface ProjectGalleryProps {
  projectPics: string[];
  projectName: string;
}

const ProjectGallery = ({ projectPics, projectName }: ProjectGalleryProps) => {
  const galleryRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(galleryRef, { once: false, amount: 0.2 });

  // Staggered animation for gallery items
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

  if (!projectPics || projectPics.length === 0) {
    return null;
  }

  return (
    <motion.div
      ref={galleryRef}
      className="mb-12 w-full"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        {projectPics.map((pic, index) => (
          <motion.div
            key={index}
            className="relative aspect-video rounded-2xl overflow-hidden group w-full"
            variants={itemVariants}
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
            }}
            transition={{ duration: 0.2 }}
          >
            {/* Shimmer effect while loading */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ 
                duration: 1.5, 
                repeat: 1,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
            />
            
            <Image
              src={pic}
              alt={`${projectName} pic ${index + 1}`}
              className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
              width={500}
              height={300}
            />
            
            {/* Overlay on hover */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              whileHover={{ opacity: 1 }}
            />
            
            {/* Image number indicator */}
            <motion.div 
              className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              {index + 1}/{projectPics.length}
            </motion.div>
          </motion.div>
        ))}
      </div>
      
      {/* View all button (if more than 6 images) */}
      {projectPics.length > 6 && (
        <motion.button
          className="mt-6 mx-auto flex items-center justify-center px-6 py-3 bg-white border border-gray-200 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors"
          whileHover={{ y: -2, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          View all {projectPics.length} images
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 ml-2" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M14 5l7 7m0 0l-7 7m7-7H3" 
            />
          </svg>
        </motion.button>
      )}
    </motion.div>
  );
};

export default ProjectGallery; 