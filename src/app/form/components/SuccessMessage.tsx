import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { CheckCircle2, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import '@/styles/animations.css';

interface SuccessMessageProps {
  message: string;
  onClose?: () => void;
  autoRedirect?: boolean;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ 
  message, 
  onClose,
  autoRedirect = true 
}) => {
  const confettiRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (confettiRef.current) {
      const canvas = document.createElement('canvas');
      canvas.style.position = 'fixed';
      canvas.style.inset = '0';
      canvas.style.width = '100vw';
      canvas.style.height = '100vh';
      canvas.style.zIndex = '999';
      canvas.style.pointerEvents = 'none';
      document.body.appendChild(canvas);

      const myConfetti = confetti.create(canvas, {
        resize: true,
        useWorker: true,
      });

      const duration = 2 * 1000;
      const end = Date.now() + duration;

      const colors = ['#00b09b', '#96c93d', '#00ff00', '#4ade80'];

      (function frame() {
        myConfetti({
          particleCount: 3,
          angle: 60,
          spread: 80,
          origin: { x: 0 },
          colors: colors,
        });
        
        myConfetti({
          particleCount: 3,
          angle: 120,
          spread: 80,
          origin: { x: 1 },
          colors: colors,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        } else {
          setTimeout(() => {
            if (canvas.parentNode) {
              canvas.parentNode.removeChild(canvas);
            }
          }, 3000);
        }
      })();
    }

    if (autoRedirect) {
      const timer = setTimeout(() => {
        router.push('/');
      }, 7000);
  
      return () => {
        clearTimeout(timer);
      };
    }
  }, [router, autoRedirect]);

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      ref={confettiRef}
    >
      <motion.div
        className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full mx-4 relative overflow-hidden"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', damping: 15 }}
      >
        {/* Decorative elements */}
        <div className="absolute -top-6 -left-6 w-12 h-12 bg-emerald-100 rounded-full opacity-70 z-0 animate-float"></div>
        <div className="absolute -bottom-4 -right-4 w-8 h-8 bg-emerald-200 rounded-full opacity-70 z-0 animate-float-slow"></div>
        <div className="absolute top-1/2 -right-8 w-6 h-6 bg-emerald-300/50 rounded-full animate-pulse-slow"></div>
        <div className="absolute bottom-1/3 -left-5 w-4 h-4 bg-emerald-400/40 rounded-full animate-pulse-slow animation-delay-2000"></div>
        
        {/* Shimmer effect */}
        <div className="absolute top-1/4 left-0 right-0 h-10 animate-shimmer opacity-30 transform -rotate-12"></div>
        <div className="absolute bottom-1/3 left-0 right-0 h-10 animate-shimmer opacity-30 transform rotate-12 animation-delay-2000"></div>
        
        {/* Diagonal floating elements */}
        <div className="absolute top-1/4 right-1/4 w-3 h-3 bg-emerald-300/60 rounded-full animate-float-diagonal"></div>
        <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-teal-200/60 rounded-full animate-float-diagonal animation-delay-3000"></div>
        
        {onClose && (
          <motion.button
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-20 p-2"
            onClick={onClose}
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
          >
            <X size={20} />
          </motion.button>
        )}
        
        <div className="relative z-10">
          <motion.div 
            className="w-16 h-16 mx-auto mb-4 text-emerald-500"
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: 360 }}
            transition={{ type: 'spring', damping: 10, delay: 0.2 }}
          >
            <CheckCircle2 size={64} strokeWidth={1.5} />
          </motion.div>
          
          <motion.h2
            className="text-2xl font-bold text-center mb-2 text-gray-800"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Success!
          </motion.h2>
          
          <motion.p
            className="text-gray-600 text-center mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {message}
          </motion.p>
          
          <div className="relative w-full h-48 rounded-lg overflow-hidden mb-6 bg-white flex items-end justify-center">
            <motion.div 
              className="relative w-48 h-44 mb-2 origin-bottom"
              initial={{ scale: 0.2, opacity: 0.5 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                duration: 1.5, // Faster animation
                ease: "easeOut",
                delay: 0.2 // Reduced delay
              }}
            >
              <div className="w-full h-full relative">
                <Image
                  src="/plant.jpg"
                  alt="Growing Plant"
                  fill
                  className="object-contain"
                  style={{ 
                    filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))',
                    mixBlendMode: 'multiply' // This helps remove white background
                  }}
                />
              </div>
              
              {/* Animated soil mound */}
              <motion.div 
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-amber-800 rounded-t-full z-[-1]"
                initial={{ width: 50, height: 4 }}
                animate={{ width: 128, height: 8 }}
                transition={{ duration: 1, delay: 0.1 }} // Faster animation
              />
              
              {/* Animated roots */}
              <motion.div 
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-28 h-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }} // Faster animation
              >
                <div className="absolute bottom-0 left-0 w-1.5 h-4 bg-amber-900 rotate-[-30deg] origin-bottom"></div>
                <div className="absolute bottom-0 left-1/4 w-1.5 h-5 bg-amber-900 rotate-[-15deg] origin-bottom"></div>
                <div className="absolute bottom-0 right-1/4 w-1.5 h-5 bg-amber-900 rotate-[15deg] origin-bottom"></div>
                <div className="absolute bottom-0 right-0 w-1.5 h-4 bg-amber-900 rotate-[30deg] origin-bottom"></div>
              </motion.div>
            </motion.div>
            
            {/* Animated water drops - faster and more frequent */}
            <motion.div
              className="absolute top-6 left-1/3 w-1.5 h-3 bg-blue-400 rounded-full"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: [0, 1, 0], y: 30 }}
              transition={{ 
                duration: 0.8, // Faster animation
                times: [0, 0.2, 1],
                repeat: 3, // More repetitions
                delay: 0.4 // Reduced delay
              }}
            />
            
            <motion.div
              className="absolute top-4 right-1/3 w-1.5 h-3 bg-blue-400 rounded-full"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: [0, 1, 0], y: 30 }}
              transition={{ 
                duration: 0.8, // Faster animation
                times: [0, 0.2, 1],
                repeat: 3, // More repetitions
                delay: 0.6 // Reduced delay
              }}
            />
            
            {/* Additional water drop for better effect */}
            <motion.div
              className="absolute top-2 left-1/2 w-1.5 h-3 bg-blue-400 rounded-full"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: [0, 1, 0], y: 30 }}
              transition={{ 
                duration: 0.8,
                times: [0, 0.2, 1],
                repeat: 3,
                delay: 0.2
              }}
            />
          </div>
          
          {autoRedirect ? (
            <motion.p
              className="text-sm text-gray-500 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Redirecting you to the home page in a few seconds...
            </motion.p>
          ) : (
            <motion.button
              className="w-full py-2 px-4 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
              onClick={() => router.push('/')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Return to Home
            </motion.button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SuccessMessage; 