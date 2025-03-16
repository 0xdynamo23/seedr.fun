import React from 'react';
import { motion } from 'framer-motion';

interface Step1Props {
  name: string;
  tagline: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Step1BasicInfo: React.FC<Step1Props> = ({ name, tagline, onChange }) => {
  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div>
        <motion.p 
          className="font-semibold text-black px-2 font-poppins mb-2 text-sm sm:text-base"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          Project name <span className="text-red-500">*</span>
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          whileHover={{ scale: 1.01 }}
          className="relative"
        >
          <input
            type="text"
            name="name"
            value={name}
            onChange={onChange}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all text-black text-sm sm:text-base form-input"
            placeholder="Enter your project name"
          />
          <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-500 group-focus-within:w-full transition-all duration-300"></div>
        </motion.div>
      </div>

      <div>
        <motion.p 
          className="font-semibold text-black px-2 font-poppins mb-2 text-sm sm:text-base"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          Short tagline <span className="text-red-500">*</span>
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          whileHover={{ scale: 1.01 }}
          className="relative"
        >
          <input
            type="text"
            name="tagline"
            value={tagline}
            onChange={onChange}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all text-black text-sm sm:text-base form-input"
            placeholder="A brief description of your project"
          />
          <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-500 group-focus-within:w-full transition-all duration-300"></div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Step1BasicInfo; 