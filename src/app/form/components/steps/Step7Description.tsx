import React from 'react';
import { motion } from 'framer-motion';
import { Info } from 'lucide-react';

interface Step7Props {
  description: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const Step7Description: React.FC<Step7Props> = ({ description, onChange }) => {
  return (
    <motion.div 
      className="space-y-4 h-[420px]"
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
          className="space-y-4 mt-4 text-sm text-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="font-medium flex items-center gap-2 text-emerald-600">
            <Info size={16} className="text-emerald-500" /> Include the following in your description:
          </div>
          <ul className="list-disc pl-6 space-y-2">
            <li>What problem does your project solve?</li>
            <li>What makes your project unique compared to existing solutions?</li>
            <li>Who is your target audience?</li>
            <li>What is your business model or monetization plan?</li>
            <li>What is your project roadmap and timeline?</li>
            <li>Any traction or milestones achieved so far?</li>
          </ul>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Step7Description; 