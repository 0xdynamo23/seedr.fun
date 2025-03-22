"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useInView, useAnimation } from "framer-motion";
import { ChevronLeft, ChevronRight, Sparkles, Star, Heart, Zap } from 'lucide-react';
import Footer from "../navigation/footer";
import Navbar from "../navigation/navbar";
import confetti from 'canvas-confetti';
import { useAbstraxionAccount, useModal } from "@burnt-labs/abstraxion";

type Project = {
  id: string;
  name: string;
  tagline: string;
  category: string;
  logo: string;
  description: string;
  raised?: number;
  contributors?: number;
};

type ProjectProps = { project: Project };

// Enhanced ProjectCard with animations and microinteractions
const ProjectCard: React.FC<{ project: Project; index: number; totalProjects: number }> = ({ project, index, totalProjects }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  // Animation timing constants based on your updated values
  const lineDuration = 1.5;
  const lineDelay = index * 0.5;
  const totalCycleDuration = (totalProjects) * 0.5 + lineDuration;

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsLiked(!isLiked);
    
    if (!isLiked) {
      // Trigger confetti when liking a project
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6, x: 0.5 }
      });
    }
  };

  return (
    <motion.div 
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
      }}
      whileHover={{ 
        scale: 1.03, 
        boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
        transition: { duration: 0.2 }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="p-6 rounded-xl border border-gray-200 bg-white relative overflow-hidden"
    >
      {/* Subtle scale effect when the line passes through */}
      <motion.div 
        className="absolute inset-0 z-0 pointer-events-none"
        animate={{ 
          scale: [1, 1.02, 1],
        }}
        transition={{ 
          duration: lineDuration * 0.8,
          delay: lineDelay,
          repeat: Infinity,
          repeatDelay: totalCycleDuration - lineDuration * 0.8,
          ease: "easeInOut"
        }}
      />
      
      {/* Card shine effect that activates when the line passes through */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-tr from-transparent via-emerald-100 to-transparent z-10 pointer-events-none opacity-0 mix-blend-screen"
        animate={{ 
          opacity: [0, 0.9, 0],
          backgroundPosition: ["0% 0%", "100% 100%"]
        }}
        transition={{ 
          duration: lineDuration * 0.8,
          delay: lineDelay,
          repeat: Infinity,
          repeatDelay: totalCycleDuration - lineDuration * 0.8,
          ease: "easeInOut"
        }}
        style={{
          backgroundSize: "200% 200%"
        }}
      />
      
      {/* Enhanced shine sweep effect */}
      <motion.div 
        className="absolute inset-0 z-10 pointer-events-none overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          className="absolute top-0 -left-[100%] w-[200%] h-full bg-gradient-to-r from-transparent via-emerald-100/80 to-transparent"
          animate={{
            left: ["-100%", "100%"]
          }}
          transition={{
            duration: lineDuration * 0.6,
            delay: lineDelay + lineDuration * 0.2,
            repeat: Infinity,
            repeatDelay: totalCycleDuration - lineDuration * 0.6,
            ease: "easeInOut"
          }}
          style={{
            filter: "blur(8px)",
            transform: "skewX(-15deg)"
          }}
        />
      </motion.div>
      
      {/* Subtle border glow effect */}
      <motion.div 
        className="absolute inset-0 rounded-xl z-10 pointer-events-none opacity-0"
        style={{ 
          boxShadow: "inset 0 0 20px rgba(16, 185, 129, 0.5), 0 0 15px rgba(16, 185, 129, 0.3)"
        }}
        animate={{ 
          opacity: [0, 1, 0],
        }}
        transition={{ 
          duration: lineDuration * 0.8,
          delay: lineDelay,
          repeat: Infinity,
          repeatDelay: totalCycleDuration - lineDuration * 0.8,
          ease: "easeInOut"
        }}
      />
      
      {/* Green line animation that passes through the top border */}
      <motion.div 
        className="absolute top-0 left-0 h-[3px] bg-gradient-to-r from-emerald-400 via-green-500 to-emerald-400 z-20"
        initial={{ width: "0%" }}
        animate={{ 
          width: ["0%", "100%", "100%", "0%"],
          left: ["0%", "0%", "0%", "100%"],
          opacity: [0.7, 1, 1, 0.7]
        }}
        transition={{ 
          times: [0, 0.4, 0.6, 1],
          duration: lineDuration, 
          delay: lineDelay, // Delay based on card index
          repeat: Infinity,
          repeatDelay: (totalProjects - 1) * 0.5 + lineDuration * 0.5, // Wait for all other cards to complete
          ease: "easeInOut"
        }}
        style={{
          boxShadow: "0 0 12px rgba(16, 185, 129, 0.8)",
          borderRadius: "4px"
        }}
      />
      
      {/* Content highlight effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-emerald-50/30 to-transparent z-5 pointer-events-none opacity-0"
        animate={{ 
          opacity: [0, 0.7, 0],
        }}
        transition={{ 
          duration: lineDuration * 0.8,
          delay: lineDelay,
          repeat: Infinity,
          repeatDelay: totalCycleDuration - lineDuration * 0.8,
          ease: "easeInOut"
        }}
      />
      
      {/* Animated corner accents */}
      <div className="absolute top-0 left-0 w-12 h-12 overflow-hidden opacity-30">
        <motion.div 
          className="w-3 h-3 bg-emerald-500 rounded-full absolute top-3 left-3"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: Math.random() * 2
          }}
        />
      </div>
      
      <div className="absolute bottom-0 right-0 w-12 h-12 overflow-hidden opacity-30">
        <motion.div 
          className="w-3 h-3 bg-emerald-500 rounded-full absolute bottom-3 right-3"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: Math.random() * 2 + 1
          }}
        />
      </div>
      
      {/* Animated line accents */}
      <motion.div 
        className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent"
        animate={{ 
          opacity: [0, 0.5, 0],
          left: ["-100%", "100%"]
        }}
        transition={{ 
          duration: 5, 
          repeat: Infinity,
          ease: "linear",
          delay: Math.random() * 3
        }}
      />
      
      <motion.div 
        className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent"
        animate={{ 
          opacity: [0, 0.5, 0],
          left: ["-100%", "100%"]
        }}
        transition={{ 
          duration: 5, 
          repeat: Infinity,
          ease: "linear",
          delay: Math.random() * 3 + 2
        }}
      />
      
      {/* Background pattern that appears on hover */}
      <motion.div 
        className="absolute inset-0 z-0 opacity-0"
        animate={{ opacity: isHovered ? 0.05 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent" />
        <div className="w-full h-full bg-[radial-gradient(#22c55e_1px,transparent_1px)] [background-size:16px_16px]" />
      </motion.div>

      <div className="flex items-start justify-between relative z-10">
        <div className="flex items-center gap-3">
          <motion.div 
            className="w-10 h-10 rounded-lg flex items-center justify-center overflow-hidden relative"
            whileHover={{ rotate: 5 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-transparent"
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            <Image src={project.logo} alt="Logo" width={40} height={40} className="relative z-10" />
          </motion.div>
          <div className="flex flex-col">
            <motion.span 
              className="font-medium text-gray-900"
              animate={{ color: isHovered ? "#059669" : "#111827" }}
              transition={{ duration: 0.2 }}
            >
              {project.name}
            </motion.span>
            <span className="text-sm text-gray-500">{project.tagline}</span>
          </div>
        </div>
        
        <motion.button
          onClick={handleLike}
          whileTap={{ scale: 0.9 }}
          className="text-gray-400 hover:text-red-500 transition-colors"
          animate={{ color: isLiked ? "#ef4444" : "#9ca3af" }}
        >
          <Heart className={`w-5 h-5 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
        </motion.button>
      </div>
      
      <div className="mt-4 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-2 flex-shrink-1 max-w-[60%]">
          <motion.div 
            className="flex items-center gap-1"
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: Math.random() * 2
              }}
            >
              <Zap className="w-3 h-3 text-amber-500" />
            </motion.div>
            <span className="text-sm text-gray-500">
              {project.contributors ?? 0} Contributors
            </span>
          </motion.div>
          <motion.span 
            className="text-sm font-medium"
            whileHover={{ scale: 1.05 }}
          >
            ${project.raised ?? 0} Raised
          </motion.span>
        </div>
        <motion.div
          whileHover={{ x: 3 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          className="min-w-[120px] text-right flex-shrink-0"
        >
          <Link href={`/project/${project.id}`} className="text-sm text-emerald-500 hover:underline flex items-center gap-2 justify-end whitespace-nowrap">
            <span>View Project</span>
            <motion.span
              animate={{ x: isHovered ? 3 : 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="inline-block"
            >
              →
            </motion.span>
          </Link>
        </motion.div>
      </div>
      
      {/* Category badge */}
      <motion.div 
        className="absolute top-2 right-12 px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
        transition={{ duration: 0.2 }}
      >
        {project.category}
      </motion.div>
    </motion.div>
  );
};

interface ApiResponse {
  success: boolean;
  data: Project[];
}

interface FloatingElementProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
}

// Animated floating elements
const FloatingElement: React.FC<FloatingElementProps> = ({ children, delay = 0, duration = 10, x = 20, y = 20 }) => (
  <motion.div
    animate={{
      y: [0, y, 0],
      x: [0, x, 0],
    }}
    transition={{
      duration,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
      delay,
    }}
  >
    {children}
  </motion.div>
);

const HeroSection = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isBuilder, setIsBuilder] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("Trending");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(3);
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });
  const { scrollY } = useScroll();
  const { isConnected } = useAbstraxionAccount();
  const [, setShow] = useModal();
  
  // Parallax effect for background
  const bgY = useTransform(scrollY, [0, 500], [0, -50]);
  
  // Items per page
  const itemsPerPage = 6;
  
  // Trigger confetti on page load
  useEffect(() => {
    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.3, x: 0.5 }
      });
    }, 1000);
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/getprojects");
        const result: ApiResponse = await response.json();
        console.log(result);
        setProjects(result.data);
        
        // Calculate total pages based on filtered projects
        const filteredProjects = result.data.filter((project) => 
          ["all projects", "trending"].includes(selectedCategory.toLowerCase()) || 
          project.category.toLowerCase() === selectedCategory.toLowerCase()
        );
        setTotalPages(Math.ceil(filteredProjects.length / itemsPerPage) || 1);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        // Add a slight delay to show loading animation
        setTimeout(() => setIsLoading(false), 800);
      }
    };

    fetchProjects();
  }, [selectedCategory]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsBuilder(prev => !prev);
    }, 2000); // Change every 2 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to first page when changing category
    
    // Small confetti burst on category change
    confetti({
      particleCount: 30,
      spread: 50,
      origin: { y: 0.5, x: 0.5 }
    });
  };
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to projects section
    const projectsSection = document.getElementById('projects-section');
    window.scrollTo({
      top: (projectsSection?.offsetTop ?? 0) - 100,
      behavior: 'smooth'
    });
  };
  
  // Get current projects to display based on pagination
  const getCurrentProjects = () => {
    if (!projects || !Array.isArray(projects)) return [];
    
    const filteredProjects = projects.filter((project) => 
      ["all projects", "trending"].includes(selectedCategory.toLowerCase()) || 
      project.category.toLowerCase() === selectedCategory.toLowerCase()
    );
    
    const indexOfLastProject = currentPage * itemsPerPage;
    const indexOfFirstProject = indexOfLastProject - itemsPerPage;
    
    return filteredProjects.slice(indexOfFirstProject, indexOfLastProject);
  };

  return (
    <div className="min-h-screen bg-white w-full">
      {/* Navbar */}
      <div className="relative z-50">
        <Navbar />
      </div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div style={{ y: bgY }} className="absolute inset-0">
          <FloatingElement delay={0} x={30} y={20}>
            <div className="absolute top-20 left-10 w-16 h-16 rounded-full bg-emerald-500/10 blur-xl" />
          </FloatingElement>
          <FloatingElement delay={1} x={-20} y={30}>
            <div className="absolute top-40 right-20 w-24 h-24 rounded-full bg-amber-500/10 blur-xl" />
          </FloatingElement>
          <FloatingElement delay={0.5} x={25} y={-15}>
            <div className="absolute bottom-60 left-1/4 w-20 h-20 rounded-full bg-blue-500/10 blur-xl" />
          </FloatingElement>
        </motion.div>
      </div>

      {/* Background image */}
      <div className="absolute top-0 right-0 h-screen w-1/2 z-0 hidden md:block overflow-hidden">
        <div className="relative h-full w-full">
          <Image
            src="/bg-right.png"
            alt="Background"
            fill
            style={{ objectFit: "cover", objectPosition: "left center" }}
            className="rounded-l-3xl"
            priority
          />
        </div>
      </div>

      {/* Content - Ensuring consistent alignment with navbar */}
      <div className="relative w-full mx-auto max-w-7xl">
        <div className="pt-24 w-full px-4 sm:px-6 lg:px-8">
          {/* Hero Content */}
          <motion.div 
            ref={heroRef}
            className="max-w-2xl mb-16 z-20 relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: isHeroInView ? 1 : 0, 
              y: isHeroInView ? 0 : 20 
            }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-2xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 flex flex-col items-start">
              <motion.span 
                className="flex items-center"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                Support 
                <motion.span 
                  className="inline-flex items-center ml-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Builders
                </motion.span>
              </motion.span>
              <motion.span 
                className="relative"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <span className="text-gray-900">You </span>
                <span className="relative inline-block">
                  <span className="relative z-10 text-transparent bg-clip-text font-bold">Trust</span>
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-green-400 to-emerald-600 bg-clip-text text-transparent font-bold"
                    animate={{ 
                      backgroundPosition: ["0% center", "100% center", "0% center"],
                    }}
                    transition={{ 
                      duration: 5, 
                      repeat: Infinity, 
                      ease: "linear",
                    }}
                    style={{ 
                      backgroundSize: "200% 100%",
                    }}
                  >
                    Trust
                  </motion.div>
                </span>
              </motion.span>
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-gray-600 text-lg mb-8"
            >
              Make a difference by supporting initiatives you believe in,
              contribute through Seeder rounds to bring impactful ideas to life.
            </motion.p>

            <Link href={isConnected ? "/form" : "/"}>
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 25px -5px rgba(16, 185, 129, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
                className="bg-green-500 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 relative overflow-hidden group"
                onClick={(e) => {
                  if (!isConnected) {
                    e.preventDefault();
                    setShow(true);
                  }
                }}
              >
                <motion.span 
                  className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                <motion.span className="relative z-10 flex items-center gap-2">
                  {isConnected ? "Start posting" : "Connect wallet"}
                  <motion.svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ 
                      duration: 1.5, 
                      repeat: Infinity, 
                      repeatType: "loop",
                      ease: "easeInOut",
                      repeatDelay: 1
                    }}
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </motion.svg>
                </motion.span>
              </motion.button>
            </Link>
          </motion.div>

          {/* Projects Section - Ensuring full width */}
          <motion.div 
            id="projects-section"
            className="w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <div className="flex justify-between items-center mb-4 w-full">
              <h2 className="text-xl font-medium text-gray-900">Projects</h2>
            </div>

            {/* Category Filters */}
            <motion.div 
              className="flex flex-wrap gap-3 mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              {[
                "Trending",
                "All Projects",
                "Infrastructure",
                "DAO",
                "DeFi",
                "NFT",
              ].map((category, index) => (
                <motion.button
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 rounded-full text-sm whitespace-nowrap relative overflow-hidden ${
                    category === selectedCategory
                      ? "bg-gray-900 text-white"
                      : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {category === selectedCategory && (
                    <motion.span
                      layoutId="activeCategoryBackground"
                      className="absolute inset-0 bg-gray-900"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{category}</span>
                </motion.button>
              ))}
            </motion.div>

            {/* Projects Grid with Loading State - Ensuring full width */}
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div 
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full flex flex-col items-center justify-center py-12"
                >
                  <motion.div 
                    className="w-16 h-16 relative"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <div className="absolute inset-0 rounded-full border-t-4 border-emerald-500 border-opacity-50"></div>
                    <div className="absolute inset-0 rounded-full border-l-4 border-emerald-500"></div>
                    <div className="absolute inset-0 rounded-full border-b-4 border-emerald-500 border-opacity-25"></div>
                  </motion.div>
                  <motion.p 
                    className="mt-4 text-gray-500"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    Loading amazing projects...
                  </motion.p>
                </motion.div>
              ) : (
                <motion.div 
                  key="projects"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {Array.isArray(projects) && getCurrentProjects().length > 0 ? (
                    getCurrentProjects().map((project, i) => (
                      <ProjectCard 
                        key={project.id} 
                        project={project} 
                        index={i} 
                        totalProjects={getCurrentProjects().length} 
                      />
                    ))
                  ) : (
                    <div className="col-span-3 text-center py-8 text-gray-500">
                      No projects found for this category
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Pagination */}
            {!isLoading && totalPages > 1 && (
              <motion.div 
                className="flex justify-center items-center gap-2 mt-8 w-full"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.4 }}
              >
                {currentPage > 1 && (
                  <motion.button 
                    onClick={() => handlePageChange(currentPage - 1)}
                    whileHover={{ scale: 1.05, x: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-3 py-1 rounded-full text-gray-600 hover:bg-gray-50"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </motion.button>
                )}
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <motion.button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-8 h-8 flex items-center justify-center rounded-full ${
                      page === currentPage ? "bg-gray-100" : "hover:bg-gray-50"
                    } text-black relative`}
                  >
                    {page === currentPage && (
                      <motion.span
                        layoutId="activePageBackground"
                        className="absolute inset-0 bg-gray-100 rounded-full"
                        initial={false}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{page}</span>
                  </motion.button>
                ))}
                
                {currentPage < totalPages && (
                  <motion.button 
                    onClick={() => handlePageChange(currentPage + 1)}
                    whileHover={{ scale: 1.05, x: 2 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-1 px-3 py-1 rounded-full text-gray-600 hover:bg-gray-50"
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </motion.button>
                )}
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
};

export default HeroSection;