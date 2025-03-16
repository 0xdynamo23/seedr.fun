import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaXTwitter } from 'react-icons/fa6';
import { SiDiscord } from 'react-icons/si';
import { Send, Globe } from 'lucide-react';
import { FormLinks } from '@/types/formTypes';

interface Step6Props {
  contactEmail: string;
  links: FormLinks;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  currentLinks: Array<{ platform: string; value: string; prompt: string }>;
  addLink: (link: { platform: string; value: string; prompt: string }) => void;
}

const Step6Links: React.FC<Step6Props> = ({ 
  contactEmail, 
  links, 
  onChange, 
  currentLinks, 
  addLink 
}) => {
  return (
    <motion.div 
      className="space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.p 
          className="text-black font-semibold mb-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          Contact Email <span className="text-red-500">*</span>
        </motion.p>
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="relative"
        >
          <input
            type="email"
            name="contactEmail"
            placeholder="yourcontact@email.com"
            value={contactEmail}
            onChange={onChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none text-black form-input"
          />
          <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-500 group-focus-within:w-full transition-all duration-300"></div>
        </motion.div>
      </motion.div>
      
      <div className="space-y-3 mt-6">
        <motion.p 
          className="font-semibold text-black"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          Other Links <span className="text-red-500">*</span>
        </motion.p>
        
        <AnimatePresence>
          {currentLinks.map((link, index) => (
            <motion.div 
              key={index} 
              className="relative flex items-center gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.01 }}
            >
              {link.platform === "twitter" && (
                <FaXTwitter
                  className="absolute left-3 text-gray-500"
                  size={20}
                />
              )}
              {link.platform === "telegram" && (
                <Send className="absolute left-3 text-gray-500" size={20} />
              )}
              {link.platform === "discord" && (
                <SiDiscord
                  className="absolute left-3 text-gray-500"
                  size={20}
                />
              )}
              {link.platform === "website" && (
                <Globe
                  className="absolute left-3 text-gray-500"
                  size={20}
                />
              )}
              <div className="w-full flex gap-2 items-center pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500 outline-none text-black transition-all duration-200">
                {link?.prompt}
                <input
                  type="text"
                  className="py-1 w-full outline-none form-input border-0"
                  name={`links.${link.platform.replace(/'/g, "&#39;")}`}
                  value={links[link.platform as keyof FormLinks] || ''}
                  onChange={onChange}
                />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        <motion.div 
          className="flex gap-3 items-center mt-4 flex-wrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {!currentLinks.find((link) => link.platform === "telegram") && (
            <motion.div
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 cursor-pointer transition-colors"
              onClick={() => addLink({ platform: "telegram", value: "", prompt: "@" })}
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Send className="text-gray-600" size={20} />
            </motion.div>
          )}

          {!currentLinks.find((link) => link.platform === "discord") && (
            <motion.div
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 cursor-pointer transition-colors"
              onClick={() => addLink({ platform: "discord", value: "", prompt: "@" })}
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <SiDiscord className="text-gray-600" size={20} />
            </motion.div>
          )}

          {!currentLinks.find((link) => link.platform === "website") && (
            <motion.div
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 cursor-pointer transition-colors"
              onClick={() => addLink({ platform: "website", value: "", prompt: "https://" })}
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Globe className="text-gray-600" size={20} />
            </motion.div>
          )}

          {!currentLinks.find((link) => link.platform === "twitter") && (
            <motion.div
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 cursor-pointer transition-colors"
              onClick={() => addLink({ platform: "twitter", value: "", prompt: "@" })}
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaXTwitter className="text-gray-600" size={20} />
            </motion.div>
          )}
          
          <motion.p className="text-xs text-gray-500 ml-2">
            Click to add more links
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Step6Links;