import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface Step2Props {
  category: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const categories = [
  { id: 'defi', label: 'DeFi', icon: '💰' },
  { id: 'nft', label: 'NFT', icon: '🖼️' },
  { id: 'gaming', label: 'Gaming', icon: '🎮' },
  { id: 'other', label: 'Other', icon: '🔍' },
];

const Step2Category: React.FC<Step2Props> = ({ category, onChange }) => {
  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <motion.p 
        className="text-black font-semibold"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        Categories <span className="text-red-500">*</span>
      </motion.p>
      
      <div className="grid grid-cols-2 gap-3">
        {categories.map((cat, index) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <label 
              htmlFor={`category-${cat.id}`}
              className={`
                flex flex-col items-center justify-center p-4 rounded-lg border-2 cursor-pointer
                transition-all duration-200 h-full relative
                ${category === cat.id 
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-800' 
                  : 'border-gray-200 hover:border-emerald-200 hover:bg-gray-50 text-gray-800'
                }
              `}
            >
              <div className="text-3xl mb-2">{cat.icon}</div>
              <div className="font-medium">{cat.label}</div>
              
              {category === cat.id && (
                <motion.div 
                  className="absolute top-2 right-2 bg-emerald-500 text-white rounded-full p-1 shadow-sm"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Check size={14} />
                </motion.div>
              )}
              
              <input
                type="radio"
                id={`category-${cat.id}`}
                name="category"
                value={cat.id}
                checked={category === cat.id}
                onChange={(e) => {
                  const syntheticEvent = {
                    target: {
                      name: 'category',
                      value: cat.id
                    }
                  } as React.ChangeEvent<HTMLSelectElement>;
                  onChange(syntheticEvent);
                }}
                className="sr-only"
              />
            </label>
          </motion.div>
        ))}
      </div>
      
      <div className="relative hidden">
        <select
          name="category"
          value={category}
          onChange={onChange}
          className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all text-black text-sm sm:text-base appearance-none bg-white"
        >
          <option value="" className="py-2">Select your category here</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id} className="py-2">{cat.label}</option>
          ))}
        </select>
      </div>
    </motion.div>
  );
};

export default Step2Category; 