import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, UserPlus } from 'lucide-react';
import { TeamMember } from '@/types/formTypes';

interface Step5Props {
  team: TeamMember[];
  updateTeam: (team: TeamMember[]) => void;
  addTeamMember: () => void;
  isWalletConnected: boolean;
}

const Step5Team: React.FC<Step5Props> = ({ 
  team, 
  updateTeam, 
  addTeamMember,
  isWalletConnected 
}) => {
  const handleNameChange = (index: number, value: string) => {
    const newTeam = [...team];
    newTeam[index].name = value;
    updateTeam(newTeam);
  };

  const handlePositionChange = (index: number, value: string) => {
    const newTeam = [...team];
    newTeam[index].position = value;
    updateTeam(newTeam);
  };

  const handleRemoveMember = (index: number) => {
    const newTeam = team.filter((_, i) => i !== index);
    updateTeam(newTeam);
  };

  return (
    <motion.div 
      className="space-y-4"
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
        Add Team Members <span className="text-red-500">*</span>
      </motion.p>
      
      <AnimatePresence>
        {team.map((member, index) => (
          <motion.div 
            key={index} 
            className="flex items-center justify-between mb-2 bg-white rounded-lg p-2 border border-gray-100 shadow-sm"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20, height: 0, marginBottom: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.01, boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)' }}
          >
            <div className="flex items-center gap-2 w-full">
              <motion.div 
                className="w-10 h-10 rounded-full bg-emerald-100 flex items-center overflow-hidden justify-center text-emerald-500 font-medium text-lg"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                {member.name ? member.name.charAt(0).toUpperCase() : "U"}
              </motion.div>
              
              <div className="flex flex-col sm:flex-row gap-2 w-full">
                <input
                  type="text"
                  placeholder="Name"
                  value={member.name}
                  onChange={(e) => handleNameChange(index, e.target.value)}
                  className="w-full px-3 py-2 border text-black border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all form-input"
                />
                <input
                  type="text"
                  placeholder="Position"
                  value={member.position}
                  onChange={(e) => handlePositionChange(index, e.target.value)}
                  className="w-full px-3 py-2 border text-black border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all form-input"
                />
              </div>
            </div>
            
            {team.length > 1 && (
              <motion.button
                type="button"
                onClick={() => handleRemoveMember(index)}
                className="ml-2 text-gray-400 hover:text-red-500 transition-colors"
                whileHover={{ scale: 1.2, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
              >
                <Trash2 size={20} />
              </motion.button>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
      
      {isWalletConnected && (
        <motion.button
          type="button"
          onClick={addTeamMember}
          className="mt-4 px-4 py-2 text-base font-poppins text-emerald-500 rounded-lg flex items-center gap-2 hover:bg-emerald-50 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <UserPlus size={18} />
          <span>Add Team Member</span>
        </motion.button>
      )}
    </motion.div>
  );
};

export default Step5Team; 