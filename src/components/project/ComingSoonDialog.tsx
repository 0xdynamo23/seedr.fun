"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ComingSoonDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const ComingSoonDialog = ({ isOpen, onClose }: ComingSoonDialogProps) => {
  // Enhanced backdrop variants
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.3,
        when: "beforeChildren" 
      }
    },
    exit: { 
      opacity: 0,
      transition: { 
        duration: 0.3,
        when: "afterChildren" 
      }
    }
  };

  // Enhanced modal variants
  const modalVariants = {
    hidden: { 
      scale: 0.8, 
      opacity: 0,
      y: 20
    },
    visible: { 
      scale: 1, 
      opacity: 1,
      y: 0,
      transition: { 
        type: "spring", 
        damping: 25, 
        stiffness: 300,
        duration: 0.4
      }
    },
    exit: { 
      scale: 0.8, 
      opacity: 0,
      y: 20,
      transition: { 
        duration: 0.3
      }
    }
  };

  // Content animation variants
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { 
        delay: custom * 0.1 + 0.2,
        duration: 0.4,
        type: "spring",
        damping: 25,
        stiffness: 300
      }
    })
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
        >
          <motion.div 
            className="bg-white rounded-2xl p-8 text-center max-w-sm shadow-2xl relative overflow-hidden"
            variants={modalVariants}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Background Gradient Animation */}
            <motion.div 
              className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-green-200 to-green-400 rounded-full opacity-20 blur-2xl"
              animate={{ 
                rotate: [0, 15, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity,
                repeatType: "reverse" 
              }}
            />
            <motion.div 
              className="absolute -bottom-24 -left-24 w-48 h-48 bg-gradient-to-tr from-emerald-200 to-emerald-400 rounded-full opacity-20 blur-2xl"
              animate={{ 
                rotate: [0, -15, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity,
                repeatType: "reverse",
                delay: 1
              }}
            />
            
            <div className="relative">
              <motion.div 
                className="mb-4 inline-flex"
                custom={1}
                variants={contentVariants}
                initial="hidden"
                animate="visible"
              >
                <span className="inline-block px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm font-medium">
                  Heads up
                </span>
              </motion.div>
              
              <motion.h2 
                className="text-3xl font-bold bg-gradient-to-r from-green-500 to-emerald-700 bg-clip-text text-transparent mb-2"
                custom={2}
                variants={contentVariants}
                initial="hidden"
                animate="visible"
              >
                COMING SOON
              </motion.h2>
              
              <motion.p 
                className="mt-4 text-gray-600"
                custom={3}
                variants={contentVariants}
                initial="hidden"
                animate="visible"
              >
                We're working on something exciting. Stay tuned!
              </motion.p>
              
              <motion.button
                onClick={onClose}
                className="mt-6 bg-gradient-to-r from-green-500 to-emerald-400 text-white px-6 py-2.5 rounded-xl font-medium transition-all duration-300 shadow-lg shadow-green-500/20 relative overflow-hidden"
                custom={4}
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">Got it</span>
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ComingSoonDialog; 