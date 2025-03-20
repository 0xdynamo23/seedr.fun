import React from 'react';
import { motion } from 'framer-motion';
import { FormChangeEvent } from '@/types/formTypes';

interface ProfileCreationStepProps {
  username: string;
  email: string;
  onChange: (e: FormChangeEvent) => void;
}

const ProfileCreationStep: React.FC<ProfileCreationStepProps> = ({ 
  username, 
  email, 
  onChange 
}) => {
  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div 
        className="space-y-4"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <label className="block">
          <span className="text-gray-700 font-medium mb-1 block">Username <span className="text-red-500">*</span></span>
          <input
            type="text"
            name="username"
            value={username}
            onChange={onChange}
            placeholder="Enter a username"
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all duration-300"
            required
          />
        </label>
      </motion.div>

      <motion.div 
        className="space-y-4"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <label className="block">
          <span className="text-gray-700 font-medium mb-1 block">Email <span className="text-red-500">*</span></span>
          <input
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            placeholder="Enter your email"
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all duration-300"
            required
          />
        </label>
      </motion.div>

      <motion.p 
        className="text-sm text-gray-500 mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        Your profile information will be linked to projects you create.
      </motion.p>
    </motion.div>
  );
};

export default ProfileCreationStep; 