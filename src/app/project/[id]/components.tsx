import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FaArrowRight, FaDollarSign } from "react-icons/fa";
import { Heart, MessageSquare, Star, Zap, Award, Gift, Sparkles } from "lucide-react";
import { toast } from "react-hot-toast";

// Types
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
}

// Payment Modal Component
interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project;
  onSubmit: (amount: number) => void;
}

export const PaymentModal = ({
  isOpen,
  onClose,
  project,
  onSubmit,
}: PaymentModalProps) => {
  const [amount, setAmount] = useState<number>(100);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = () => {
    setIsAnimating(true);
    setTimeout(() => {
      onSubmit(amount);
      setIsSubmitted(true);
      setIsAnimating(false);
      setTimeout(() => {
        setIsSubmitted(false);
        onClose();
      }, 2000);
    }, 600);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            className="bg-white rounded-2xl p-8 w-[480px] text-black shadow-2xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {!isSubmitted ? (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold text-black">
                    You&apos;re believing in
                  </h2>
                  <button
                    onClick={onClose}
                    className="text-gray-500 hover:text-gray-700 text-2xl transition-colors duration-200"
                  >
                    ×
                  </button>
                </div>

                <motion.div 
                  className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl mb-6 border border-gray-100"
                  whileHover={{ y: -2, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05)" }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="relative w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-xl overflow-hidden">
                    <Image
                      src={project.logo}
                      alt={project.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="font-medium text-lg">{project.name}</span>
                </motion.div>

                <div className="mb-6">
                  <div className="flex items-center border rounded-xl p-4 focus-within:ring-2 focus-within:ring-green-500 focus-within:border-transparent transition-all duration-200">
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(Number(e.target.value))}
                      className="w-full outline-none text-3xl font-bold text-black"
                      min="1"
                    />
                    <div className="flex items-center space-x-3">
                      <div className="relative w-8 h-8">
                        <Image
                          src="/Xion.png"
                          alt="Xion"
                          fill
                          className="object-contain"
                        />
                      </div>
                      <span className="text-gray-700 text-xl">XION</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-3 text-center">
                    All tips and sponsorships are directed entirely to the project,
                    with no platform fees or deductions.
                  </p>
                </div>

                <motion.button
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-400 text-white py-4 rounded-xl flex items-center justify-center space-x-3 text-lg font-medium relative overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isAnimating}
                >
                  {isAnimating ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                    </div>
                  ) : (
                    <>
                      <span>Believe with {amount} Xion</span>
                      <FaArrowRight className="text-xl" />
                    </>
                  )}
                </motion.button>
              </>
            ) : (
              <motion.div 
                className="text-center py-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 10, stiffness: 100, delay: 0.2 }}
                  className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <Heart className="text-green-500 w-8 h-8 fill-green-500" />
                </motion.div>
                <h3 className="text-3xl font-bold text-green-500 mb-3">
                  Thank you for believing!
                </h3>
                <p className="text-gray-700 text-lg">
                  Your support means a lot to {project.name}
                </p>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Coming Soon Dialog Component
interface ComingSoonDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ComingSoonDialog = ({ isOpen, onClose }: ComingSoonDialogProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div 
            className="bg-white rounded-2xl p-8 text-center max-w-sm shadow-2xl relative overflow-hidden"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Background Gradient */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-green-200 to-green-400 rounded-full opacity-20 blur-2xl"></div>
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-gradient-to-tr from-emerald-200 to-emerald-400 rounded-full opacity-20 blur-2xl"></div>
            
            <div className="relative">
              <motion.div 
                className="mb-4 inline-flex"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <span className="inline-block px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm font-medium">
                  Heads up
                </span>
              </motion.div>
              
              <motion.h2 
                className="text-3xl font-bold bg-gradient-to-r from-green-500 to-emerald-700 bg-clip-text text-transparent mb-2"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                COMING SOON
              </motion.h2>
              
              <motion.p 
                className="mt-4 text-gray-600"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                We're working on something exciting. Stay tuned!
              </motion.p>
              
              <motion.button
                onClick={onClose}
                className="mt-6 bg-gradient-to-r from-green-500 to-emerald-400 text-white px-6 py-2.5 rounded-xl font-medium transition-all duration-300 shadow-lg shadow-green-500/20"
                whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                whileTap={{ scale: 0.95 }}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Got it
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Floating Achievement Badge Component
interface AchievementBadgeProps {
  project: Project;
}

export const AchievementBadge = ({ project }: AchievementBadgeProps) => {
  const [showDetails, setShowDetails] = useState(false);
  
  return (
    <motion.div
      className="absolute top-4 right-4 z-30"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.8 }}
    >
      <motion.button
        className="relative bg-gradient-to-r from-amber-400 to-amber-600 p-3 rounded-full shadow-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowDetails(!showDetails)}
      >
        <Award className="w-6 h-6 text-white" />
        <motion.span 
          className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ delay: 1, duration: 0.5 }}
        ></motion.span>
      </motion.button>
      
      <AnimatePresence>
        {showDetails && (
          <motion.div
            className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-xl p-4 w-64"
            initial={{ opacity: 0, y: -10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            transition={{ type: "spring", damping: 20 }}
          >
            <h3 className="font-bold text-amber-600 flex items-center gap-2 mb-2">
              <Award className="w-5 h-5" /> Project Achievements
            </h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <div className="bg-amber-100 p-1.5 rounded-full">
                  <Star className="w-4 h-4 text-amber-600" />
                </div>
                <span>Rising Star Project</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="bg-green-100 p-1.5 rounded-full">
                  <Zap className="w-4 h-4 text-green-600" />
                </div>
                <span>100+ Believers Milestone</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="bg-purple-100 p-1.5 rounded-full">
                  <Gift className="w-4 h-4 text-purple-600" />
                </div>
                <span>Featured Project of the Week</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Animated Confetti Button
interface ConfettiButtonProps {
  onClick: () => void;
}

export const ConfettiButton = ({ onClick }: ConfettiButtonProps) => {
  const [isAnimating, setIsAnimating] = useState(false);
  
  const handleClick = () => {
    setIsAnimating(true);
    onClick();
    setTimeout(() => setIsAnimating(false), 1000);
  };
  
  return (
    <motion.button
      onClick={handleClick}
      className="relative flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-full font-medium overflow-hidden"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Sparkles className="w-5 h-5" />
      <span>Celebrate Project</span>
      
      {isAnimating && (
        <>
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              initial={{ 
                x: 0, 
                y: 0,
                backgroundColor: ['#FF5E5B', '#D8D8D8', '#FFED66', '#00CECB', '#FFAAA5'][Math.floor(Math.random() * 5)]
              }}
              animate={{ 
                x: (Math.random() - 0.5) * 200, 
                y: (Math.random() - 0.5) * 200,
                opacity: [1, 0],
                scale: [0, 1, 0.5, 0]
              }}
              transition={{ duration: 1 }}
            />
          ))}
        </>
      )}
    </motion.button>
  );
};

// Interactive Project Stats Card
interface ProjectStatsCardProps {
  project: Project;
}

export const ProjectStatsCard = ({ project }: ProjectStatsCardProps) => {
  return (
    <motion.div
      className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Stats</h3>
      
      <div className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm text-gray-600">Funding Progress</span>
            <span className="text-sm font-medium">{Math.min(100, Math.floor((project.raised / 1000) * 100))}%</span>
          </div>
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-green-500 to-emerald-400"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(100, Math.floor((project.raised / 1000) * 100))}%` }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm text-gray-600">Community Growth</span>
            <span className="text-sm font-medium">Active</span>
          </div>
          <div className="flex gap-1">
            {Array.from({ length: 7 }).map((_, i) => (
              <motion.div 
                key={i}
                className="h-8 w-4 bg-gray-100 rounded-sm"
                initial={{ height: 8 }}
                animate={{ height: [8, 8 + Math.random() * 24, 8] }}
                transition={{ 
                  repeat: Infinity, 
                  repeatType: "reverse", 
                  duration: 1.5,
                  delay: i * 0.1
                }}
              />
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="bg-gray-50 p-3 rounded-xl">
            <div className="text-2xl font-bold text-gray-900">{project.contributors || 1}</div>
            <div className="text-xs text-gray-500">Total Contributors</div>
          </div>
          <div className="bg-gray-50 p-3 rounded-xl">
            <div className="text-2xl font-bold text-gray-900">${project.raised || 0}</div>
            <div className="text-xs text-gray-500">Total Raised</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Animated Notification Toast
export const showSuccessToast = (message: string) => {
  toast.custom((t) => (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.8 }}
      className={`${
        t.visible ? 'animate-enter' : 'animate-leave'
      } bg-white shadow-lg rounded-xl px-4 py-3 flex items-center gap-3 border-l-4 border-green-500 max-w-md`}
    >
      <div className="bg-green-100 p-2 rounded-full">
        <Sparkles className="h-4 w-4 text-green-500" />
      </div>
      <p className="text-gray-700">{message}</p>
    </motion.div>
  ));
}; 