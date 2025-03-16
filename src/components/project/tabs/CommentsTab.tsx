"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Heart } from "lucide-react";
import { FaUserAstronaut } from "react-icons/fa";

interface Comment {
  id: number;
  text: string;
  author: string;
  timestamp: string;
}

interface CommentsTabProps {
  comments: Comment[];
  onAddComment: (text: string) => void;
}

const CommentsTab = ({ comments, onAddComment }: CommentsTabProps) => {
  const [newComment, setNewComment] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [likedComments, setLikedComments] = useState<number[]>([]);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    
    setIsSubmitting(true);
    
    try {
      await onAddComment(newComment);
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleLike = (commentId: number) => {
    setLikedComments(prev => 
      prev.includes(commentId) 
        ? prev.filter(id => id !== commentId)
        : [...prev, commentId]
    );
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
        className="text-2xl font-bold text-gray-900 mb-6"
        variants={itemVariants}
      >
        Comments
      </motion.h2>
      
      {/* Add Comment Form */}
      <motion.div 
        className="mb-8"
        variants={itemVariants}
      >
        <div className="flex items-start gap-4">
          <motion.div 
            className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <FaUserAstronaut className="text-gray-500" />
          </motion.div>
          
          <div className="flex-1">
            <motion.div
              className={`relative transition-all duration-200 ${
                isFocused ? "transform -translate-y-1" : ""
              }`}
            >
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share your thoughts..."
                className={`w-full p-4 bg-gray-50 text-gray-800 rounded-xl border transition-all duration-200 outline-none resize-none ${
                  isFocused 
                    ? "border-green-500 ring-2 ring-green-500/20" 
                    : "border-gray-200 hover:border-gray-300"
                }`}
                rows={3}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              />
            </motion.div>
            
            <div className="flex justify-end mt-3">
              <motion.button
                onClick={handleAddComment}
                className="px-5 py-2.5 bg-green-500 text-white rounded-lg font-medium flex items-center gap-2 relative overflow-hidden"
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
                }}
                whileTap={{ scale: 0.98 }}
                disabled={!newComment.trim() || isSubmitting}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
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
                
                {isSubmitting ? (
                  <div className="flex items-center justify-center relative z-10">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span className="ml-2">Posting...</span>
                  </div>
                ) : (
                  <>
                    <MessageSquare className="w-4 h-4 relative z-10" />
                    <span className="relative z-10">Add comment</span>
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Comments List */}
      <motion.div 
        className="space-y-6"
        variants={containerVariants}
      >
        {comments.length === 0 ? (
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
              <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            </motion.div>
            <motion.p 
              className="text-gray-500 text-lg"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              No comments yet. Be the first to comment!
            </motion.p>
          </motion.div>
        ) : (
          <AnimatePresence>
            {comments.map((comment, index) => (
              <motion.div 
                key={comment.id} 
                className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors"
                variants={itemVariants}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                layout
              >
                {/* User Avatar */}
                <motion.div 
                  className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <FaUserAstronaut className="text-gray-500" />
                </motion.div>
                
                {/* Comment Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <motion.span 
                      className="font-medium text-gray-900"
                      whileHover={{ color: "#10b981" }}
                    >
                      {comment.author}
                    </motion.span>
                    <span className="text-sm text-gray-500">
                      {Math.floor((Date.now() - new Date(comment.timestamp).getTime()) / (1000 * 60))}m ago
                    </span>
                  </div>
                  <p className="text-gray-700">{comment.text.replace(/'/g, "&apos;")}</p>
                  
                  {/* Comment Actions */}
                  <div className="flex items-center gap-4 mt-2">
                    <motion.button 
                      className={`text-sm flex items-center gap-1 transition-colors ${
                        likedComments.includes(comment.id) 
                          ? "text-red-500" 
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                      onClick={() => toggleLike(comment.id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.div
                        animate={likedComments.includes(comment.id) ? {
                          scale: [1, 1.3, 1],
                        } : {}}
                        transition={{ duration: 0.3 }}
                      >
                        <Heart 
                          className={`w-4 h-4 ${likedComments.includes(comment.id) ? "fill-red-500" : ""}`} 
                        />
                      </motion.div>
                      Like
                    </motion.button>
                    <motion.button 
                      className="text-gray-500 text-sm flex items-center gap-1 hover:text-gray-700 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <MessageSquare className="w-4 h-4" /> Reply
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </motion.div>
    </motion.div>
  );
};

export default CommentsTab; 