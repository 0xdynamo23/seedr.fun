"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Heart, ChevronDown, ChevronUp } from "lucide-react";
import { FaUserAstronaut } from "react-icons/fa";

interface Comment {
  id: number;
  text: string;
  author: string;
  timestamp: string;
  replies?: Comment[];
  likeCount?: number;
  likes?: { userId: string }[];
  userId?: string;
}

interface CommentsTabProps {
  comments: Comment[];
  onAddComment: (text: string, parentId?: number) => void;
  onToggleLike: (commentId: number) => void;
  currentUserId: string;
}

const CommentsTab = ({ comments, onAddComment, onToggleLike, currentUserId }: CommentsTabProps) => {
  const [newComment, setNewComment] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyText, setReplyText] = useState("");
  const [showingReplies, setShowingReplies] = useState<number[]>([]);
  
  const isCommentLikedByUser = (comment: Comment) => {
    console.log(`Checking like status for comment ${comment.id}:`, {
      currentUserId,
      likes: comment.likes || [],
      result: comment.likes?.some(like => like.userId === currentUserId) || false
    });
    return comment.likes?.some(like => like.userId === currentUserId) || false;
  };
  
  const toggleShowReplies = (commentId: number) => {
    setShowingReplies(prev => 
      prev.includes(commentId)
        ? prev.filter(id => id !== commentId)
        : [...prev, commentId]
    );
  };

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
  
  const handleAddReply = async (parentId: number) => {
    if (!replyText.trim()) return;
    
    setIsSubmitting(true);
    
    try {
      await onAddComment(replyText, parentId);
      setReplyText("");
      setReplyingTo(null);
    } catch (error) {
      console.error("Error adding reply:", error);
    } finally {
      setIsSubmitting(false);
    }
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
        className="space-y-8"
        variants={containerVariants}
      >
        {comments.length === 0 ? (
          <motion.div
            className="text-center py-8 text-gray-500"
            variants={itemVariants}
          >
            Be the first to comment!
          </motion.div>
        ) : (
          <AnimatePresence>
            {comments.map((comment, index) => (
              <motion.div 
                key={comment.id}
                className="flex gap-4"
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.05,
                }}
              >
                <motion.div 
                  className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0"
                >
                  <FaUserAstronaut className="text-gray-500" />
                </motion.div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <motion.span 
                      className="font-medium text-gray-900"
                      whileHover={{ color: "#10b981" }}
                    >
                      {comment.author || (comment.userId === currentUserId ? "You" : `User-${comment.userId?.substring(0, 6)}`)}
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
                        isCommentLikedByUser(comment)
                          ? "text-red-500" 
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                      onClick={() => onToggleLike(comment.id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.div
                        animate={isCommentLikedByUser(comment) ? {
                          scale: [1, 1.3, 1],
                        } : {}}
                        transition={{ duration: 0.3 }}
                      >
                        <Heart 
                          className={`w-4 h-4 ${isCommentLikedByUser(comment) ? "fill-red-500" : ""}`} 
                        />
                      </motion.div>
                      {comment.likeCount || 0} {comment.likeCount === 1 ? 'Like' : 'Likes'}
                    </motion.button>
                    
                    <motion.button 
                      className="text-gray-500 text-sm flex items-center gap-1 hover:text-gray-700 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                    >
                      <MessageSquare className="w-4 h-4" /> 
                      Reply
                    </motion.button>
                    
                    {comment.replies && comment.replies.length > 0 && (
                      <motion.button 
                        className="text-gray-500 text-sm flex items-center gap-1 hover:text-gray-700 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => toggleShowReplies(comment.id)}
                      >
                        {showingReplies.includes(comment.id) ? (
                          <>
                            <ChevronUp className="w-4 h-4" /> 
                            Hide Replies ({comment.replies.length})
                          </>
                        ) : (
                          <>
                            <ChevronDown className="w-4 h-4" /> 
                            Show Replies ({comment.replies.length})
                          </>
                        )}
                      </motion.button>
                    )}
                  </div>
                  
                  {/* Reply Form */}
                  {replyingTo === comment.id && (
                    <motion.div 
                      className="mt-4"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                          <FaUserAstronaut className="text-gray-500 text-sm" />
                        </div>
                        
                        <div className="flex-1">
                          <textarea
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder="Write a reply..."
                            className="w-full p-3 bg-gray-50 text-gray-800 rounded-xl border border-gray-200 outline-none resize-none text-sm"
                            rows={2}
                          />
                          
                          <div className="flex justify-end gap-2 mt-2">
                            <button 
                              className="px-3 py-1.5 text-sm text-gray-600 bg-gray-100 rounded-lg"
                              onClick={() => setReplyingTo(null)}
                            >
                              Cancel
                            </button>
                            <button 
                              className="px-3 py-1.5 text-sm text-white bg-green-500 rounded-lg disabled:bg-green-300"
                              onClick={() => handleAddReply(comment.id)}
                              disabled={!replyText.trim() || isSubmitting}
                            >
                              {isSubmitting ? 'Posting...' : 'Post Reply'}
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  {/* Replies List */}
                  {comment.replies && comment.replies.length > 0 && showingReplies.includes(comment.id) && (
                    <motion.div 
                      className="mt-4 space-y-4 pl-8 border-l-2 border-gray-100"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      {comment.replies.map((reply) => (
                        <div key={reply.id} className="flex gap-3">
                          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                            <FaUserAstronaut className="text-gray-500 text-sm" />
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-gray-900 text-sm">
                                {reply.author || (reply.userId === currentUserId ? "You" : `User-${reply.userId?.substring(0, 6)}`)}
                              </span>
                              <span className="text-xs text-gray-500">
                                {Math.floor((Date.now() - new Date(reply.timestamp).getTime()) / (1000 * 60))}m ago
                              </span>
                            </div>
                            
                            <p className="text-gray-700 text-sm">{reply.text}</p>
                            
                            {/* Reply Actions */}
                            <div className="flex items-center gap-3 mt-1.5">
                              <motion.button 
                                className={`text-xs flex items-center gap-1 transition-colors ${
                                  isCommentLikedByUser(reply)
                                    ? "text-red-500" 
                                    : "text-gray-500 hover:text-gray-700"
                                }`}
                                onClick={() => onToggleLike(reply.id)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <Heart 
                                  className={`w-3 h-3 ${isCommentLikedByUser(reply) ? "fill-red-500" : ""}`} 
                                />
                                {reply.likeCount || 0}
                              </motion.button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}
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