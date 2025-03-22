"use client";
import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import MaxWidthWrapper from "../global/max-width-wrapper";
import { useAbstraxionAccount } from "@burnt-labs/abstraxion";
import { Heart, Send, ArrowRight } from "lucide-react";

const Footer = () => {
  const { isConnected } = useAbstraxionAccount();
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: true, margin: "-100px" });

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
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const socialIconVariants = {
    hover: { 
      scale: 1.2, 
      rotate: 5,
      transition: { type: "spring", stiffness: 400, damping: 10 } 
    },
  };

  return (
    <footer ref={footerRef} className="w-full border-t border-gray-100 bg-white relative overflow-hidden">
      {/* Animated background pattern */}
      <motion.div 
        className="absolute inset-0 pointer-events-none opacity-0"
        animate={{ opacity: isInView ? 0.03 : 0 }}
        transition={{ duration: 1 }}
      >
        <div className="w-full h-full bg-[radial-gradient(#22c55e_1px,transparent_1px)] [background-size:20px_20px]" />
      </motion.div>

      <section className="w-full h-full bg-white bg-opacity-70 backdrop-blur-sm">
        <motion.div 
          className="py-8 sm:py-12 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 justify-between w-full">
            {/* Left Section */}
            <motion.div 
              className="flex flex-col gap-6 text-center lg:text-left max-w-md mx-auto lg:mx-0"
              variants={itemVariants}
            >
              <motion.p 
                className="text-gray-600 text-sm sm:text-base"
                variants={itemVariants}
              >
                Make a difference by supporting initiatives you believe in, contribute through Seeder rounds to bring impactful ideas to life.
              </motion.p>

              {/* Show only if wallet is connected */}
              {isConnected && (
                <Link href="/form" className="mx-auto lg:mx-0">
                  <motion.button 
                    className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-2.5 rounded-lg font-medium inline-flex items-center gap-2 transition-colors relative overflow-hidden group"
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 10px 25px -5px rgba(16, 185, 129, 0.4)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    variants={itemVariants}
                  >
                    <motion.span 
                      className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                    <span className="relative z-10 flex items-center gap-2">
                      Post your product
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ 
                          duration: 1.5, 
                          repeat: Infinity, 
                          repeatType: "loop",
                          ease: "easeInOut",
                          repeatDelay: 1
                        }}
                      >
                        <ArrowRight className="w-4 h-4" />
                      </motion.div>
                    </span>
                  </motion.button>
                </Link>
              )}

              <motion.div 
                className="flex justify-center lg:justify-start items-center gap-6"
                variants={itemVariants}
              >
                <motion.div whileHover="hover">
                  <Link href="https://x.com/Seedrfun" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-700 transition-colors p-2 block">
                    <motion.svg 
                      className="w-5 h-5" 
                      viewBox="0 0 24 24" 
                      fill="currentColor"
                      variants={socialIconVariants}
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </motion.svg>
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Right Section */}
            <motion.div 
              className="flex flex-col gap-8 text-center lg:text-right"
              variants={itemVariants}
            >
              <motion.div className="space-y-2" variants={itemVariants}>
                <h3 className="text-sm text-gray-400 uppercase">Contact us</h3>
                <motion.a 
                  href="mailto:seedr@cyrostudios.com" 
                  className="text-gray-600 hover:text-gray-900 font-bold transition-colors inline-flex items-center gap-1 group"
                  whileHover={{ scale: 1.05 }}
                >
                  seedr@cyrostudios.com
                  <motion.div
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5, duration: 0.3 }}
                  >
                    <Send className="w-3 h-3 text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.div>
                </motion.a>
              </motion.div>
              <motion.div className="flex flex-col gap-3" variants={itemVariants}>
                <motion.div whileHover={{ x: 3 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                  <Link href="/privacy" className="text-gray-500 hover:text-gray-700 transition-colors">
                    Privacy policy
                  </Link>
                </motion.div>
                <motion.div whileHover={{ x: 3 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                  <Link href="/terms" className="text-gray-500 hover:text-gray-700 transition-colors">
                    Terms & Conditions
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>

          {/* Bottom Section */}
          <motion.div 
            className="mt-12 pt-8 border-t border-gray-100 w-full"
            variants={itemVariants}
          >
            <div className="flex flex-col sm:flex-row justify-between items-center gap-6 w-full">
              <motion.p 
                className="text-sm text-gray-500"
                variants={itemVariants}
              >
                © Seedr 2025 · All Rights Reserved
              </motion.p>
              <motion.div 
                className="flex items-center gap-2 text-sm text-gray-500"
                variants={itemVariants}
              >
                <span>Made with</span>
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                  }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity, 
                    repeatType: "loop",
                    ease: "easeInOut",
                    repeatDelay: 1
                  }}
                >
                  <Heart className="w-4 h-4 text-emerald-500 fill-emerald-500" />
                </motion.div>
                <span>by</span>
                <Link href="/" className="flex items-center gap-1 group">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Image 
                      src="/icons/logo1.png" 
                      alt="Cyro Studios" 
                      width={20} 
                      height={20} 
                      className="rounded-full" 
                    />
                  </motion.div>
                  <motion.span 
                    className="font-extrabold group-hover:text-emerald-500 transition-colors"
                    whileHover={{ scale: 1.05 }}
                  >
                    Cyro Studios
                  </motion.span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </footer>
  );
};

export default Footer;
