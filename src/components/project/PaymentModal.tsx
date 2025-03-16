"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import { Heart } from "lucide-react";

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

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project;
  onSubmit: (amount: number) => void;
}

const PaymentModal = ({
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

export default PaymentModal; 