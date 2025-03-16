"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
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
  
  const y = useTransform(scrollY, [0, 300], [0, 150]);
  const opacity = useTransform(scrollY, [0, 200], [1, 0]);
  const scale = useTransform(scrollY, [0, 200], [1, 1.1]);
  
  const springY = useSpring(y, { stiffness: 100, damping: 30 });
  const springOpacity = useSpring(opacity, { stiffness: 100, damping: 30 });
  const springScale = useSpring(scale, { stiffness: 100, damping: 30 });
  
  const bgY = useTransform(scrollY, [0, 300], [0, 100]);
  const springBgY = useSpring(bgY, { stiffness: 100, damping: 30 });
  
  const rotate = useTransform(scrollY, [0, 200], [0, -5]);
  const springRotate = useSpring(rotate, { stiffness: 100, damping: 30 });

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
          <Image
            src={project.projectPics[0]}
            alt={project.name}
            fill
            className="object-cover opacity-70 w-full"
            priority
          />
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
        
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-white/40"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{ 
                y: [0, -15, 0],
                opacity: [0.2, 0.5, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{ 
                duration: 3 + Math.random() * 5,
                repeat: Infinity,
                repeatType: "reverse",
                delay: Math.random() * 5
              }}
            />
          ))}
        </div>
      </motion.div>
      
      <div className="relative z-20 w-full px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-end pb-12">
        <motion.div 
          className="flex items-center space-x-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ opacity: springOpacity }}
        >
          <motion.div 
            className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-4 border-white shadow-xl"
            style={{ rotate: springRotate }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Image
              src={project.logo}
              alt={project.name}
              fill
              className="object-contain bg-white"
            />
            
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              initial={{ x: '-100%' }}
              animate={{ x: '200%' }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity,
                repeatDelay: 3
              }}
            />
          </motion.div>
          
          <div>
            <motion.h1 
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              style={{
                textShadow: "0 1px 2px rgba(255, 255, 255, 0.5)"
              }}
            >
              {project.name}
            </motion.h1>
            <motion.p 
              className="text-lg sm:text-xl text-gray-700 mt-1 font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {project.tagline}
            </motion.p>
          </div>
        </motion.div>
        
        <motion.div 
          className="flex flex-wrap items-center gap-4 mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <motion.div 
            className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm"
            whileHover={{ 
              y: -2, 
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
              backgroundColor: "rgba(255, 255, 255, 0.9)"
            }}
          >
            <motion.div 
              className="w-2 h-2 bg-green-500 rounded-full"
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                repeatType: "reverse" 
              }}
            />
            <span className="text-gray-700">
              <span className="font-semibold">{project.contributors || 1}</span> Contributor{(project.contributors || 1) !== 1 ? 's' : ''}
            </span>
          </motion.div>
          
          <motion.div 
            className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm"
            whileHover={{ 
              y: -2, 
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
              backgroundColor: "rgba(255, 255, 255, 0.9)"
            }}
          >
            <motion.div
              animate={{ 
                rotate: [0, 10, 0, -10, 0],
                scale: [1, 1.1, 1, 1.1, 1]
              }}
              transition={{ 
                duration: 5, 
                repeat: Infinity,
                repeatType: "reverse",
                repeatDelay: 2
              }}
            >
              <FaDollarSign className="text-green-500" />
            </motion.div>
            <span className="text-gray-700">
              <motion.span 
                className="font-semibold"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.6 }}
              >
                ${project.raised || 0}
              </motion.span> Raised
            </span>
          </motion.div>
          
          <motion.div 
            className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm"
            whileHover={{ 
              y: -2, 
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
              backgroundColor: "rgba(255, 255, 255, 0.9)"
            }}
          >
            <span className="text-gray-700 font-medium">
              {project.category}
            </span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectHeader; 