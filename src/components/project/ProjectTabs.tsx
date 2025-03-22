"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import AboutTab from "./tabs/AboutTab";
import CommentsTab from "./tabs/CommentsTab";
import SocialsTab from "./tabs/SocialsTab";

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

interface Comment {
  id: number;
  text: string;
  author: string;
  timestamp: string;
  replies?: Comment[];
  likeCount?: number;
  likes?: any[];
  userId?: string;
}

interface ProjectTabsProps {
  project: Project;
  comments: Comment[];
  onAddComment: (text: string, parentId?: number) => void;
  onToggleLike: (commentId: number) => void;
  currentUserId: string;
}

const ProjectTabs = ({ project, comments, onAddComment, onToggleLike, currentUserId }: ProjectTabsProps) => {
  const [activeTab, setActiveTab] = useState("about");
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Tab transition variants
  const tabContentVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      transition: {
        duration: 0.2
      }
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: {
        duration: 0.2
      }
    }
  };

  // Tab indicator animation
  const tabIndicatorVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.3 } }
  };

  return (
    <>
      {/* Tab Navigation */}
      <div className="mb-8 border-b border-gray-200 w-full">
        <div className="flex space-x-8">
          <motion.button
            className={`pb-4 px-1 relative ${activeTab === 'about' ? 'text-green-500 font-medium' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('about')}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            About
            {activeTab === 'about' && (
              <motion.div 
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-500"
                layoutId="activeTab"
                variants={tabIndicatorVariants}
                initial="initial"
                animate="animate"
              />
            )}
          </motion.button>
          
          <motion.button
            className={`pb-4 px-1 relative ${activeTab === 'comments' ? 'text-green-500 font-medium' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('comments')}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <div className="flex items-center">
              Comments 
              <motion.span 
                className="ml-1.5 bg-gray-100 text-gray-700 text-xs px-1.5 py-0.5 rounded-full"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                {comments.length}
              </motion.span>
            </div>
            {activeTab === 'comments' && (
              <motion.div 
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-500"
                layoutId="activeTab"
                variants={tabIndicatorVariants}
                initial="initial"
                animate="animate"
              />
            )}
          </motion.button>
          
          <motion.button
            className={`pb-4 px-1 relative ${activeTab === 'socials' ? 'text-green-500 font-medium' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('socials')}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            Socials
            {activeTab === 'socials' && (
              <motion.div 
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-500"
                layoutId="activeTab"
                variants={tabIndicatorVariants}
                initial="initial"
                animate="animate"
              />
            )}
          </motion.button>
        </div>
      </div>
      
      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'about' && (
          <motion.div
            key="about"
            variants={tabContentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-full"
          >
            <AboutTab 
              project={project} 
              showFullDescription={showFullDescription}
              setShowFullDescription={setShowFullDescription}
            />
          </motion.div>
        )}
        
        {activeTab === 'comments' && (
          <motion.div
            key="comments"
            variants={tabContentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-full"
          >
            <CommentsTab 
              comments={comments} 
              onAddComment={onAddComment} 
              onToggleLike={onToggleLike}
              currentUserId={currentUserId}
            />
          </motion.div>
        )}
        
        {activeTab === 'socials' && (
          <motion.div
            key="socials"
            variants={tabContentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-full"
          >
            <SocialsTab project={project} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectTabs; 