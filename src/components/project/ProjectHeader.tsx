"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { FaDollarSign } from "react-icons/fa";

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

interface ProjectHeaderProps {
  project: Project;
}

const ProjectHeader = ({ project }: ProjectHeaderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  
  // Parallax effect for banner
  const y = useTransform(scrollY, [0, 500], [0, 100]);
  const bgY = useTransform(scrollY, [0, 500], [0, -50]);
  const scale = useTransform(scrollY, [0, 500], [1, 1.2]);
  
  // Smoother animation
  const springBgY = useSpring(bgY, { stiffness: 100, damping: 30 });
  const springScale = useSpring(scale, { stiffness: 100, damping: 30 });
  
  // Auto carousel effect for multiple banners
  useEffect(() => {
    if (!project.projectPics || project.projectPics.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentBannerIndex(prev => (prev + 1) % project.projectPics!.length);
    }, 6000); // Change banner every 6 seconds
    
    return () => clearInterval(interval);
  }, [project.projectPics]);
  
  // Choose banner URL
  const getBannerUrl = () => {
    if (!project.projectPics || project.projectPics.length === 0) {
      return null;
    }
    
    return project.projectPics[currentBannerIndex];
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[50vh] overflow-hidden mt-20"
    >
      <motion.div 
        className="absolute inset-0 w-full h-[150%] -top-[25%] bg-gradient-to-b from-black/40 to-transparent z-10"
        style={{ 
          y: springBgY,
          scale: springScale
        }}
      >
        {project.projectPics && project.projectPics.length > 0 ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentBannerIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0"
            >
              <Image
                src={getBannerUrl() || ""}
                alt={project.name}
                fill
                className="object-cover opacity-70 w-full"
                priority
              />
              
              {/* Progressive indicator for multiple banners */}
              {project.projectPics.length > 1 && (
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
                  {project.projectPics.map((_, index) => (
                    <div 
                      key={index}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        index === currentBannerIndex 
                          ? "w-8 bg-white" 
                          : "w-2 bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-xl"></div>
        )}
        
        <motion.div 
          className="absolute inset-0 bg-[url('/noise.webp')] opacity-30 mix-blend-overlay"
          animate={{ 
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity,
            repeatType: "reverse" 
          }}
        />
        
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent"
          animate={{ 
            opacity: [0.8, 0.85, 0.8],
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity,
            repeatType: "reverse" 
          }}
        />
      </motion.div>
      
      <div className="absolute bottom-0 left-0 w-full px-4 sm:px-6 lg:px-8 pb-8 pt-24 bg-gradient-to-t from-white via-white/95 to-transparent z-20">
        <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
          {/* Project Logo */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-white shadow-lg border border-gray-200">
            <Image 
              src={project.logo || "https://via.placeholder.com/80"} 
              alt={project.name}
              width={80}
              height={80}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Project Title & Tagline */}
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{project.name}</h1>
            <p className="text-gray-700 max-w-3xl">{project.tagline}</p>
          </div>
          
          {/* Project Stats */}
          <div className="flex flex-col items-end gap-2 hidden sm:flex">
            <div className="flex items-center gap-2 bg-emerald-100 px-4 py-2 rounded-full">
              <div className="p-1 bg-emerald-500 rounded-full">
                <FaDollarSign className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-emerald-700">
                {project.raised || 0} <span className="font-normal">XION raised</span>
              </span>
            </div>
            <div className="text-sm text-gray-500">
              {project.contributors || 0} believers
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectHeader; 