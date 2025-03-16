import React from 'react';
import { motion } from 'framer-motion';

interface Step7Props {
  description: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const Step7Description: React.FC<Step7Props> = ({ description, onChange }) => {
  return (
    <motion.div 
      className="space-y-4 h-[300px]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <motion.p 
        className="font-semibold text-black"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        Project Description <span className="text-red-500">*</span>
      </motion.p>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        whileHover={{ scale: 1.01 }}
        className="relative"
      >
        <textarea
          name="description"
          placeholder="Tell us about your project in detail..."
          value={description}
          onChange={onChange}
          rows={6}
          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none resize-none text-black form-input"
        />
        
        <motion.div 
          className="absolute mt-[10px] left-0 w-full text-center text-sm text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Be detailed and specific about what makes your project unique
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Step7Description; 